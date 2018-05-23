const FileSync = require('lowdb/adapters/FileSync');
const moment = require('moment');

const get = () => {
  return new FileSync(moment().format('DD-MM-YYYY') + '_logs.json');
};

module.exports = {
  get
}