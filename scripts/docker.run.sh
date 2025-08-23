#!/bin/bash

docker run --detach \
           --name userscripters-fc \
           --mount type=bind,source=.,target=/app \
           userscripters-fc
