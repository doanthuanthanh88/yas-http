
| Element | Description |  
|---|---|  
| API | --- |
|[yas-http/Api](#user-content-api-yas-http%2fapi)| Send a request via http with custom method ...|  
|[yas-http/Delete](#user-content-api-yas-http%2fdelete)| Send a DELETE request via http ...|  
|[yas-http/Get](#user-content-api-yas-http%2fget)| Send a GET request via http ...|  
|[yas-http/Patch](#user-content-api-yas-http%2fpatch)| Send a Patch request via http ...|  
|[yas-http/Post](#user-content-api-yas-http%2fpost)| Send a Post request via http ...|  
|[yas-http/Put](#user-content-api-yas-http%2fput)| Send a Put request via http ...|  
|[yas-http/Head](#user-content-api-yas-http%2fhead)| Send a Head request via http ...|  
|[yas-http/Server](#user-content-api-yas-http%2fserver)| Mock API server ...|  
|[yas-http/Doc/MD](#user-content-doc%2c%20api-yas-http%2fdoc%2fmd)| Document api to markdown format ...|  
|[yas-http/Summary](#user-content-api-yas-http%2fsummary)| Summary after all of apis in scene executed done. (It's should be the last step) ...|  
| DOC | --- |
|[yas-http/Doc/MD](#user-content-doc%2c%20api-yas-http%2fdoc%2fmd)| Document api to markdown format ...|  
  
  
# Details
<a id="user-content-api-yas-http%2fapi" name="user-content-api-yas-http%2fapi"></a>
## yas-http/Api
`Api`  
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
        file/stream: ./my_file.txt                              # Upload a file to server (content-type: multipart/form-data)

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

<a id="user-content-api-yas-http%2fdelete" name="user-content-api-yas-http%2fdelete"></a>
## yas-http/Delete
`Api`  
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

<a id="user-content-api-yas-http%2fget" name="user-content-api-yas-http%2fget"></a>
## yas-http/Get
`Api`  
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

<a id="user-content-api-yas-http%2fpatch" name="user-content-api-yas-http%2fpatch"></a>
## yas-http/Patch
`Api`  
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
        file/stream: ./my_file.txt                              # Upload a file to server (content-type: multipart/form-data)

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

<a id="user-content-api-yas-http%2fpost" name="user-content-api-yas-http%2fpost"></a>
## yas-http/Post
`Api`  
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
        file/stream: ./my_file.txt                              # Upload a file to server (content-type: multipart/form-data)

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

<a id="user-content-api-yas-http%2fput" name="user-content-api-yas-http%2fput"></a>
## yas-http/Put
`Api`  
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
        file/stream: ./my_file.txt                              # Upload a file to server (content-type: multipart/form-data)

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

<a id="user-content-api-yas-http%2fhead" name="user-content-api-yas-http%2fhead"></a>
## yas-http/Head
`Api`  
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

<a id="user-content-api-yas-http%2fserver" name="user-content-api-yas-http%2fserver"></a>
## yas-http/Server
`Api`  
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
          () {
            // this.params: Request params
            // this.headers: Request headers
            // this.query: Request query string
            // this.body: Request body
            // this.request: Request
            // this.ctx: Context (koajs)

            const merge = require('lodash.merge')
            return merge({
              params: this.params.id,
              name: this.query.name
            }, {
              id: 1
            })
          }

```

<br/>

<a id="user-content-doc%2c%20api-yas-http%2fdoc%2fmd" name="user-content-doc%2c%20api-yas-http%2fdoc%2fmd"></a>
## yas-http/Doc/MD
`Doc, Api`  
Document api to markdown format  

```yaml
- yas-http/Doc/MD:
    title: Post service
    description: Demo CRUD API to generate to markdown document
    signature: "[Doan Thuan Thanh](mailto:doanthuanthanh88@gmail.com)"
    outFile: ./api_document_details.md
    prefixHashLink:                        # Default is `user-content-` for github
```

<br/>

<a id="user-content-api-yas-http%2fsummary" name="user-content-api-yas-http%2fsummary"></a>
## yas-http/Summary
`Api`  
Summary after all of apis in scene executed done. (It's should be the last step)  

```yaml
- yas-http/Summary:
    title: Testing result
```

<br/>

  