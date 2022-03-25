import Api from "./Api";
import { Method } from "./Method";

/**
 * @guide
 * @name yas-http/Post
 * @description Send a Post request via http
 * @group Api
 * @order 4
 * @example
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
    validate:                                                   # Validate response after request done. Reference to [Validate](https://github.com/doanthuanthanh88/yaml-scene/wiki#Validate)
      - title: Response status is valid
        chai: ${expect($.response.status).to.equal(200)}
 * @end
 */
export default class Post extends Api {
  init(props) {
    props.method = Method.POST
    super.init(props)
  }
}
