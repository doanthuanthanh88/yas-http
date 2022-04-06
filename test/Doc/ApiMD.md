# Post service
Demo CRUD API to generate to markdown document
> Developed by [Doan Thuan Thanh](mailto:doanthuanthanh88@gmail.com)  
> Updated at 4/6/2022, 9:25:41 AM  

| | Title (6) | URL |  
|---|---|---|  
| |DEFAULT (1) | |
|**1**|[This is documented by default tag](#user-content-this%20is%20documented%20by%20default%20tag)| `GET` /posts/:id|  
| |ACTIONS (3) | |
|**1**|[Create a new post](#user-content-create%20a%20new%20post)| `POST` /posts|  
|**2**|[Delete a post](#user-content-delete%20a%20post)| `DELETE` /posts/:id|  
|**3**|[Update a post](#user-content-update%20a%20post)| `PUT` /posts/:id|  
| |POST (5) | |
|**1**|[Create a new post](#user-content-create%20a%20new%20post)| `POST` /posts|  
|**2**|[Delete a post](#user-content-delete%20a%20post)| `DELETE` /posts/:id|  
|**3**|[Get a post details](#user-content-get%20a%20post%20details)| `GET` /posts/:id|  
|**4**|[Get all of posts](#user-content-get%20all%20of%20posts)| `GET` /posts|  
|**5**|[Update a post](#user-content-update%20a%20post)| `PUT` /posts/:id|  
| |RETURNS (2) | |
|**1**|[Get a post details](#user-content-get%20a%20post%20details)| `GET` /posts/:id|  
|**2**|[Get all of posts](#user-content-get%20all%20of%20posts)| `GET` /posts|  
  

---

<a id="user-content-create%20a%20new%20post" name="user-content-create%20a%20new%20post"></a>
## [Create a new post](#)



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

<a id="user-content-delete%20a%20post" name="user-content-delete%20a%20post"></a>
## [Delete a post](#)



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

<a id="user-content-get%20a%20post%20details" name="user-content-get%20a%20post%20details"></a>
## [Get a post details](#)



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

<a id="user-content-get%20all%20of%20posts" name="user-content-get%20all%20of%20posts"></a>
## [Get all of posts](#)



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
      "created_time": 1649237134587
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

<a id="user-content-this%20is%20documented%20by%20default%20tag" name="user-content-this%20is%20documented%20by%20default%20tag"></a>
## [This is documented by default tag](#)



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

<a id="user-content-update%20a%20post" name="user-content-update%20a%20post"></a>
## [Update a post](#)



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

  