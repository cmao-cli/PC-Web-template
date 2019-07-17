var path = require('path')
var express = require('express')
var app = express()
let config = require('../config/index.js');
const fs = require('fs');
let _config = config();

const IP = _config.buildtime.origin_server.ip;
const PORT = _config.buildtime.origin_server.port;

(function injectConfig() {
  const configScript = `<!--configArea--><script>window.CODEMAOCONFIG = ${JSON.stringify(_config.runtime)}</script><!--endOfConfigArea-->`;
  const htmlPath = path.join(__dirname, '../build/index.html');
  let htmlData = fs.readFileSync(htmlPath, {encoding: 'utf8'});

  htmlData = htmlData.replace(/<!--configArea-->(.)*<!--endOfConfigArea-->/, configScript);
  fs.writeFileSync(htmlPath, htmlData);
})();

app.use(express.static(path.join(__dirname, '../build/'), {
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.set('Cache-Control', 'no-cache');
    }
  },
}));

app.get('/config', function(req, res){
  res.json(_config.runtime);
})

app.use(function (req, res) {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, '../build/'));
})

app.listen(PORT, function () {
  console.log('The app server is working at ' + PORT)
})
