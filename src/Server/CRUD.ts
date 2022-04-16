import chalk from 'chalk'
import { readFileSync, unlinkSync, writeFileSync } from 'fs'
import { EventEmitter } from 'stream'
import { Logger } from 'yaml-scene/src/singleton/LoggerManager'
import { TraceError } from 'yaml-scene/src/utils/error/TraceError'
import { FileUtils } from 'yaml-scene/src/utils/FileUtils'

export class CRUD {
  mapData: { [path: string]: any[] }
  initData: any | any[]
  events: EventEmitter
  allowInitData: boolean

  constructor(public logger: Logger, public requestPath: string, public dbFile: string, isReset: boolean) {
    this.mapData = {}
    if (this.dbFile) {
      this.events = new EventEmitter()
      const isExisted = FileUtils.Existed(this.dbFile)
      if (isExisted === 'url') throw new TraceError(`DB file is not support URL "${this.dbFile}"`)
      if (isExisted) {
        if (isReset) {
          this.logger.debug(chalk.gray(`- Cleaned db at "${this.dbFile}"`))
          unlinkSync(this.dbFile)
          this.allowInitData = true
        } else {
          this.logger.debug(chalk.gray(`- Loaded data from file "${this.dbFile}" to db`))
          this.mapData = JSON.parse(readFileSync(this.dbFile).toString())
        }
      } else {
        FileUtils.MakeDirExisted(this.dbFile, 'file')
        this.allowInitData = true
      }
      this.logger.debug(chalk.gray(`- DB file will be saved at "${this.dbFile}"`))
      this.events.on('update.db', () => {
        writeFileSync(this.dbFile, JSON.stringify(this.mapData))
      })
    } else {
      this.allowInitData = true
    }
  }

  init(items: any[] | any) {
    if (!this.allowInitData) return
    this.logger.debug(chalk.gray('- Init data'))
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
    if (old) throw new TraceError(`"id" is existed in ${key}`, { key, value })
    list.push(value);
    this.events?.emit('update.db')
    return value;
  }

  update(key: string, field: string, id: string, value: any) {
    const list = this.mapData[key] || (this.mapData[key] = [])
    const idx = list.findIndex(e => e[field]?.toString() === id?.toString());
    if (idx === -1)
      throw new TraceError(`Could not found ${id} to update`, { key, field, id, value });
    list[idx] = value;
    this.events?.emit('update.db')
    return value;
  }

  patch(key: string, field: string, id: string, value: any) {
    const list = this.mapData[key] || (this.mapData[key] = [])
    const idx = list.findIndex(e => e[field]?.toString() === id?.toString());
    if (idx === -1)
      throw new TraceError(`Could not found ${id} to update`, { key, field, id, value });
    Object.keys(value).forEach(key => list[idx][key] = value[key]);
    this.events?.emit('update.db')
    return list[idx];
  }

  remove(key: string, field: string, id: string) {
    const list = this.mapData[key] || (this.mapData[key] = [])
    const idx = list.findIndex(e => e[field]?.toString() === id?.toString());
    if (idx === -1)
      throw new TraceError(`Could not found ${id} to remove`, { key, field, id });
    list.splice(idx, 1);
    this.events?.emit('update.db')
    return null;
  }

  get routers() {
    const _this = this
    return [{
      method: 'GET',
      path: `${this.requestPath}/:id`,
      handler() {
        const key = Object.keys(this.params).filter((key) => key !== 'id').map(key => this.params[key]).join('/')
        const rs = _this.get(key, 'id', this.params.id)
        this.ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'GET',
      path: `${this.requestPath}`,
      handler() {
        const key = Object.keys(this.params).map(key => this.params[key]).join('/')
        const rs = _this.find(key, this.query)
        this.ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'POST',
      path: `${this.requestPath}`,
      handler() {
        const key = Object.keys(this.params).map(key => this.params[key]).join('/')
        const rs = _this.create(key, this.body)
        this.ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'PUT',
      path: `${this.requestPath}/:id`,
      handler() {
        const key = Object.keys(this.params).filter((key) => key !== 'id').map(key => this.params[key]).join('/')
        const rs = _this.update(key, 'id', this.params.id, this.body)
        this.ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'PATCH',
      path: `${this.requestPath}/:id`,
      handler() {
        const key = Object.keys(this.params).filter((key) => key !== 'id').map(key => this.params[key]).join('/')
        const rs = _this.patch(key, 'id', this.params.id, this.body)
        this.ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'DELETE',
      path: `${this.requestPath}/:id`,
      handler() {
        const key = Object.keys(this.params).filter((key) => key !== 'id').map(key => this.params[key]).join('/')
        const rs = _this.remove(key, 'id', this.params.id)
        this.ctx.status = rs ? 200 : 204
        return rs
      }
    }]
  }
}