import Api from "./Api";
import { Method } from "./Method";

/*****
 * @name yas-http/Put
 * @description Send a Put request via http
 * @group Api
 * @order 4
 * @example
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
 */
export default class Put extends Api {
  init(props: any) {
    props.method = Method.PUT
    super.init(props)
  }
}
