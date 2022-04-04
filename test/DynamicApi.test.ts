import { join } from "path"
import { Simulator } from "yaml-scene/src/Simulator"
import { VariableManager } from "yaml-scene/src/singleton/VariableManager"

describe('Serve dynamic APIs', () => {
  const port = 3003
  beforeAll(async () => {
    await Simulator.Run(`
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
            timeout: 5s
            title: Mock http request
            port: ${port}
            routers:
              - path: /:model
                CRUD: true
                dbFile: ./db.json
                clean: true
                initData: {
                  posts: [
                    { "id": 1, "title": "title", "author": "typicode" }
                  ],
                  users: [
                    { "id": 1, "title": "user 1", "author": "typicode" }
                  ]
                }
        - Group:
            title: Posts
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
                  validate:
                    - title: Check response status
                      chai: \${expect($.response.status).to.equal(200)}

              - yas-http/Delete:
                  <-: base
                  title: Delete a post
                  url: /posts/:id
                  params:
                    id: 2
                  var: 
                    status: \${$.response.status}

        - Group:
            title: Users
            async: true
            steps:
              - yas-http/Get:
                  <-: base
                  title: Get all of users
                  url: /users
                  var: users
        
              - yas-http/Post:
                  <-: base
                  title: Create a new user
                  url: /users
                  body:
                    id: 2
                    title: title 2
                    author: typicode 2
                  var: newUser
        
              - yas-http/Put:
                  <-: base
                  title: Update a user
                  url: /users/:id
                  params:
                    id: 2
                  body:
                    id: 2
                    title: title updated
                    author: typicode 2 updated
                  var: updateUser
        
              - yas-http/Patch:
                  <-: base
                  title: Update a user
                  url: /users/:id
                  params:
                    id: 2
                  body:
                    id: 2
                    title: title updated
                    author: typicode 2 updated
                  var: updatedHUser
        
              - yas-http/Get:
                  <-: base
                  title: Get a user details
                  url: /users/:id
                  params:
                    id: 2
                  var: detailUser
                  validate:
                    - title: Check response status
                      chai: \${expect($.response.status).to.equal(200)}
        
              - yas-http/Delete:
                  <-: base
                  title: Delete a user
                  url: /users/:id
                  params:
                    id: 2
                  var: 
                    deleteUserStatus: \${$.response.status}

        - yas-http/Summary:
            title: API Summary
  `)
  })

  test('Get all of posts', () => {
    expect(VariableManager.Instance.vars.posts).toHaveLength(1)
  })
  test('Create a new posts', () => {
    expect(VariableManager.Instance.vars.newOne?.id).toBe(2)
  })
  test('Update a post', async () => {
    expect(VariableManager.Instance.vars.updatedOne.title).toBe('title updated')
  })
  test('Update apart of post', async () => {
    expect(VariableManager.Instance.vars.updatedHOne.title).toBe('title updated')
  })
  test('Get a post details', async () => {
    expect(VariableManager.Instance.vars.details.title).toBe('title updated')
  })
  test('Delete a post', async () => {
    expect(VariableManager.Instance.vars.status).toBe(204)
  })

  test('Get all of users', () => {
    expect(VariableManager.Instance.vars.users).toHaveLength(1)
  })
  test('Create a new users', () => {
    expect(VariableManager.Instance.vars.newUser?.id).toBe(2)
  })
  test('Update a user', async () => {
    expect(VariableManager.Instance.vars.updateUser.title).toBe('title updated')
  })
  test('Update apart of user', async () => {
    expect(VariableManager.Instance.vars.updatedHUser.title).toBe('title updated')
  })
  test('Get a user details', async () => {
    expect(VariableManager.Instance.vars.detailUser.title).toBe('title updated')
  })
  test('Delete a user', async () => {
    expect(VariableManager.Instance.vars.deleteUserStatus).toBe(204)
  })
})