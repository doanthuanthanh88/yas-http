# Demo APIs
Demo Dynamic CRUD API to generate to markdown document
> Developed by [Doan Thuan Thanh](mailto:doanthuanthanh88@gmail.com)  
> Updated at 3/31/2022, 9:16:23 AM  

| | Title (10) | URL |  
|---|---|---|  
| |ACTIONS (6) | |
|**1**|[Create a new post](#Create%20a%20new%20post)| `POST` /posts|  
|**2**|[Create a new user](#Create%20a%20new%20user)| `POST` /users|  
|**3**|[Delete a post](#Delete%20a%20post)| `DELETE` /posts/:id|  
|**4**|[Delete a user](#Delete%20a%20user)| `DELETE` /users/:id|  
|**5**|[Update a post](#Update%20a%20post)| `PUT` /posts/:id|  
|**6**|[Update a user](#Update%20a%20user)| `PUT` /users/:id|  
| |POST (5) | |
|**1**|[Create a new post](#Create%20a%20new%20post)| `POST` /posts|  
|**2**|[Delete a post](#Delete%20a%20post)| `DELETE` /posts/:id|  
|**3**|[Get a post details](#Get%20a%20post%20details)| `GET` /posts/:id|  
|**4**|[Get all of posts](#Get%20all%20of%20posts)| `GET` /posts|  
|**5**|[Update a post](#Update%20a%20post)| `PUT` /posts/:id|  
| |RETURNS (4) | |
|**1**|[Get a post details](#Get%20a%20post%20details)| `GET` /posts/:id|  
|**2**|[Get a user details](#Get%20a%20user%20details)| `GET` /users/:id|  
|**3**|[Get all of posts](#Get%20all%20of%20posts)| `GET` /posts|  
|**4**|[Get all of users](#Get%20all%20of%20users)| `GET` /users|  
| |USER (5) | |
|**1**|[Create a new user](#Create%20a%20new%20user)| `POST` /users|  
|**2**|[Delete a user](#Delete%20a%20user)| `DELETE` /users/:id|  
|**3**|[Get a user details](#Get%20a%20user%20details)| `GET` /users/:id|  
|**4**|[Get all of users](#Get%20all%20of%20users)| `GET` /users|  
|**5**|[Update a user](#Update%20a%20user)| `PUT` /users/:id|  
  

---

## [Create a new post](#) <a name="Create%20a%20new%20post"></a>



- `POST /posts`
- ✅  &nbsp; **200**  *OK*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/posts" -X POST -H "content-type: application/json" -d "{\"id\":2,\"title\":\"title 2\",\"author\":\"typicode 2\"}"
```

</details>



<br/>

## REQUEST
### Request body
`Content-Type: *application/json*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2",
  "author": "typicode 2"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>

## RESPONSE
### Response data
`Content-Type: *application/json; charset=utf-8*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2",
  "author": "typicode 2"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>


---

## [Create a new user](#) <a name="Create%20a%20new%20user"></a>



- `POST /users`
- ✅  &nbsp; **200**  *OK*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/users" -X POST -H "content-type: application/json" -d "{\"id\":2,\"title\":\"title 2\",\"author\":\"typicode 2\"}"
```

</details>



<br/>

## REQUEST
### Request body
`Content-Type: *application/json*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2",
  "author": "typicode 2"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>

## RESPONSE
### Response data
`Content-Type: *application/json; charset=utf-8*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2",
  "author": "typicode 2"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>


---

## [Delete a post](#) <a name="Delete%20a%20post"></a>



- `DELETE /posts/:id`
- ✅  &nbsp; **204**  *No Content*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/posts/2" -X DELETE -H "content-type: application/json"
```

</details>



<br/>

## REQUEST
### Params
<details>
  <summary>Example</summary>

```json
{
  "id": 2
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |

</details>

## RESPONSE
### Response data
`Content-Type: *undefined*`  

<details>
  <summary>Example</summary>

```json
""
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | string |

</details>


---

## [Delete a user](#) <a name="Delete%20a%20user"></a>



- `DELETE /users/:id`
- ✅  &nbsp; **204**  *No Content*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/users/2" -X DELETE -H "content-type: application/json"
```

</details>



<br/>

## REQUEST
### Params
<details>
  <summary>Example</summary>

```json
{
  "id": 2
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |

</details>

## RESPONSE
### Response data
`Content-Type: *undefined*`  

<details>
  <summary>Example</summary>

```json
""
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | string |

</details>


---

## [Get a post details](#) <a name="Get%20a%20post%20details"></a>



- `GET /posts/:id`
- ✅  &nbsp; **200**  *OK*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/posts/2" -X GET -H "content-type: application/json"
```

</details>



<br/>

## REQUEST
### Params
<details>
  <summary>Example</summary>

```json
{
  "id": 2
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |

</details>

## RESPONSE
### Response data
`Content-Type: *application/json; charset=utf-8*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2 updated",
  "author": "typicode 2 updated"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>


---

## [Get a user details](#) <a name="Get%20a%20user%20details"></a>



- `GET /users/:id`
- ✅  &nbsp; **200**  *OK*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/users/2" -X GET -H "content-type: application/json"
```

</details>



<br/>

## REQUEST
### Params
<details>
  <summary>Example</summary>

```json
{
  "id": 2
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |

</details>

## RESPONSE
### Response data
`Content-Type: *application/json; charset=utf-8*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2 updated",
  "author": "typicode 2 updated"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>


---

## [Get all of posts](#) <a name="Get%20all%20of%20posts"></a>



- `GET /posts`
- ✅  &nbsp; **200**  *OK*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/posts" -X GET -H "content-type: application/json"
```

</details>



<br/>

## REQUEST
## RESPONSE
### Response data
`Content-Type: *application/json; charset=utf-8*`  

<details>
  <summary>Example</summary>

```json
[
  {
    "id": 1,
    "title": "title",
    "labels": [
      "news",
      "user"
    ],
    "creator": {
      "name": "thanh",
      "created_time": 1648717864384
    },
    "tags": [
      {
        "id": 1,
        "name": "thanh 1"
      },
      {
        "id": 2,
        "name": "thanh 2"
      }
    ]
  }
]
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | array&lt;object&gt; |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `labels` | array&lt;string&gt; |
| &nbsp;&nbsp;&nbsp;&nbsp; `creator` | object |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `name` | string |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `created_time` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `tags` | array&lt;object&gt; |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `name` | string |

</details>


---

## [Get all of users](#) <a name="Get%20all%20of%20users"></a>



- `GET /users`
- ✅  &nbsp; **200**  *OK*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/users" -X GET -H "content-type: application/json"
```

</details>



<br/>

## REQUEST
## RESPONSE
### Response data
`Content-Type: *application/json; charset=utf-8*`  

<details>
  <summary>Example</summary>

```json
[
  {
    "id": 1,
    "title": "title",
    "labels": [
      "news",
      "user"
    ],
    "creator": {
      "name": "thanh",
      "created_time": 1648717864384
    },
    "tags": [
      {
        "id": 1,
        "name": "thanh 1"
      },
      {
        "id": 2,
        "name": "thanh 2"
      }
    ]
  }
]
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | array&lt;object&gt; |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `labels` | array&lt;string&gt; |
| &nbsp;&nbsp;&nbsp;&nbsp; `creator` | object |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `name` | string |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `created_time` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `tags` | array&lt;object&gt; |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `name` | string |

</details>


---

## [Update a post](#) <a name="Update%20a%20post"></a>



- `PUT /posts/:id`
- ✅  &nbsp; **200**  *OK*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/posts/2" -X PUT -H "content-type: application/json" -d "{\"id\":2,\"title\":\"title 2 updated\",\"author\":\"typicode 2 updated\"}"
```

</details>



<br/>

## REQUEST
### Params
<details>
  <summary>Example</summary>

```json
{
  "id": 2
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |

</details>

### Request body
`Content-Type: *application/json*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2 updated",
  "author": "typicode 2 updated"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>

## RESPONSE
### Response data
`Content-Type: *application/json; charset=utf-8*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2 updated",
  "author": "typicode 2 updated"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>


---

## [Update a user](#) <a name="Update%20a%20user"></a>



- `PUT /users/:id`
- ✅  &nbsp; **200**  *OK*



<details open>
<summary><b>cURL</b></summary>

```sh
curl "/users/2" -X PUT -H "content-type: application/json" -d "{\"id\":2,\"title\":\"title 2 updated\",\"author\":\"typicode 2 updated\"}"
```

</details>



<br/>

## REQUEST
### Params
<details>
  <summary>Example</summary>

```json
{
  "id": 2
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |

</details>

### Request body
`Content-Type: *application/json*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2 updated",
  "author": "typicode 2 updated"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>

## RESPONSE
### Response data
`Content-Type: *application/json; charset=utf-8*`  

<details>
  <summary>Example</summary>

```json
{
  "id": 2,
  "title": "title 2 updated",
  "author": "typicode 2 updated"
}
```

</details>

<details open>
  <summary>Schema</summary>

| Name | Type |
| --- | --- |
|  `@ROOT` | object |
| &nbsp;&nbsp;&nbsp;&nbsp; `id` | number |
| &nbsp;&nbsp;&nbsp;&nbsp; `title` | string |
| &nbsp;&nbsp;&nbsp;&nbsp; `author` | string |

</details>

  