#!/bin/bash

docker ps --all \
          --format='{{.ID}}' \
          --filter='ancestor=userscripters-fc' \
| xargs -I % docker rm %
