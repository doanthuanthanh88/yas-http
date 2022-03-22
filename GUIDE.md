# Document
*Describe all of elements in tool. (meaning, how to use...)*
| Element | Description |  
|---|---|  
| API | --- |
|[yas-http/Api](#yas-http/Api)| Send a request via http with custom method ...|  
|[yas-http/Delete](#yas-http/Delete)| Send a DELETE request via http ...|  
|[yas-http/Get](#yas-http/Get)| Send a GET request via http ...|  
|[yas-http/Patch](#yas-http/Patch)| Send a Patch request via http ...|  
|[yas-http/Post](#yas-http/Post)| Send a Post request via http ...|  
|[yas-http/Put](#yas-http/Put)| Send a Put request via http ...|  
|[yas-http/Head](#yas-http/Head)| Send a Head request via http ...|  
|[yas-http/Server](#yas-http/Server)| Mock API server ...|  
|[yas-http/Doc/MD](#yas-http/Doc/MD)| Document api to markdown format ...|  
|[yas-http/Summary](#yas-http/Summary)| Summary after all of apis in scene executed done. (It's should be the last step) ...|  
| DOC | --- |
|[yas-http/Doc/MD](#yas-http/Doc/MD)| Document api to markdown format ...|  
  
  
# Details
## yas-http/Api <a name="yas-http/Api"></a>
Send a request via http with custom method  

```yaml
- yas-http/Api:
    title: Update a product                                     # Api name
    description: It's only serve content for admin              # Api description
    doc: true                                                   # Push it to queue to export to doc in element `yas-http/Doc/MD`
    method: PUT                                                 # Request method (GET, POST, PUT, DELETE, PATCH, HEAD...)
    baseURL: http://localhost:3000                              
    url: /product/:id
    params:                                                     # Request params. (In the example, url is "/product/1")
      id: 1
    query:                                                      # Request querystring (In the example, url is appended "?order=name")
      order: name
    headers:                                                    # Request headers
      authorization: ...
    body: {                                                     # Request body which used in [POST, PUT, PATCH...] methods
      name: "thanh",
      file: !binary ./my_file.txt                               # Use !binary to upload a file to server (content-type: multipart/form-data)
    }
    timeout: 1s                                                 # Request timeout
    saveTo: /file_downloaded.txt                                # Request file from server then download and save to this path
    validate:                                                   # Validate response after request done. (Reference to #Validate)
      - title: Response status is valid
        chai: ${expect(_.response.status).to.equal(200)}
```


## yas-http/Delete <a name="yas-http/Delete"></a>
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
    validate:                                                   # Validate response after request done. (Reference to #Validate)
      - title: Response status is valid
        chai: ${expect(_.response.status).to.equal(204)}
```


## yas-http/Get <a name="yas-http/Get"></a>
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
    validate:                                                   # Validate response after request done. (Reference to #Validate)
      - title: Response status is valid
        chai: ${expect(_.response.status).to.equal(200)}
```


## yas-http/Patch <a name="yas-http/Patch"></a>
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
    body: {                                                     # Request body which used in [POST, PUT, PATCH...] methods
      name: "thanh",
      file: !binary ./my_file.txt                               # Use !binary to upload a file to server (content-type: multipart/form-data)
    }
    timeout: 1s                                                 # Request timeout
    validate:                                                   # Validate response after request done. (Reference to #Validate)
      - title: Response status is valid
        chai: ${expect(_.response.status).to.equal(200)}
```


## yas-http/Post <a name="yas-http/Post"></a>
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
    body: {                                                     # Request body which used in [POST, PUT, PATCH...] methods
      name: "thanh",
      file: !binary ./my_file.txt                               # Use !binary to upload a file to server (content-type: multipart/form-data)
    }
    timeout: 1s                                                 # Request timeout
    validate:                                                   # Validate response after request done. (Reference to #Validate)
      - title: Response status is valid
        chai: ${expect(_.response.status).to.equal(200)}
```


## yas-http/Put <a name="yas-http/Put"></a>
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
    body: {                                                     # Request body which used in [POST, PUT, PATCH...] methods
      name: "thanh",
      file: !binary ./my_file.txt                               # Use !binary to upload a file to server (content-type: multipart/form-data)
    }
    timeout: 1s                                                 # Request timeout
    validate:                                                   # Validate response after request done. (Reference to #Validate)
      - title: Response status is valid
        chai: ${expect(_.response.status).to.equal(200)}
```


## yas-http/Head <a name="yas-http/Head"></a>
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
    validate:                                                   # Validate response after request done. (Reference to #Validate)
      - title: Response status is valid
        chai: ${expect(_.response.status).to.equal(204)}
```


## yas-http/Server <a name="yas-http/Server"></a>
Mock API server  
- Server static file
- Support upload file then save to server
- Server RESTFul API data 
- Create APIs which auto handle CRUD data  

```yaml
- yas-http/Server:
    title: Mock http request to serve data
    https: true                                 # Server content via https
    https:                                      # Server content via https with custom cert and key
      key: 
      cert: 
    host: 0.0.0.0                               # Server host
    port: 8000                                  # Server port

    routers:                                    # Defined routes

      # Server static files
      - serveIn: [./assets]                     # All of files in list will be served after request to

      # Server upload API
      - path: /upload                           # Upload path. Default method is POST
        method: POST                            # Request method (POST, PUT, PATCH, DELETE, HEAD)
                                                # - Default method is POST
        uploadTo: ./uploadDir                   # Directory includes uploading files

      # Create APIs which auto handle CRUD data
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
              "id": ${+$params.id},             # $params:  Request params (/:id)
              "title": "title 1",               # $headers: Request headers
              "author": "thanh"                 # $query:   Request querystring (?name=thanh)
              "des": "des 1",                   # $body:    Request body
            }                                   # $request: Request
          ]                                     # $ctx:     Context
      # Create a API which you handle request and response
      - method: GET                             # Request method (POST, PUT, PATCH, DELETE, HEAD)
                                                # - Default method is GET
        path: /posts/:id                        # Request path
        handler: |                              # Handle code which handle request and response data
          // _: this.proxy, 
          // __: this, $params: 
          // ctx.params, headers: ctx.headers, 
          // query: ctx.request.query, 
          // body: ctx.request.body, 
          // request: ctx.request, 
          // ctx: ctx

          const merge = require('lodash.merge')
          return merge({
            name: $query.name
          }, {
            id: 1
          })
          
```


## yas-http/Doc/MD <a name="yas-http/Doc/MD"></a>
Document api to markdown format  

```yaml
- yas-http/Doc/MD:
    title: Post service
    description: Demo CRUD API to generate to markdown document
    signature: "[Doan Thuan Thanh](mailto:doanthuanthanh88@gmail.com)"
    outFile: ./api_document_details.md
```


## yas-http/Summary <a name="yas-http/Summary"></a>
Summary after all of apis in scene executed done. (It's should be the last step)  

```yaml
- yas-http/Summary:
    title: Testing result
```


  