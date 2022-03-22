export class CRUD {
  list: any[]
  constructor(public requestPath: string) {
    this.list = new Array<any>()
  }

  init(...items: any[]) {
    items.forEach(item => this.create(item))
  }

  find(where?: any) {
    const fields = Object.keys(where || {});
    if (!fields.length)
      return this.list;

    return this.list.filter(item => {
      return fields.every(field => item[field]?.toString() === where[field]?.toString());
    });
  }

  get(field: string, id: string) {
    const item = this.list.find(e => e[field]?.toString() === id?.toString());
    return item;
  }

  create(value: any) {
    this.list.push(value);
    return value;
  }

  update(field: string, id: string, value: any) {
    const idx = this.list.findIndex(e => e[field]?.toString() === id?.toString());
    if (idx === -1)
      throw new Error(`Could not found ${id} to update`);
    this.list[idx] = value;
    return value;
  }

  patch(field: string, id: string, value: any) {
    const idx = this.list.findIndex(e => e[field]?.toString() === id?.toString());
    if (idx === -1)
      throw new Error(`Could not found ${id} to update`);
    Object.keys(value).forEach(key => this.list[idx][key] = value[key]);
    return this.list[idx];
  }

  remove(field: string, id: string) {
    const idx = this.list.findIndex(e => e[field]?.toString() === id?.toString());
    if (idx === -1)
      throw new Error(`Could not found ${id} to remove`);
    this.list.splice(idx, 1);
    return null;
  }

  get routers() {
    return [{
      method: 'GET',
      path: `${this.requestPath}`,
      handler: ({ ctx, query }) => {
        let rs: any
        rs = this.find(query)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'GET',
      path: `${this.requestPath}/:id`,
      handler: ({ ctx, params }) => {
        let rs: any
        rs = this.get('id', params.id)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'POST',
      path: `${this.requestPath}`,
      handler: ({ ctx, body }) => {
        let rs: any
        rs = this.create(body)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'PUT',
      path: `${this.requestPath}/:id`,
      handler: ({ ctx, params, body }) => {
        let rs: any
        rs = this.update('id', params.id, body)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'PATCH',
      path: `${this.requestPath}/:id`,
      handler: ({ ctx, params, body }) => {
        let rs: any
        rs = this.patch('id', params.id, body)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }, {
      method: 'DELETE',
      path: `${this.requestPath}/:id`,
      handler: ({ ctx, params }) => {
        let rs: any
        rs = this.remove('id', params.id)
        ctx.status = rs ? 200 : 204
        return rs
      }
    }]
  }
}