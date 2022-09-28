import Axios from "axios"
import chalk from "chalk"
import { CurlGenerator } from 'curl-generator'
import { createWriteStream } from "fs"
import { Agent } from 'http'
import { Agent as Agents } from 'https'
import merge from "lodash.merge"
import { parse, stringify } from 'querystring'
import { ElementFactory } from "yaml-scene/src/elements/ElementFactory"
import { ElementProxy } from "yaml-scene/src/elements/ElementProxy"
import { IElement } from "yaml-scene/src/elements/IElement"
import Validate from "yaml-scene/src/elements/Validate"
import { LogLevel } from "yaml-scene/src/singleton/LoggerManager"
import { Scenario } from 'yaml-scene/src/singleton/Scenario'
import { LazyImport } from 'yaml-scene/src/utils/LazyImport'
import { TimeUtils } from "yaml-scene/src/utils/TimeUtils"
import { Method } from "./Method"

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
Axios.defaults.maxRedirects = Number.MAX_SAFE_INTEGER
Axios.defaults.withCredentials = true
Axios.defaults.httpAgent = new Agent()
Axios.defaults.httpsAgent = new Agents()

/*****
 * @name yas-http/Api
 * @description Send a request via http with custom method
 * @group Api
 * @order 3
 * @example
- yas-http/Api:
    title: Update a product                                     # Api name
    description: It's only serve content for admin              # Api description
    doc: true                                                   # Document it. Reference to "yas-http/Doc/MD"
    doc: 
      tags: [USER]
    method: PUT                                                 # Request method (GET, POST, PUT, DELETE, PATCH, HEAD...)
    baseURL: http://localhost:3000                              
    url: /product/:id
    params:                                                     # Request params. (In the example, url is "/product/1")
      id: 1
    query:                                                      # Request querystring (In the example, url is appended "?order=name")
      order: name
    headers:                                                    # Request headers
      authorization: ...
    body:                                                       # Request body which used in [POST, PUT, PATCH...] methods
      name: "thanh"
      file: !tag
        file/stream: ./my_file.txt                              # Upload a file to server (content-type: multipart/form-data)
    
    var: "responseData"                                         # Set response data to "responseData" in global vars
    
    var:                                                        # Map response data to global vars
      status: ${$.response.status}
      responseData: ${$.response.data}

    timeout: 1s                                                 # Request timeout
    saveTo: /file_downloaded.txt                                # Request file to server then download and save to this path
    validate:                                                   # Validate response after request done. Reference to [Validate](https://github.com/doanthuanthanh88/yaml-scene/wiki#Validate)
      - title: Response status is valid
        chai: ${expect($.response.status).to.equal(200)}        # `$.response` is response data after send a request. ($.params, $.query...)
 */
export default class Api implements IElement {
  proxy: ElementProxy<this>
  $$: IElement
  $: this
  logLevel?: LogLevel

  title: string
  description: string
  doc: {
    tags: string[]
  }
  method: Method
  baseURL: string
  url: string
  timeout?: number
  query: any
  params: any
  headers: any
  body: any
  response: any

  error: any
  time: number
  var: any
  validate: ElementProxy<Validate>[]
  saveTo: string
  fullUrl: string
  config: any

  private _controller: AbortController

  get contentType() {
    return this.headers['content-type'] || this.headers['Content-Type']
  }

  get responseContentType() {
    return this.response?.headers['content-type'] || this.response?.headers['Content-Type']
  }

  get curl() {
    return CurlGenerator({
      method: this.method as any,
      headers: Object.keys(this.headers || {}).reduce((sum, e) => {
        sum[e] = (this.headers[e] || '').toString()
        return sum
      }, {}),
      body: this.body,
      url: this.fullUrl
    })
  }

  init(props: any) {
    if (typeof props.doc === 'boolean') {
      props.doc = props.doc ? {} : undefined
    }
    merge(this, { method: Method.GET }, props)
  }

