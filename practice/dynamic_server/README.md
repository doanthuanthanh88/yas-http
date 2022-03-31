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
  yas -f https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/practice/dynamic_server/Server.yaml
```

Run via docker
```sh
  docker run --rm -it \
  -v $PWD:/Downloads \
  doanthuanthanh88/yaml-scene \
  -f \
  https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/practice/dynamic_server/Server.yaml
```

### `Make clients call to mock API server`

Run in local `yaml-scene`
```sh
  yas -f https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/practice/dynamic_server/Client.yaml
```

Run via docker
```sh
  docker run --rm -it \
  -v $PWD:/Downloads \
  -e SERVER=$IP_DOCKER_MOCK_API_SERVER
  doanthuanthanh88/yaml-scene \
  -f \
  https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/practice/dynamic_server/Client.yaml
```

> Replace `$IP_DOCKER_MOCK_API_SERVER` to IP of mock api server docker