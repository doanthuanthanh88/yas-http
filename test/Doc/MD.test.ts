import { readFileSync } from "fs"
import { join } from "path"
import { Simulator } from "yaml-scene/src/Simulator"
import { VariableManager } from "yaml-scene/src/singleton/VariableManager"


test('Export to api document markdown', async () => {
  await Simulator.Run(`
extensions:
  yas-http: ${join(__dirname, '../../src')}
steps:
  - Templates:
    - yas-http/Api:
        ->: base
        baseURL: http://localhost:3000
  - Group:
      steps:        
        - yas-http/Server:
            async: true
            host: localhost
            port: 3000
            timeout: 5s
            routers: 
              - path: /posts
                CRUD: true
                initData:
                  - id: 1
                    title: title
                    labels: 
                      - news
                      - user
                    creator: 
                      name: thanh
                      created_time: ${Date.now()}
                    tags:
                      - id: 1
                        name: thanh 1
                      - id: 2
                        name: thanh 2
        - Group:
            async: true
            steps:
              - yas-http/Get:
                  <-: base
                  title: Get all of posts
                  url: /posts
                  var: posts
                  doc: 
                    tags: [POST, RETURNS]

              - yas-http/Post:
                  <-: base
                  title: Create a new post
                  url: /posts
                  body:
                    id: 2
                    title: title 2
                    author: typicode 2
                  var: newOne
                  doc: 
                    tags: [POST, ACTIONS]

              - yas-http/Put:
                  <-: base
                  title: Update a post
                  url: /posts/:id
                  params:
                    id: 2
                  body:
                    id: 2
                    title: title 2 updated
                    author: typicode 2 updated
                  var: updatedOne
                  doc: 
                    tags: [POST, ACTIONS]

              - yas-http/Get:
                  <-: base
                  title: Get a post details
                  url: /posts/:id
                  params:
                    id: 2
                  var: details
                  doc: 
                    tags: [POST, RETURNS]

              - yas-http/Get:
                  <-: base
                  title: This is documented by default tag
                  url: /posts/:id
                  params:
                    id: 2
                  var: details
                  doc: true

              - yas-http/Get:
                  <-: base
                  title: This is not documented
                  url: /posts/:id
                  params:
                    id: 2
                  var: details
                  doc: false

              - yas-http/Delete:
                  <-: base
                  title: Delete a post
                  url: /posts/:id
                  params:
                    id: 2
                  var: 
                    status: \${$.response.status}
                  doc: 
                    tags: [POST, ACTIONS]

  - yas-http/Doc/MD:
      title: Post service
      description: Demo CRUD API to generate to markdown document
      signature: "[Doan Thuan Thanh](mailto:doanthuanthanh88@gmail.com)"
      outFile: ${join(__dirname, 'ApiMD.md')}
`)
  expect(VariableManager.Instance.vars.posts).toHaveLength(1)
  expect(VariableManager.Instance.vars.newOne?.id).toBe(2)
  expect(VariableManager.Instance.vars.updatedOne.title).toBe('title 2 updated')
  expect(VariableManager.Instance.vars.details.title).toBe('title 2 updated')
  expect(VariableManager.Instance.vars.status).toBe(204)

  const cnt = readFileSync(`${join(__dirname, 'ApiMD.md')}`).toString()
  expect(cnt).toContain('Get a post details')
  expect(cnt).not.toContain('This is not documented')
})