  async prepare() {
    await this.proxy.applyVars(this, 'title', 'description', 'baseURL', 'timeout', 'url', 'params', 'query', 'headers', 'body', 'saveTo', 'doc')
    if (this.url.includes('?')) {
      const [rawUrl, qr = ''] = this.url.split('?')
      this.url = rawUrl
      const qrObject = this.proxy.getVar(parse(qr))
      this.query = merge({}, qrObject, this.query)
    }
    if (this.timeout) this.timeout = TimeUtils.GetMsTime(this.timeout)
    if (!this.baseURL) this.baseURL = ''
    if (!this.params) this.params = {}
    if (!this.query) this.query = {}
    if (!this.headers) this.headers = {}
    if (!this.headers['content-type']) this.headers['content-type'] = 'application/json'
    this.fullUrl = `${this.baseURL}${this.url}`
    const _url = new URL(this.fullUrl)
    const schema = _url.origin
    const url = this.fullUrl.substring(schema.length)
    const urlPath = url.split('\\:').map(seq => seq.replace(/(\:(\w+))/g, `$\{urlParams.$2\}`)).join(':')
    this.fullUrl = schema + (await this.proxy.getVar(urlPath, { urlParams: this.params }))
    if (this.saveTo) this.saveTo = this.proxy.resolvePath(this.saveTo)
    this.validate = this.validate?.map((v: any) => {
      const _v = ElementFactory.CreateTheElement<Validate>(Validate)
      _v.changeLogLevel(this.logLevel)
      _v.init(v)
      _v.element.$ = this.$
      _v.element.$$ = this.$$
      return _v
    })
  }

  async exec() {
    const { method, baseURL, query, headers, body, params } = this
    try {
      this.proxy.logger.info(chalk.cyan.bold('‣', this.title), chalk.gray('-', `${this.method} ${this.url}`))
      console.group()
      this.time = Date.now()
      this._controller = new AbortController()
      let { status, statusText, headers: responseHeaders, data } = await Axios.create({
        signal: this._controller.signal,
      }).request({
        timeout: this.timeout,
        responseType: this.saveTo ? 'stream' : undefined,
        ...this.config,
        method,
        baseURL,
        url: this.fullUrl,
        urlParams: params,
        params: query,
        headers,
        data: await (async () => {
          if (body) {
            if (this.contentType?.includes('application/x-www-form-urlencoded')) {
              const data = new URLSearchParams()
              for (let k in body) {
                data.append(k, body[k])
              }
              return data
            }
            if (this.contentType?.includes('multipart/form-data')) {
              const { default: FormData } = await LazyImport(import('form-data'))
              const data = new FormData()
              for (let k in body) {
                data.append(k, body[k])
              }
              merge(this.headers, data.getHeaders())
              const [{ ProgressBar }, { ReaderProgressBar }] = await Promise.all([LazyImport(import("./libs/progress-bar/ProgressBar")), LazyImport(import("./libs/progress-bar/ReaderProgressBar"))])
              const progressBar = new ProgressBar('Upload Progress || {bar} | {percentage}% || {value}/{total} bytes || Speed: {speed}')
              progressBar.total = await new Promise<number>((resolve, reject) => {
                data.getLength((err: Error, len: number) => {
                  if (err) return reject(err)
                  resolve(len)
                })
              })
              new ReaderProgressBar(data, 'Uploaded {value} bytes', progressBar)
              return data
            }
          }
          return body
        })(),
      } as any)
      if (this.saveTo) {
        const [{ ProgressBar }, { ReaderProgressBar }] = await Promise.all([LazyImport(import("./libs/progress-bar/ProgressBar")), LazyImport(import("./libs/progress-bar/ReaderProgressBar"))])
        new ReaderProgressBar(data, `Dowloaded {value} bytes`, new ProgressBar('Download Progress || {value} bytes || Speed: {speed}'))
        await new Promise((resolve, reject) => {
          const writer = createWriteStream(this.saveTo)
          data.pipe(writer)
          writer.on('error', reject)
          writer.on('close', resolve)
        })
        this.proxy.logger.debug(chalk.magenta(`- Response saved at "${this.saveTo}"`))
        data = new URL(this.saveTo, 'file://')
      }
      this.time = Date.now() - this.time
      this.response = {
        status,
        statusText,
        headers: responseHeaders,
        data
      }
    } catch (err: any) {
      this.time = Date.now() - this.time
      this.error = err
      if (err.response) {
        const { status, statusText, headers: responseHeaders, data } = err.response
        this.response = {
          status,
          statusText,
          headers: responseHeaders,
          data
        }
      }
    } finally {
      if (!Axios.isCancel(this.error)) {
        if (this.response) {
          this.proxy.logger.info('%s %s', chalk[this.error ? 'red' : 'green'](`${this.response.status} ${this.response.statusText}`), chalk.gray(` (${this.time}ms)`))
          try {
            await this.validateAPI()
            this.error = undefined
            await this.applyToVar()
          } catch (err) {
            this.error = err
            this.proxy.changeLogLevel('debug')
          }
        }
        this.printLog()
        if (this.error) {
          Scenario.Instance.events.emit('api.done', false, this)
          throw this.error
        } else {
          Scenario.Instance.events.emit('api.done', true, this)
        }
      }
      console.groupEnd()
    }
  }

