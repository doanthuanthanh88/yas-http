# Document
*Describe all of elements in tool. (meaning, how to use...)*
| Element | Description |  
|---|---|  
| API | --- |
|[yas-http/Api](#Api%2Fyas-http%2FApi)| Send a request via http with custom method ...|  
|[yas-http/Delete](#Api%2Fyas-http%2FDelete)| Send a DELETE request via http ...|  
|[yas-http/Get](#Api%2Fyas-http%2FGet)| Send a GET request via http ...|  
|[yas-http/Patch](#Api%2Fyas-http%2FPatch)| Send a Patch request via http ...|  
|[yas-http/Post](#Api%2Fyas-http%2FPost)| Send a Post request via http ...|  
|[yas-http/Put](#Api%2Fyas-http%2FPut)| Send a Put request via http ...|  
|[yas-http/Head](#Api%2Fyas-http%2FHead)| Send a Head request via http ...|  
|[yas-http/Server](#Api%2Fyas-http%2FServer)| Mock API server ...|  
|[yas-http/Doc/MD](#Doc%2C%20Api%2Fyas-http%2FDoc%2FMD)| Document api to markdown format ...|  
|[yas-http/Summary](#Api%2Fyas-http%2FSummary)| Summary after all of apis in scene executed done. (It's should be the last step) ...|  
| DOC | --- |
|[yas-http/Doc/MD](#Doc%2C%20Api%2Fyas-http%2FDoc%2FMD)| Document api to markdown format ...|  
  
  
# Details
## yas-http/Api <a name="Api%2Fyas-http%2FApi"></a>  
`(Api)`  
Send a request via http with custom method  

```yaml
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
        tags/binary: ./my_file.txt                              # Upload a file to server (content-type: multipart/form-data)

    var: "responseData"                                         # Set response data to "responseData" in global vars

    var:                                                        # Map response data to global vars
      status: ${$.response.status}
      responseData: ${$.response.data}

    timeout: 1s                                                 # Request timeout
    saveTo: /file_downloaded.txt                                # Request file to server then download and save to this path
    validate:                                                   # Validate response after request done. Reference to [Validate](https://github.com/doanthuanthanh88/yaml-scene/wiki#Validate)
      - title: Response status is valid
        chai: ${expect($.response.status).to.equal(200)}        # `$.response` is response data after send a request. ($.params, $.query...)
```

<br/>

## yas-http/Delete <a name="Api%2Fyas-http%2FDelete"></a>  
`(Api)`  
Send a DELETE request via http  

```yaml
- yas-http/Delete:
    title: Delete a product                                     # Api name
    description: It's only serve content for admin              # Api description
    doc: true                                                   # Push it to queue to export to doc in element `yas-http/Doc/MD`
    baseURL: http://localhost:3000
    url: /product/:id
    params:                                                     # Request params. (In the example, url is "/product/1")
      id: 1
    query:                                                      # Request querystring (In the example, url is appended "?order=name")
      order: name
    headers:                                                    # Request headers
      authorization: ...
    timeout: 1s                                                 # Request timeout
    validate:                                                   # Validate response after request done. Reference to [Validate](https://github.com/doanthuanthanh88/yaml-scene/wiki#Validate)
      - title: Response status is valid
        chai: ${expect($.response.status).to.equal(204)}
```

<br/>

## yas-http/Get <a name="Api%2Fyas-http%2FGet"></a>  
`(Api)`  
Send a GET request via http  

```yaml
- yas-http/Get:
    title: Get product details                                  # Api name
    description: It's only serve content for admin              # Api description
    doc: true                                                   # Push it to queue to export to doc in element `yas-http/Doc/MD`
    baseURL: http://localhost:3000
    url: /product/:id
    params:                                                     # Request params. (In the example, url is "/product/1")
      id: 1
    query:                                                      # Request querystring (In the example, url is appended "?order=name")
      order: name
    headers:                                                    # Request headers
      authorization: ...
    timeout: 1s                                                 # Request timeout
    saveTo: /file_downloaded.txt                                # Request file from server then download and save to this path
    validate:                                                   # Validate response after request done. Reference to [Validate](https://github.com/doanthuanthanh88/yaml-scene/wiki#Validate)
      - title: Response status is valid
        chai: ${expect($.response.status).to.equal(200)}
```

<br/>

## yas-http/Patch <a name="Api%2Fyas-http%2FPatch"></a>  
`(Api)`  
Send a Patch request via http  

```yaml
- yas-http/Patch:
    title: Update a product                                     # Api name
    description: It's only serve content for admin              # Api description
    doc: true                                                   # Push it to queue to export to doc in element `yas-http/Doc/MD`
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
        tags/binary: ./my_file.txt                              # Upload a file to server (content-type: multipart/form-data)

    var: "responseData"                                         # Set response data to "responseData" in global vars

    var:                                                        # Map response data to global vars
      status: ${$.response.status}
      responseData: ${$.response.data}

    timeout: 1s                                                 # Request timeout
    validate:                                                   # Validate response after request done. Reference to [Validate](https://github.com/doanthuanthanh88/yaml-scene/wiki#Validate)
      - title: Response status is valid
        chai: ${expect($.response.status).to.equal(200)}
```

<br/>

## yas-http/Post <a name="Api%2Fyas-http%2FPost"></a>  
`(Api)`  
Send a Post request via http  

```yaml
- yas-http/Post:
    title: Create a new product                                 # Api name
    description: It's only serve content for admin              # Api description
    doc: true                                                   # Push it to queue to export to doc in element `yas-http/Doc/MD`
    baseURL: http://localhost:3000
    url: /:companyID/product
    params:                                                     # Request params. (In the example, url is "/1/product")
      companyID: 1
    query:                                                      # Request querystring (In the example, url is appended "?order=name")
      order: name
    headers:                                                    # Request headers
      authorization: ...
    body:                                                       # Request body which used in [POST, PUT, PATCH...] methods
      name: "thanh"
      file: !tag
        tags/binary: ./my_file.txt                              # Upload a file to server (content-type: multipart/form-data)

    var: "responseData"                                         # Set response data to "responseData" in global vars

    var:                                                        # Map response data to global vars
      status: ${$.response.status}
      responseData: ${$.response.data}

    timeout: 1s                                                 # Request timeout
    validate:                                                   # Validate response after request done. Reference to [Validate](https://github.com/doanthuanthanh88/yaml-scene/wiki#Validate)
      - title: Response status is valid
        chai: ${expect($.response.status).to.equal(200)}
```

<br/>

## yas-http/Put <a name="Api%2Fyas-http%2FPut"></a>  
`(Api)`  
Send a Put request via http  

```yaml
- yas-http/Put:
    title: Update a product                                     # Api name
    description: It's only serve content for admin              # Api description
    doc: true                                                   # Push it to queue to export to doc in element `yas-http/Doc/MD`
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
        tags/binary: ./my_file.txt                              # Upload a file to server (content-type: multipart/form-data)

    var: "responseData"                                         # Set response data to "responseData" in global vars

    var:                                                        # Map response data to global vars
      status: ${$.response.status}
      responseData: ${$.response.data}

    timeout: 1s                                                 # Request timeout
    validate:                                                   # Validate response after request done. Reference to [Validate](https://github.com/doanthuanthanh88/yaml-scene/wiki#Validate)
      - title: Response status is valid
        chai: ${expect($.response.status).to.equal(200)}
```

<br/>

## yas-http/Head <a name="Api%2Fyas-http%2FHead"></a>  
`(Api)`  
Send a Head request via http  

```yaml
- yas-http/Head:
    title: Check product is availabled                          # Api name
    description: It's only serve content for admin              # Api description
    doc: true                                                   # Push it to queue to export to doc in element `yas-http/Doc/MD`
    baseURL: http://localhost:3000
    url: /product/:id
    params:                                                     # Request params. (In the example, url is "/product/1")
      id: 1
    query:                                                      # Request querystring (In the example, url is appended "?order=name")
      order: name
    headers:                                                    # Request headers
      authorization: ...
    timeout: 1s                                                 # Request timeout
    validate:                                                   # Validate response after request done. Reference to [Validate](https://github.com/doanthuanthanh88/yaml-scene/wiki#Validate)
      - title: Response status is valid
        chai: ${expect($.response.status).to.equal(204)}
```

<br/>

## yas-http/Server <a name="Api%2Fyas-http%2FServer"></a>  
`(Api)`  
Mock API server
- Server static file
- Support upload file then save to server
- Server RESTFul API data
- Create APIs which auto handle CRUD data  

```yaml
- yas-http/Server:
    title: Mock http request to serve data
    https:                                      # Server content via https with the cert and key
      key:
      cert:
    host: 0.0.0.0                               # Server host
    port: 8000                                  # Server port

    routers:                                    # Defined routes

      # Serve static files
      - serveIn: [./assets]                     # All of files in the list folders will be served after request to

      # Server upload API
      - path: /upload                           # Upload path. Default method is POST
        method: POST                            # Request method (POST, PUT, PATCH, DELETE, HEAD)
                                                # - Default method is POST
        uploadTo: ./uploadDir                   # Directory includes uploading files

      # Create dynamic APIs which auto handle CRUD data with dynamic model
      - path: '/:model'                         # Use this pattern to use with dynamic model name
        CRUD: true                              # Auto create full RESTful API
                                                # - GET    /modelName            : Return list models
                                                # - GET    /modelName/:id        : Return model details by id
                                                # - POST   /modelName            : Create a new model
                                                # - PUT    /modelName/:id        : Replace entity of post to new model
                                                # - PATCH  /modelName/:id        : Only update some properties of model
                                                # - DELETE /modelName/:id        : Delete a model by id
        dbFile: ./db.json                       # Store data to file. This make the next time, when server up will load data from the file.
                                                # - Empty then it's stateless
        clean: true                             # Clean db before server up
        initData: {                             # Init data for dynamic model name (/:model) when db not existed or `clean`=true
                                                # - Only init data when
                                                #   + Db file not existed
                                                #   + OR set "cleaned"
                                                #   + OR not set dbFile
          posts: [{                             # When you request /posts, it returns the value
            "id": 1,
            "label": "label 01"
          }],
          users: [{                             # When you request /users, it returns the value
            "id": 1,
            "label": "user 01"
          }]
        }

      # Create a API which you can customize response, path....
      - method: GET                             # Request method (POST, PUT, PATCH, DELETE, HEAD)
                                                # - Default method is GET
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
      # Create a API which you handle request and response
      - method: GET                             # Request method (POST, PUT, PATCH, DELETE, HEAD)
                                                # - Default method is GET
        path: /posts/:id                        # Request path
        handler: !function |                    # Handle code which handle request and response data
          // _: this,
          // __: this.proxy,
          // params: Request params
          // headers: Request headers
          // query: Request query string
          // body: Request body
          // request: Request
          // ctx: Context (koajs)

          const merge = require('lodash.merge')
          return merge({
            name: query.name
          }, {
            id: 1
          })

```

<br/>

## yas-http/Doc/MD <a name="Doc%2C%20Api%2Fyas-http%2FDoc%2FMD"></a>  
`(Doc, Api)`  
Document api to markdown format  

```yaml
- yas-http/Doc/MD:
    title: Post service
    description: Demo CRUD API to generate to markdown document
    signature: "[Doan Thuan Thanh](mailto:doanthuanthanh88@gmail.com)"
    outFile: ./api_document_details.md
```

<br/>

## yas-http/Summary <a name="Api%2Fyas-http%2FSummary"></a>  
`(Api)`  
Summary after all of apis in scene executed done. (It's should be the last step)  

```yaml
- yas-http/Summary:
    title: Testing result
```

<br/>

  