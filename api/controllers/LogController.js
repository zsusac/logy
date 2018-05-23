/**
 * LogController
 *
 * @description :: Server-side logic for managing Logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const LogFactory = require('../services/LogFactory');
const low = require('lowdb');
const AdapterService = require('../services/AdapterService');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  create: (req, res) => {
    let log = LogFactory.create(req.params.all());

    if(log){
      let adapter = AdapterService.get();
      let db = low(adapter);

      // Set some defaults (required if your JSON file is empty)
      db.defaults({ logs: [] }).write();

      db.get('logs').push(log).write();

      sails.sockets.broadcast('log', 'new_entry', log);
  
      return res.ok();  
    }

    return res.badRequest();
  },

  read: (req, res) => {
    let adapter = AdapterService.get();
    let db = low(adapter);

    let log = db.get('logs').find({id: req.param('id')}).value() || {};

    return res.json(log);
},

  subscribe: function (req, res) {
    if( ! req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.join(req.socket, 'log');

    return res.ok();
  }
};

