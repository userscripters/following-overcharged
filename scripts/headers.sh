#!/bin/bash

dist="dist"
output=$dist"/headers.js"

generate-headers tampermonkey \
    -g unsafe \
    -o $output \
    -m all meta "https://domain/questions|users/*" \
    --pretty

userscript="$(find -iwholename "./$dist/*\.js" -type f -not -iname "*headers\.js")"

sed -i -e "{1e cat $output; echo; echo" -e "; N}" $userscript
