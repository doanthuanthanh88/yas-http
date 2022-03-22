import chalk from "chalk"
import merge from "lodash.merge"
import { ElementProxy } from "yaml-scene/src/elements/ElementProxy"
import { TimeUtils } from "yaml-scene/src/utils/time"

/**
 * @guide
 * @name yas-http/Summary
 * @description Summary after all of apis in scene executed done. (It's should be the last step)
 * @group Api
 * @order 7
 * @example
- yas-http/Summary:
    title: Testing result
 * @end
 */
export default class Summary {
  proxy: ElementProxy<Summary>

  title: string

  private passed = 0
  private failed = 0
  get total() {
    return this.passed + this.failed
  }

  init(props: string) {
    if (props && typeof props !== 'object') {
      this.title = props
    } else {
      merge(this, props)
    }
    this.proxy.scenario.events
      .on('api.done', isPassed => {
        if (isPassed) {
          this.passed++
        } else {
          this.failed++
        }
      })
  }

  async exec() {
    await TimeUtils.Delay('1s')
    this.proxy.logger.info('---------------------------------')
    console.group()
    this.proxy.logger.info('%s %s', chalk.cyan.bold(this.title), chalk.gray(`${this.proxy.scenario.time.dispose - this.proxy.scenario.time.begin}ms`))
    this.proxy.logger.info(chalk.green('- Passed %d/%d'), this.passed, this.total)
    this.proxy.logger.info(chalk.red('- Failed %d/%d'), this.failed, this.total)
    console.groupEnd()
    this.proxy.logger.info('---------------------------------')
  }
}
