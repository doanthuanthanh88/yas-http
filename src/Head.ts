import Api from "./Api";
import { Method } from "./Method";

/**
 * @guide
 * @name yas-http/Head
 * @description Send a Head request via http
 * @group Api
 * @order 5
 * @example
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
 * @end
 */
export default class Head extends Api {
  init(props) {
    props.method = Method.HEAD
    super.init(props)
  }
}
