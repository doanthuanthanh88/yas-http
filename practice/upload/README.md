# Upload file then get link to download
Upload file to [tmpfiles](https://tmpfiles.org) server

## Features
- List files in current folder
- Enter file name to upload to `tmpfiles.org` then get link to download

## How to use

Run via local
```sh
yas https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/practice/upload/tmpfiles example
```

Run via docker
```sh
docker run --rm -it \
  -w /Uploads \
  -v $PWD:/Uploads \
  doanthuanthanh88/yaml-scene \
  https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/practice/upload/tmpfiles \
  example
```