let loaderUtils = require('loader-utils');
let parseString = require('xml2js').parseString;
let processors = require('xml2js/lib/processors');
let yaml = require('js-yaml');


let fStringToObject = function(source){
  let value = typeof source === "string" ? JSON.parse(source) : source;

  return JSON.stringify(value)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
};

let fJSONLoader = function (source) {
  this.cacheable && this.cacheable();
  return fStringToObject(source);
};

let fXMLLoader = async function(text) {
  this.cacheable && this.cacheable();

  let options = loaderUtils.getOptions(this);
  if(options) {
    Object.keys(options).forEach(function(key) {
      if (key.indexOf('Processors') > -1) {
        let array = options[key];
        for (let i = 0, len = array.length; i < len; i++) {
          array[i] = processors[array[i]];
        }
      }
    });
  }

  let sResult = "";
  await parseString(text, options, function(err, result) {
    sResult = result;
  });

  return fStringToObject(sResult);
};

let fYAMLLoader = function (source) {
  this.cacheable && this.cacheable();
  try {
    let res = yaml.safeLoad(source);
    let sResult = JSON.stringify(res, undefined, '\t');
    return fStringToObject(sResult);
  }
  catch (err) {
    this.emitError(err);
    return null;
  }
};

module.exports = {
  'json-loader': fJSONLoader,
  'xml-loader': fXMLLoader,
  'yaml-loader': fYAMLLoader
};
