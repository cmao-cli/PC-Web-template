"use strict";
var fs = require('fs');
var path = require('path');
var cfg_dir = path.join(__dirname);
var env = process.env.front_env;
var lodash = require('lodash');
var cdn_env = 'CDNPATH';

function generate_cfg() {
  var default_config_path = path.join(cfg_dir, 'default.json');
  var local_config_path = path.join(cfg_dir, 'local.json');
  var local_config = {};
  var env_config = {};

  if (file_exists(local_config_path)) {
    local_config = require(local_config_path);
  }
  if (env) {
    var env_cfg_path = path.join(cfg_dir, `${env}.json`);
    if (file_exists(env_cfg_path)) {
      console.log('file_exists', env_cfg_path);
      env_config = require(env_cfg_path);
    } else {
      console.warn("\nConfiguration file specified by env var " + env + " = " + env_cfg_path + " does not exist.\n");
    }
  }

  var default_config = require(default_config_path);
  var cdn_cfg_path = process.env[cdn_env];

  var mixed_config = cdn_cfg_path === 'aliyun' ?
    lodash.merge(
      {}, // apply modifications to this new dict
      default_config,
      env_config,
      local_config) :
    lodash.merge(
      {}, // apply modifications to this new dict
      default_config,
      env_config,
      local_config)
  return mixed_config;
}

function file_exists(path) {
  try {
    fs.lstatSync(path);
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = generate_cfg;