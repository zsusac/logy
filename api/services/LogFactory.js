const uuidV4 = require('uuid/v4');
const moment = require('moment');

function Log(params) {
  this.id = uuidV4();
  this.message = params['message'] || null;
  this.scriptUrl = params['scriptUrl'] || null;
  this.lineNumber = params['lineNumber'] || null;
  this.columnNumber = params['columnNumber'] || null;
  this.errorObject = params['errorObject'] || null;
  this.project = params['project'] || null;
  this.environment = params['environment'] || null;
  this.user = params['user'] || null;
  this.timestamp = params['timestamp'] ? moment(params['timestamp']).format('HH:mm:ss DD.MM.YYYY') : null;
}

function create(params) {
  return new Log(params);
}

module.exports.create = create;
