import cors from '@koa/cors';
import Router from '@koa/router';
import chalk from 'chalk';
import http from 'http';
import https from 'https';
import Koa, { Context } from 'koa';
import bodyParser from 'koa-body';
import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";
import { ElementFactory } from 'yaml-scene/src/elements/ElementFactory';
import { ElementProxy } from 'yaml-scene/src/elements/ElementProxy';
import { IElement } from 'yaml-scene/src/elements/IElement';
import Pause from 'yaml-scene/src/elements/Pause';
import { Functional } from "yaml-scene/src/tags/model/Functional";
import { FileUtils } from 'yaml-scene/src/utils/FileUtils';
import { LazyImport } from 'yaml-scene/src/utils/LazyImport';
import { TimeUtils } from "yaml-scene/src/utils/TimeUtils";
import { CRUD } from './CRUD';

/*****
 * @name yas-http/Server
 * @description Mock API server  
- Server static file
- Support upload file then save to server
- Server RESTFul API data 
- Create APIs which auto handle CRUD data
 * @group Api
 * @example
- yas-http/Server:
    title: Mock http request to serve data
    https:                                      # Server content via https with the cert and key
      key: 
      cert: 
    host: 0.0.0.0                               # Server host
    port: 8000                                  # Server port

    routers:                                    # Defined routes

      # Serve static files
      - serveIn: [./assets]                     # All of files in the list folders will be served after request to

      # Server upload API
      - path: /upload                           # Upload path. Default method is POST
        method: POST                            # Request method (POST, PUT, PATCH, DELETE, HEAD)
                                                # - Default method is POST
        uploadTo: ./uploadDir                   # Directory includes uploading files

      # Create dynamic APIs which auto handle CRUD data with dynamic model
      - path: '/:model'                         # Use this pattern to use with dynamic model name
        CRUD: true                              # Auto create full RESTful API
                                                # - GET    /modelName            : Return list models
                                                # - GET    /modelName/:id        : Return model details by id
                                                # - POST   /modelName            : Create a new model
                                                # - PUT    /modelName/:id        : Replace entity of post to new model
                                                # - PATCH  /modelName/:id        : Only update some properties of model
                                                # - DELETE /modelName/:id        : Delete a model by id
        dbFile: ./db.json                       # Store data to file. This make the next time, when server up will load data from the file.
                                                # - Empty then it's stateless
        clean: true                             # Clean db before server up
        initData: {                             # Init data for dynamic model name (/:model) when db not existed or `clean`=true
                                                # - Only init data when 
                                                #   + Db file not existed
                                                #   + OR set "cleaned"
                                                #   + OR not set dbFile
          posts: [{                             # When you request /posts, it returns the value
            "id": 1,
            "label": "label 01"
          }],
          users: [{                             # When you request /users, it returns the value
            "id": 1,
            "label": "user 01"
          }]  
        }

      # Create a API which you can customize response, path....
      - method: GET                             # Request method (POST, PUT, PATCH, DELETE, HEAD)
                                                # - Default method is GET
        path: /posts/:id                        # Request path
        response:                               # Response data
          status: 200                           # - Response status
          statusMessage: OK                     # - Response status message
          headers:                              # - Response headers
            server: nginx
          data: [                               # - Response data. 
            {                                   #   - Use some variables to replace value to response
              "id": ${+params.id},              # params:  Request params (/:id)
              "title": "title 1",               # headers: Request headers
              "author": "thanh"                 # query:   Request querystring (?name=thanh)
              "des": "des 1",                   # body:    Request body
            }                                   # request: Request
          ]                                     # ctx:     Context
      # Create a API which you handle request and response
      - method: GET                             # Request method (POST, PUT, PATCH, DELETE, HEAD)
                                                # - Default method is GET
        path: /posts/:id                        # Request path
        handler: !function |                    # Handle code which handle request and response data
          () {                                  # Load global variables into function. [More](https://github.com/doanthuanthanh88/yaml-scene/wiki#user-content-!tags-!function) 
            // this.params: Request params
            // this.headers: Request headers
            // this.query: Request query string
            // this.body: Request body
            // this.request: Request
            // this.ctx: Context (koajs)

            const merge = require('lodash.merge')   
            return merge({                          
              params: this.params.id,                    
              name: this.query.name                      
            }, {                                    
              id: 1
            })
          }
          
 */
export default class Server implements IElement {
  proxy: ElementProxy<this>
  $$: IElement
  $: this

  title: string;
  port?: number;
  host?: string;
  timeout?: number
  https?: {
    key: string;
    cert: string;
  };
  routers: ({
    CRUD: boolean
    dbFile: string
    clean: boolean
    initData?: any[]
    path: string
  } | {
    /** Server static files in these folders */
    serveIn: string | string[];
  } | {
    /** Upload file */
    path: string;
    method: string;
    uploadTo: string;
  } | {
    /** Mock response data */
    method: string;
    path: string;
    response?: {
      /** Respnse status */
      status?: number;
      /** Response status text */
      statusText?: string;
      /** Response headers */
      headers?: any;
      /** Response data */
      data?: any;
    }
  } | {
    /** Customize request and response */
    method: string;
    path: string;
    handler?: string | Functional
  })[]

  private _app: Koa;
  private _router: Router;
  private _server?: http.Server | https.Server;

  private get httpObject() {
    return !this.https ? http : https;
  }

