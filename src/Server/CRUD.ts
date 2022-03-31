import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { EventEmitter } from 'stream'
import { LoggerManager } from 'yaml-scene/src/singleton/LoggerManager'
import { Scenario } from 'yaml-scene/src/singleton/Scenario'
import { TraceError } from 'yaml-scene/src/utils/error/TraceError'

export class CRUD {
  mapData: { [path: string]: any[] }
  initData: any | any[]
  events: EventEmitter
  allowInitData: boolean

  constructor(public requestPath: string, public dbFile: string, isReset: boolean) {
    this.mapData = {}
    if (dbFile) {
      this.events = new EventEmitter()
      this.dbFile = Scenario.Instance.resolvePath(dbFile)
      if (existsSync(this.dbFile)) {
        if (isReset) {
          LoggerManager.GetLogger().debug(`Clean db at "${this.dbFile}"`)
          unlinkSync(this.dbFile)
          this.allowInitData = true
        } else {
          LoggerManager.GetLogger().debug('Load data from file "${this.dbFile}" to db')
          this.mapData = JSON.parse(readFileSync(this.dbFile).toString())
        }
      } else {
        this.allowInitData = true
      }
      this.events.on('update.db', () => {
        writeFileSync(this.dbFile, JSON.stringify(this.mapData))
      })
    } else {
      this.allowInitData = true
    }
  }

  init(items: any[] | any) {
    if (!this.allowInitData) return
    LoggerManager.GetLogger().debug('Init data')
    if (Array.isArray(items)) {
      items.forEach(item => this.create('', item))
      this.events?.emit('update.db')
    } else if (typeof items === 'object') {
      Object.entries(items).forEach(([key, vl]) => {
        (vl as any[]).forEach(item => this.create(key, item))
      })
      this.events?.emit('update.db')
    } else {
      throw new TraceError('Init data must be Array or Object', { items })
    }
  }

  find(key: string, where?: any) {
    const list = this.mapData[key] || (this.mapData[key] = [])
    const fields = Object.keys(where || {});
    if (!fields.length)
      return list;

    return list.filter(item => {
      return fields.every(field => item[field]?.toString() === where[field]?.toString());
    });
  }

  get(key: string, field: string, id: string) {
    const list = this.mapData[key] || (this.mapData[key] = [])
    const item = list.find(e => e[field]?.toString() === id?.toString());
    return item;
  }

  create(key: string, value: any) {
    const list = this.mapData[key] || (this.mapData[key] = [])
    const old = this.get(key, 'id', value?.id)
    if (old) throw new TraceError(`"id" is existed in ${key}`, { value })
    list.push(value);
    this.events?.emit('update.db')
    return value;
  }

  update(key: string, field: string, id: string, value: any) {
    const list = this.mapData[key] || (this.mapData[key] = [])
    const idx = list.findIndex(e => e[field]?.toString() === id?.toString());
    if (idx === -1)
      throw new Error(`Could not found ${id} to update`);
    list[idx] = value;
    this.events?.emit('update.db')
    return value;
  }

  patch(key: string, field: string, id: string, value: any) {
    const list = this.mapData[key] || (this.mapData[key] = [])
    const idx = list.findIndex(e => e[field]?.toString() === id?.toString());
    if (idx === -1)
      throw new Error(`Could not found ${id} to update`);
    Object.keys(value).forEach(key => list[idx][key] = value[key]);
    this.events?.emit('update.db')
    return list[idx];
  }

  remove(key: string, field: string, id: string) {
    const list = this.mapData[key] || (this.mapData[key] = [])
    const idx = list.findIndex(e => e[field]?.toString() === id?.toString());
    if (idx === -1)
      throw new Error(`Could not found ${id} to remove`);
    list.splice(idx, 1);
    this.events?.emit('update.db')
    return null;
  }

  get routers() {
    return [{
      method: 'GET',
      path: `${this.requestPath}`,
      handler: ({ ctx, query, params }) => {
        const key = Object.keys(params).map(key => params[key]).join('/')
        const rs = this.find(key, query)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'GET',
      path: `${this.requestPath}/:id`,
      handler: ({ ctx, params }) => {
        const key = Object.keys(params).filter((key) => key !== 'id').map(key => params[key]).join('/')
        const rs = this.get(key, 'id', params.id)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'POST',
      path: `${this.requestPath}`,
      handler: ({ ctx, body, params }) => {
        const key = Object.keys(params).map(key => params[key]).join('/')
        const rs = this.create(key, body)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'PUT',
      path: `${this.requestPath}/:id`,
      handler: ({ ctx, params, body }) => {
        const key = Object.keys(params).filter((key) => key !== 'id').map(key => params[key]).join('/')
        const rs = this.update(key, 'id', params.id, body)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'PATCH',
      path: `${this.requestPath}/:id`,
      handler: ({ ctx, params, body }) => {
        const key = Object.keys(params).filter((key) => key !== 'id').map(key => params[key]).join('/')
        const rs = this.patch(key, 'id', params.id, body)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'DELETE',
      path: `${this.requestPath}/:id`,
      handler: ({ ctx, params }) => {
        const key = Object.keys(params).filter((key) => key !== 'id').map(key => params[key]).join('/')
        const rs = this.remove(key, 'id', params.id)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }]
  }
}