  async dispose() {
    if (this.validate?.length) await Promise.all(this.validate.map(v => v.dispose()))
    this.cancel()
  }

  cancel() {
    this._controller?.abort()
  }

  private printLog() {
    if (this.proxy.logger.is('debug')) {
      console.group()
      this.proxy.logger.debug(chalk.magenta.underline.bold(this.curl))
      let fullUrl = `${this.baseURL}${this.fullUrl}`
      if (Object.keys(this.query).length) fullUrl += '?' + stringify(this.query, undefined, undefined, { encodeURIComponent: str => str })
      this.proxy.logger.debug('')
      this.proxy.logger.debug(chalk.bgMagenta.white(' Request '))
      console.group()
      this.proxy.logger.debug('%s: %s', chalk.magenta('* Method'), this.method)
      this.proxy.logger.debug('%s: %s', chalk.magenta('* URL'), fullUrl)

      const reqHeaders = Object.keys(this.headers)
      if (reqHeaders.length) {
        this.proxy.logger.debug('%s: ', chalk.magenta('* Headers'))
        console.group()
        reqHeaders.forEach(k => this.proxy.logger.debug(`• %s: %s`, chalk.magenta(k), this.headers[k]))
        console.groupEnd()
      }
      // Request body
      if (this.body) {
        this.proxy.logger.debug('%s: ', chalk.magenta('* Body'))
        this.proxy.logger.debug(this.body)
      }
      console.groupEnd()

      this.proxy.logger.debug('')
      this.proxy.logger.debug(chalk.bgMagenta.white(' Response '))
      const res = this.response
      if (res) {
        console.group()
        this.proxy.logger.debug('%s: %s - %s', chalk.magenta('* Status'), res.status, res.statusText)
        // Response headers
        const resHeaders = Object.keys(res.headers)
        if (resHeaders.length > 0) {
          this.proxy.logger.debug('%s: ', chalk.magenta('* Headers'))
          console.group()
          resHeaders.forEach(k => this.proxy.logger.debug(`• %s: %s`, chalk.magenta(k), res.headers[k]))
          console.groupEnd()
        }
        // Response data
        if (res.data) {
          this.proxy.logger.debug('%s: ', chalk.magenta('* Data'))
          this.proxy.logger.debug(res.data)
        }
        console.groupEnd()
      }
      console.groupEnd()
    }
  }

  private async validateAPI() {
    if (this.validate?.length) {
      for (const v of this.validate) {
        await v.prepare()
        await v.exec()
      }
    }
  }

  private async applyToVar() {
    if (this.var && this.response) {
      await this.proxy.setVar(this.var, { $: this.$ }, '$.response.data')
    }
  }

}
