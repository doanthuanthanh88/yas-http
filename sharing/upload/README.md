# Upload file then get link to download
Upload file to [tmpfiles](https://tmpfiles.org) server

## Features
- List files in current folder
- Enter file name to upload to `tmpfiles.org` then get link to download

## How to use

Run in local `yaml-scene`
```sh
yas -f https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/sharing/upload/pick_file_to_upload.yas.yaml
```

Run via docker
```sh
docker run --rm -it \
  -w /Uploads \
  -v $PWD:/Uploads \
  doanthuanthanh88/yaml-scene \
  -f \
  https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/sharing/upload/pick_file_to_upload.yas.yaml
```