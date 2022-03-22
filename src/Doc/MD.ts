import Api from "@app/Api"
import { File } from "yaml-scene/src/elements/File/adapter/File"
import { TimeUtils } from "yaml-scene/src/utils/time"
import merge from "lodash.merge"
import { ElementProxy } from "yaml-scene/src/elements/ElementProxy"
import { Exporter } from "./Exporter"

/**
 * @guide
 * @name yas-http/Doc/MD
 * @description Document api to markdown format
 * @order 6
 * @group Doc, Api
 * @example
- yas-http/Doc/MD:
    title: Post service
    description: Demo CRUD API to generate to markdown document
    signature: "[Doan Thuan Thanh](mailto:doanthuanthanh88@gmail.com)"
    outFile: ./api_document_details.md
 * @end
 */
export default class ApiMD {
  proxy: ElementProxy<ApiMD>
  apis: Api[]

  title: string
  description: string
  signature: string

  outFile: string

  constructor() {
    this.apis = new Array()
  }

  init(props: any) {
    if (!props.outFile) throw new Error(`"outFile" is required in ${this.constructor.name}`)
    merge(this, props)
    this.proxy.scenario.events
      .on('api.done', (isPassed: boolean, api) => {
        if (isPassed && !!api.doc) {
          this.apis.push(api)
        }
      })
  }

  prepare() {
    this.outFile = this.proxy.resolvePath(this.outFile)
  }

  async exec() {
    this.proxy.logger.debug('Processing to generate to API Document...')
    // Wait 2s to make sure the lastest api event "api.done" fired
    await TimeUtils.Delay('1s')

    const exporter = new Exporter(new File(this.outFile), this)
    exporter.export(this.apis.sort((a, b) => a.title > b.title ? 1 : -1))
    this.proxy.logger.info(`API Document generated at ${this.outFile}`)
  }

}
