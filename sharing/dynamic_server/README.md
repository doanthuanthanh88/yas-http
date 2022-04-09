# Dynamic mock API server
Mock data to serve to clients

## Features
- Auto add APIs to request to
- Use dynanic path which easy to send and get data
- Auto document the API after run

## How to use

### `Build mock API server to serve data content`

Run in local `yaml-scene`
```sh
  yas -f https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/sharing/dynamic_server/Server.yas.yaml
```

Run via docker
```sh
  docker run --rm -it --name mock-api-server \
  -v $PWD:/Downloads \
  -p 3000:3000 \
  doanthuanthanh88/yaml-scene \
  -f \
  https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/sharing/dynamic_server/Server.yas.yaml
```

- After done, the link "http://0.0.0.0:3000/whatever" is availabed

### `Make clients call to mock API server`

Run in local `yaml-scene`
```sh
  yas -f https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/sharing/dynamic_server/Client.yas.yaml
```

Run via docker
```sh
  docker run --rm -it --link mock-api-server --name mock-api-client \
  -v $PWD:/Downloads \
  -e SERVER=mock-api-server \
  doanthuanthanh88/yaml-scene \
  -f \
  https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/sharing/dynamic_server/Client.yas.yaml
```
