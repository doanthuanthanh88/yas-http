import Api from "./Api";
import { Method } from "./Method";

/*****
 * @name yas-http/Get
 * @description Send a GET request via http
 * @group Api
 * @order 4
 * @example
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
 */
export default class Get extends Api {
  init(props: any) {
    props.method = Method.GET
    super.init(props)
  }
}
