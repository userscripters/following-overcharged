#!/bin/bash

docker ps --format='{{.ID}}' \
          --filter='ancestor=userscripters-fc' \
| xargs -I % docker stop %
