# yas-http
Support to send http(s) requests, API document and Http(s) mock server  

> It's an extension for `yaml-scene`  

## Features:
- Create testcases to test APIs
- Send http(s) requests
- Create a mock API server
  - Server static file
  - Support upload file then save to server
  - Server RESTFul API data 
  - Create APIs which auto handle CRUD data  
  - Build router for yourself by code
- Generate API document

## Demo
1. [Download youtube mp3 file](./practice/youtube_audio/README.md)
2. [Quick upload file to get a share link](./practice/upload/README.md)

## Details document
> [Wiki Pages](https://github.com/doanthuanthanh88/yas-http/wiki)

## Prerequisite
- Platform [`yaml-scene`](https://www.npmjs.com/package/yaml-scene)


## Installation

```sh
  yas add yas-http        # npm install -g yas-http OR yard global add yas-http
```

## Example
[Examples scenario files](./scenes/test)

## HTTP Client Request
Send a http request to a server

### Send `GET` request
```yaml
- yas-http/Get:
    url: http://localhost:3000/posts
```

### Send `POST` request
```yaml
- yas-http/Post:
    url: http://localhost:3000/posts
    body:
      id: 2
      title: title 2
      author: typicode 2
```

### Send `PUT` request
```yaml
- yas-http/Put:
    url: http://localhost:3000/posts/:id
    params:
      id: 2
    body:
      id: 2
      title: title 2 updated
      author: typicode 2 updated
```

### Send `PATCH` request
```yaml
- yas-http/Patch:
    url: http://localhost:3000/posts/:id
    params:
      id: 2
    body:
      id: 2
      title: title 2 updated
      author: typicode 2 updated
```

### Send `DELETE` request
```yaml
- yas-http/Delete:
    url: http://localhost:3000/posts/:id
    params:
      id: 2
```

### Send `HEAD` request
```yaml
- yas-http/Head:
    url: http://localhost:3000/posts/:id
    params:
      id: 2
```

### Send `CUSTOM` request
```yaml
- yas-http/Api:
    method: CONNECT
    url: http://localhost:3000/posts
```

## Mock API Server
Create mock API Server without code

### Server static file
```yaml
- yas-http/Server:
    host: 0.0.0.0                               # Server host
    port: 8000                                  # Server port
    routers:                                    # Defined routes
      - serveIn: 
          - ./assets                            # All of files in list will be served after request to
```

### Support upload file then save to server
```yaml
- yas-http/Server:
    host: 0.0.0.0                               # Server host
    port: 8000                                  # Server port
    routers:                                    # Defined routes
      - path: /upload                           # Upload path. Default method is POST
        method: POST                            # Request method (POST, PUT, PATCH, DELETE, HEAD)
                                                # - Default method is POST
        uploadTo: ./uploadDir                   # Directory includes uploading files
```

### Server RESTFul API data 
```yaml
- yas-http/Server:
    host: 0.0.0.0                               # Server host
    port: 8000                                  # Server port
    routers:                                    # Defined routes
      - method: GET                             # Request method (GET, POST, PUT, PATCH, DELETE, HEAD) (Default: GET)
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
```

### Create APIs which auto handle CRUD data  
```yaml
- yas-http/Server:
    host: 0.0.0.0                               # Server host
    port: 8000                                  # Server port
    routers:                                    # Defined routes
      - path: '/posts'                          # Request path
        CRUD: true                              # Auto create full RESTful API
                                                # - GET    /posts            : Return list posts
                                                # - GET    /posts/:id        : Return post details by id
                                                # - POST   /posts            : Create a new post
                                                # - PUT    /posts/:id        : Replace entity of post to new post
                                                # - PATCH  /posts/:id        : Only update some properties of post
                                                # - DELETE /posts/:id        : Delete a post by id
        initData: [                             # Init data
          {
            "id": 1,
            "label": "label 01"
          }
        ]
```

### Build router for yourself by code
```yaml
- yas-http/Server:
    host: 0.0.0.0                               # Server host
    port: 8000                                  # Server port
    routers:                                    # Defined routes
      - method: GET                             # Request method (GET, POST, PUT, PATCH, DELETE, HEAD) (Default: GET)
        path: /posts/:id                        # Request path
        handler: !function |                              # Handle code which handle request and response data
          /** Some vars can used in code
           * _: this.proxy, 
           * __: this, 
           * params: Request params
           * headers: Request headers
           * query: Request query string
           * body: Request body
           * request: Request
           * ctx: Context (koajs)
           */

          const merge = require('lodash.merge')
          
          return merge({
            params: params.id,
            name: query.name
          }, {
            id: 1
          })
```

## Document to markdown

```yaml
- yas-http/Doc/MD:
    title: Post service
    description: Demo CRUD API to generate to markdown document
    signature: "[Doan Thuan Thanh](mailto:doanthuanthanh88@gmail.com)"
    outFile: ./ApiMD.md
```

Add `doc` in the `yas-http/Get`... to export to document
```yaml
- yas-http/Get:
    doc: true
    ...
```

```yaml
- yas-http/Delete:
    doc: 
      tags: [POST]
    ...
```

## API request summary
Collect information of http(s) calls

```yaml
yas-http/Summary:
  title: Testing result
```