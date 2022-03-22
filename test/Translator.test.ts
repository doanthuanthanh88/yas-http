import { join } from "path"
import { Simulator } from "yaml-scene/src/Simulator"
import { Scenario } from "yaml-scene/src/singleton/Scenario"

describe('Unit test extension', () => {
  let scenario: Scenario

  beforeAll(async () => {
    scenario = await Simulator.Run(`
extensions:
  yaml-scene-extension: ${join(__dirname, '../src')}
steps:
  - yaml-scene-extension/Translator:
      text: hello
      lang: vi
      var: 
        trans: \${_}
        translatedText: \${_.result}
`)
  })

  test('Check value via object reference', () => {
    const trans = scenario.variableManager.vars.trans
    // Check object here
    expect(trans.result).toBe('Xin chào')
  })

  test('Check value via environment variables', () => {
    expect(scenario.variableManager.vars.translatedText).toBe('Xin chào')
  })

})
