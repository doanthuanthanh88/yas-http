import Api from "@app/Api"
import chalk from "chalk"
import merge from "lodash.merge"
import { ElementProxy } from "yaml-scene/src/elements/ElementProxy"
import { File } from "yaml-scene/src/elements/File/adapter/File"
import { IElement } from "yaml-scene/src/elements/IElement"
import { Scenario } from "yaml-scene/src/singleton/Scenario"
import { TraceError } from "yaml-scene/src/utils/error/TraceError"
import { TimeUtils } from "yaml-scene/src/utils/TimeUtils"
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
    prefixHashLink:                        # Default is `user-content-` for github
 * @end
 */
export default class ApiMD implements IElement {
  proxy: ElementProxy<this>
  $$: IElement
  $: this

  private _apis: Api[]

  title: string
  description: string
  signature: string
  prefixHashLink: string

  outFile: string

  constructor() {
    this._apis = []
  }

  init(props: any) {
    merge(this, props)
    Scenario.Instance.events
      .on('api.done', (isPassed: boolean, api) => {
        if (isPassed && !!api.doc) {
          this._apis.push(api)
        }
      })
  }

  async prepare() {
    await this.proxy.applyVars(this, 'title', 'description', 'signature', 'outFile', 'prefixHashLink')
    if (!this.outFile) throw new TraceError(`"outFile"  is required`, { outFile: this.outFile })
    this.outFile = this.proxy.resolvePath(this.outFile)
    if (!this.prefixHashLink) this.prefixHashLink = 'user-content-'
  }

  async exec() {
    this.proxy.logger.debug('Processing to generate to API Document...')
    // Wait 2s to make sure the lastest api event "api.done" fired
    await TimeUtils.Delay('1s')

    const exporter = new Exporter(new File(this.outFile), this)
    await exporter.export(this._apis.sort((a, b) => a.title > b.title ? 1 : -1))
    this.proxy.logger.info(chalk.green(`API Document is saved to "${this.outFile}"`))
  }

}
