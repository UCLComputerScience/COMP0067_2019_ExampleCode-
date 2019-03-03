var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var handler = require('./handler');
var musicController = require('./controllers/music');
var url = require('url');

module.exports = function(req, res) {

  var urlObj = url.parse(req.url, true);
  req.query = urlObj.query;

  var pathname = urlObj.pathname;
  var method = req.method;

  if (method === 'GET' && pathname === '/') {
    musicController.showIndex(req, res);
  } else if (method === 'GET' && pathname === '/index.html') {
    musicController.showIndex(req, res);
  } else if (method === 'GET' && pathname.startsWith('/node_modules/')) {
    var staticPath = path.join(__dirname, pathname);
    fs.readFile(staticPath, 'utf8', function(err, data) {
      if (err) {
        return res.end(err.message);
      }
      res.end(data)
    })
  } else if (method === 'GET' && pathname === '/add') {
    musicController.showAdd(req, res);
  } else if (method === 'GET' && pathname === '/edit') {
    musicController.showEdit(req, res);
  } else if (method === 'POST' && pathname === '/add') {
    musicController.doAdd(req, res);
  } else if (method === 'GET' && pathname ==='/remove') {
    musicController.doRemove(req, res);
  } else if (method === 'POST' && pathname === '/edit') {
    musicController.doEdit(req, res);
  }
}






