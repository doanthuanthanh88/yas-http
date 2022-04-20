import Api from '@app/Api';
import omit from 'lodash.omit';
import { escape } from 'querystring';
import { IFileWriter } from 'yaml-scene/src/elements/File/writer/IFileWriter';
import { Scenario } from 'yaml-scene/src/singleton/Scenario';
import { Exporter as IExporter } from 'yaml-scene/src/utils/doc/Exporter';
import MD from './MD';

export class Exporter implements IExporter<Api> {
  readonly ignoreRequestHeaders = ['content-type']
  readonly ignoreResponseHeaders = [
    'x-powered-by',
    'vary',
    'access-control-allow-credentials',
    'cache-control',
    'pragma',
    'expires',
    'access-control-expose-headers',
    'location',
    'x-content-type-options',
    'content-type',
    'content-length',
    'etag',
    'date',
    'connection',
  ]

  constructor(private writer: IFileWriter, public md: MD) {
  }

  getHashLink(...txts: string[]) {
    return escape(this.md.prefixHashLink + txts.join('-')).toLowerCase()
  }

  async export(apis: Api[]) {
    const mdMenu = [`# ${this.md.title || Scenario.Instance.element.title}`, `${this.md.description || Scenario.Instance.element.description || ''}`];
    const mdDetails = [] as string[];

    if (this.md.signature) {
      mdMenu.push(`> Developed by ${this.md.signature}  `)
    }
    mdMenu.push(`> Updated at ${new Date().toLocaleString()}  `)

    mdMenu.push('', `| | Title (${apis.length}) | URL |  `, `|---|---|---|  `)
    apis.sort((a, b) => a.title > b.title ? 1 : -1)

    const tags = apis.reduce((tags, api) => {
      (api.doc.tags || [' DEFAULT']).forEach(tagName => {
        if (!tags[tagName]) tags[tagName] = []
        tags[tagName].push(api)
      })
      return tags
    }, {} as { [key: string]: Api[] })

    Object.keys(tags).sort().forEach(tagName => {
      mdMenu.push(`| |${tagName.trim()} (${tags[tagName].length}) | |`)
      tags[tagName].forEach((api, i) => {
        mdMenu.push(`|**${i + 1}**|[${api.title}](#${this.getHashLink(api.title)})| \`${api.method}\` ${api.url}|  `)
      })
    })
    apis.forEach((api) => {
      const details = []
      details.push('', '---', '', `<a id="${this.getHashLink(api.title)}" name="${this.getHashLink(api.title)}"></a>`, `## [${api.title}](#)
${api.description || ''}`, '')

      details.push(`
- \`${api.method} ${api.url}\`
- ✅  &nbsp; **${api.response.status}**  *${api.response.statusText || ''}*
`, '')
      details.push(`
<details open>
<summary><b>cURL</b></summary>

\`\`\`sh
${api.curl}
\`\`\`

</details>
`, '')
      details.push('', '<br/>', '', '## REQUEST')

      if (api.params && Object.keys(api.params).length) {
        details.push(`### Params
<details>
  <summary>Example</summary>

\`\`\`json
${JSON.stringify(api.params, null, '  ')}
\`\`\`

</details>

<details open>
  <summary>Schema</summary>

${this.objectToMDType(api.params)}

</details>
`)
      }

      if (api.query && Object.keys(api.query).length) {
        details.push(`### Querystring
<details>
  <summary>Example</summary>

\`\`\`json
${JSON.stringify(api.query, null, '  ')}
\`\`\`

</details>

<details open>
  <summary>Schema</summary>

${this.objectToMDType(api.query)}

</details>
`)
      }

      if (api.headers) {
        const headers = omit(api.headers, this.ignoreRequestHeaders)
        if (Object.keys(headers).length) {
          details.push(`### Request headers
<details>
  <summary>Example</summary>

\`\`\`json
${JSON.stringify(headers, null, '  ')}
\`\`\`

</details>

<details open>
  <summary>Schema</summary>

${this.objectToMDType(headers)}

</details>
`)
        }
      }

      if (api.body) {
        details.push(`### Request body
\`Content-Type: *${api.contentType}*\`  

<details>
  <summary>Example</summary>

\`\`\`json
${JSON.stringify(api.body, null, '  ')}
\`\`\`

</details>

<details open>
  <summary>Schema</summary>

${this.objectToMDType(api.body)}

</details>
`)
      }

      details.push(`## RESPONSE`)

      if (api.response.headers) {
        const headers = omit(api.headers, this.ignoreRequestHeaders)
        if (Object.keys(headers).length) {
          details.push(`### Response headers
<details>
  <summary>Example</summary>

\`\`\`json
${JSON.stringify(headers, null, '  ')}
\`\`\`

</details>

<details open>
  <summary>Schema</summary>

${this.objectToMDType(headers)}

</details>
`)
        }
      }

      if (api.response.data !== undefined) {
        details.push(`### Response data
\`Content-Type: *${api.responseContentType}*\`  

<details>
  <summary>Example</summary>

\`\`\`json
${JSON.stringify(api.response.data, null, '  ')}
\`\`\`

</details>

<details open>
  <summary>Schema</summary>

${this.objectToMDType(api.response.data)}

</details>
`)
      }

      mdDetails.push(details.join('\n'))

    })

    await this.writer.write([...mdMenu, '  ', ...mdDetails, '  '].join('\n'));
  }

  private objectToMDType(obj: any) {
    const md = []
    md.push(`| Name | Type |`)
    md.push(`| --- | --- |`)
    this.objectToTypes({ '@ROOT': obj }).forEach((info: any) => {
      md.push(...this.toMDString(info))
    })
    return md.length > 2 ? md.join('\n') : ''
  }

  private toMDString(info: any) {
    const md = []
    md.push(`| ${info.space} \`${info.name}\` | ${Array.from(info.types).join(', ')} |`)
    if (info.childs.length) {
      info.childs.forEach((child: any) => {
        md.push(...this.toMDString(child))
      })
    }
    return md
  }

  private objectToTypes(obj: any, space = '') {
    if (Array.isArray(obj)) {
      const arr = [] as any[]
      obj.forEach(o => {
        arr.push(...this.objectToTypes(o, space))
      })
      return arr.reduce((sum, child) => {
        const existed = sum.find(c => c.name === child.name)
        if (existed) {
          existed.types.add(...child.types)
        } else {
          sum.push(child)
        }
        return sum
      }, [])
    } else if (typeof obj === 'object') {
      return Object.keys(obj).map(key => {
        const info = {
          space,
          name: key,
          types: new Set(),
          childs: []
        }
        if (Array.isArray(obj[key])) {
          info.types.add(`array&lt;${Array.from(new Set(obj[key].map(e => typeof e))).join(',')}&gt;`)
        } else {
          info.types.add(typeof obj[key])
        }
        info.childs = this.objectToTypes(obj[key], space + '&nbsp;&nbsp;&nbsp;&nbsp;')
        return info
      })
    }
    return []
  }
}