  private get serverOption() {
    return this.https || {}
  }

  constructor() {
    this._app = new Koa();
    this._app.use(cors());
    this._router = new Router();
  }

  init(props: Partial<Server>) {
    merge(this, props);
  }

  async prepare() {
    await this.proxy.applyVars(this, 'title', 'host', 'port', 'timeout', 'routers')
    if (this.timeout) {
      this.timeout = TimeUtils.GetMsTime(this.timeout)
    }
    if (!this.host) this.host = '0.0.0.0';
    if (!this.port) this.port = !this.https ? 8000 : 4430;
  }

  private start() {
    return new Promise((resolve, reject) => {
      this._app
        .use(this._router.routes())
        .use(this._router.allowedMethods());
      this._server = this.httpObject.createServer(this.serverOption, this._app.callback());
      this._server.listen(this.port, this.host, async () => {
        const pause = ElementFactory.CreateTheElement<Pause>(Pause)
        pause.init({
          title: `Stop Http server at "${this.https ? 'https' : 'http'}://${this.host}:${this.port}"`,
          time: this.timeout
        })
        await pause.prepare()
        await pause.exec()
        await pause.dispose()
        try {
          await this.stop()
          resolve(undefined)
        } catch (err) {
          reject(err)
        }
      });
      this._server.on('error', (err) => {
        reject(err)
      })
    })
  }

  private async stop() {
    if (this._server) {
      await new Promise((resolve, reject) => {
        this._server.close(err => {
          if (err) return reject(err)
          this._server = undefined
          resolve(undefined)
        });
      })
    }
  }

  private async setupRouter() {
    this.proxy.logger.info(chalk.green('Routers:'))
    console.group()
    for (let i = 0; i < this.routers.length; i++) {
      const r: any = this.routers[i]
      if (r.serveIn) {
        const { default: serve } = await LazyImport(import('koa-static'))
        const serveIns: string[] = !Array.isArray(r.serveIn) ? [r.serveIn] : r.serveIn
        serveIns.forEach(serveIn => {
          this.proxy.logger.info(chalk.green(`✓ GET /**/* \t- SERVE IN \t${this.proxy.resolvePath(serveIn)}/**/*`));
          this._app.use(serve(this.proxy.resolvePath(serveIn)));
        })
      } else if (r.uploadTo) {
        r.method = r.method?.toUpperCase() || 'POST'
        r.uploadTo = this.proxy.resolvePath(r.uploadTo)
        FileUtils.MakeDirExisted(r.uploadTo, 'dir')
        this.proxy.logger.info(chalk.green(`✓ ${r.method} ${r.path} \t- UPLOAD TO \t${r.uploadTo}/*`));
        this._router[r.method.toLowerCase()](r.path, bodyParser({
          multipart: true,
          formidable: {
            uploadDir: r.uploadTo,
            keepExtensions: true,
            multiples: true,
          },
          urlencoded: true,
          formLimit: '500000mb',
        }), (ctx: Context, next: Function) => {
          ctx.body = { ...(ctx.request.files || {}), ...(ctx.request.body || {}) }
          return next();
        });
      } else if (r.CRUD) {
        this.proxy.logger.info(chalk.green(`✓ CRUD ${r.path}`));
        console.group()
        const crud = new CRUD(this.proxy.logger, r.path, this.proxy.resolvePath(r.dbFile), r.clean)
        if (r.initData) crud.init(r.initData)
        this.routers.splice(this.routers.findIndex(e => e === r), 1, ...crud.routers)
        i--
        console.groupEnd()
      } else {
        r.method = !r.method ? 'GET' : r.method.toUpperCase()
        if (r.path) {
          let handler: any
          if (!r.handler) {
            // Fix response data
            handler = async (ctx: Context, next: Function) => {
              if (r.response?.status)
                ctx.status = r.response?.status;
              if (r.response?.statusText)
                ctx.message = r.response?.statusText;
              if (r.response?.data) {
                ctx.body = cloneDeep(r.response.data);
                ctx.body = await this.proxy.getVar(ctx.body, { params: ctx.params, headers: ctx.headers, query: ctx.request.query, body: ctx.request.body, request: ctx.request, ctx: ctx });
              }
              if (ctx.body === undefined) ctx.body = null
              return next()
            }
          } else if (r.handler) {
            let _handler: Function
            if (typeof r.handler !== 'function') {
              _handler = Functional.GetFunction(r.handler).getFunctionFromBody()
            } else {
              _handler = r.handler
            }
            handler = async (ctx: Context, next: Function) => {
              const rs = await this.proxy.call(_handler, undefined, { params: ctx.params, headers: ctx.headers, query: ctx.request.query, body: ctx.request.body, request: ctx.request, ctx: ctx })
              if (ctx.body === undefined) ctx.body = rs
              if (ctx.body === undefined) ctx.body = null
              return next()
            }
          }
          this.proxy.logger.info(chalk.green(`✓ ${r.method} ${r.path}`));
          this._router[r.method.toLowerCase()](r.path, bodyParser({
            multipart: true,
            urlencoded: true,
          }), handler);
        }
      }
    }
    console.groupEnd()
  }

  async exec() {
    if (this.title) this.proxy.logger.info(this.title);
    this.title && console.group();
    try {
      await this.setupRouter()
      await this.start() as any;
    } finally {
      this.title && console.groupEnd();
    }
  }

  async dispose() {
    await this.stop();
  }

}
