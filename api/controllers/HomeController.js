/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const low = require('lowdb');
const AdapterService = require('../services/AdapterService');

module.exports = {
  index: function(req, res) {
    let adapter = AdapterService.get();
    let db = low(adapter);

    return res.view('homepage', {
      data: db.get('logs').reverse().value()
    });
  }
};

