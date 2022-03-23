import { readFileSync, unlinkSync } from "fs"
import { join } from "path"
import { Simulator } from "yaml-scene/src/Simulator"
import { Scenario } from "yaml-scene/src/singleton/Scenario"

describe('Api CRUD, serve', () => {
  const port = 3003
  let scenario: Scenario

  beforeAll(async () => {
    scenario = await Simulator.Run(`
extensions:
  yas-http: ${join(__dirname, '../src')}
steps:
  - Templates:
    - yas-http/Api:
        ->: base
        baseURL: http://localhost:${port}

  - Group:
      steps:
        - yas-http/Server:
            async: true
            timeout: 20s
            title: Mock http request
            port: ${port}
            routers:
              - serveIn: ${join(__dirname, 'assets')}
              - path: /upload
                uploadTo: ${join(__dirname, 'assets', 'upload')}
              - method: GET
                path: /posts
                response:
                  status: 200
                  statusMessage: OK
                  headers:
                    server: nginx
                  data: [
                    { "id": 1, "title": "title", "author": "typicode" }
                  ]
              - method: GET
                path: /posts/:id
                handler: |
                  headers.server = 'nginx'
                  ctx.status = 200
                  ctx.statusMessage = 'OK'

                  return {
                    "id": 1, 
                    "title": "title updated", 
                    "author": "typicode" 
                  }
              - method: POST
                path: /posts
                response:
                  status: 200
                  statusMessage: OK
                  headers:
                    server: nginx
                  data: { "id": 2, "title": "title", "author": "typicode" }
              - method: PUT
                path: /posts/:id
                response:
                  status: 200
                  statusMessage: OK
                  headers:
                    server: nginx
                  data: { "id": 2, "title": "title updated", "author": "typicode" }
              - method: PATCH
                path: /posts/:id
                response:
                  status: 200
                  statusMessage: OK
                  headers:
                    server: nginx
                  data: { "id": 2, "title": "title updated", "author": "typicode" }
              - method: DELETE
                path: /posts/:id
                response:
                  status: 200
                  statusMessage: OK
                  headers:
                    server: nginx
        - Group:
            async: true
            steps:
              - yas-http/Get:
                  <-: base
                  title: Get all of posts
                  url: /posts
                  var: posts

              - yas-http/Post:
                  <-: base
                  title: Create a new post
                  url: /posts
                  body:
                    id: 2
                    title: title 2
                    author: typicode 2
                  var: newOne

              - yas-http/Put:
                  <-: base
                  title: Update a post
                  url: /posts/:id
                  params:
                    id: 2
                  body:
                    id: 2
                    title: title updated
                    author: typicode 2 updated
                  var: updatedOne

              - yas-http/Patch:
                  <-: base
                  title: Update a post
                  url: /posts/:id
                  params:
                    id: 2
                  body:
                    id: 2
                    title: title updated
                    author: typicode 2 updated
                  var: updatedHOne

              - yas-http/Get:
                  <-: base
                  title: Get a post details
                  url: /posts/:id
                  params:
                    id: 2
                  var: details

              - yas-http/Delete:
                  <-: base
                  title: Delete a post
                  url: /posts/:id
                  params:
                    id: 2
                  var: 
                    status: \${_.response.status}

              - yas-http/Post:
                  <-: base
                  title: Upload a file to server
                  url: /upload
                  headers:
                    content-type: multipart/form-data
                  body:
                    name: a
                    file1: !binary ${join(__dirname, 'assets/test1.txt')}
                    file2: !binary ${join(__dirname, 'assets/test2.txt')}
                  var: filesUpload

              - yas-http/Get:
                  <-: base
                  title: Get a static file
                  url: /test1.txt
                  var: staticFile
        - yas-http/Summary:
            title: API Summary
  `)
  }, 60000)

  test('Get all of posts', () => {
    expect(scenario.variableManager.vars.posts).toHaveLength(1)
  })
  test('Create a new posts', () => {
    expect(scenario.variableManager.vars.newOne?.id).toBe(2)
  })
  test('Update a post', async () => {
    expect(scenario.variableManager.vars.updatedOne.title).toBe('title updated')
  })
  test('Update apart of post', async () => {
    expect(scenario.variableManager.vars.updatedHOne.title).toBe('title updated')
  })
  test('Get a post details', async () => {
    expect(scenario.variableManager.vars.details.title).toBe('title updated')
  })
  test('Delete a post', async () => {
    expect(scenario.variableManager.vars.status).toBe(204)
  })

  test('Upload file', async () => {
    expect(Object.keys(scenario.variableManager.vars.filesUpload).length).toEqual(3)
    expect(readFileSync(scenario.variableManager.vars.filesUpload.file1.path).toString()).toEqual('Hello 1')
    expect(readFileSync(scenario.variableManager.vars.filesUpload.file2.path).toString()).toEqual('Hello 2')

    unlinkSync(scenario.variableManager.vars.filesUpload.file1.path)
    unlinkSync(scenario.variableManager.vars.filesUpload.file2.path)
  })

  test('Get static file', async () => {
    expect(scenario.variableManager.vars.staticFile).toEqual('Hello 1')
  })
})