const config = require('./webpack/config.js');
module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript" // ts
  ],
  "plugins": [
    ["react-css-modules", {
      "generateScopedName": config.CSS_SCOPED_NAME,
      "filetypes": {
        ".scss": {
          "syntax": "postcss-scss"
        }
      }
    }],
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ],
    "@babel/plugin-syntax-dynamic-import"
  ]
}