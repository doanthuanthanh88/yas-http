# Auto download a mp3 file from youtube
Enter youtube link video to download then convert to a mp3 file

## Features:
- Allow choose a mp3 quality to convert
- Pick a section in the file  

## How to use

Run in local `yaml-scene`
```sh
  yas https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/practice/youtube_audio/download_youtube example
```

Run via docker
```sh
  docker run --rm -it \
  -v $PWD:/Downloads \
  doanthuanthanh88/yaml-scene \
  https://raw.githubusercontent.com/doanthuanthanh88/yas-http/main/practice/youtube_audio/download_youtube \
  example
```