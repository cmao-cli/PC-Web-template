#!/bin/bash

echo -e "\033[36m Make sure you've run 'npm install' before start. \033[0m"

if [ ! -f webpack/dll/vender.dll.js -o ! -f webpack/dll/vender-manifest.json ]
then
  echo -e "\033[33m Building DLL files... \033[0m"
  cross-env NODE_ENV=local webpack --progress --colors --config webpack/webpack.dll.config.js
  echo -e "\033[32m DLL files done! \033[0m"
fi

echo -e "\033[32m Starting Dev Server... \033[0m"

cross-env NODE_ENV=local node bin/server.js