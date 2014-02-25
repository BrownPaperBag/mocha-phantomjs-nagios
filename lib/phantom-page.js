var phantom = require('node-phantom');
  portfinder = require('portfinder');

module.exports = function(url, callback) {

  portfinder.getPort(function(error, port) {
    if (error) throw error;
    phantom.create(function(error, ph) {
      if (error) throw error;
      ph.createPage(function(error, page) {
        if (error) throw error;
        page.open(url, function(error, status) {
          if (error) throw error;
          page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', function(error) {
            if (error) throw error;
            callback(error, ph, status, page);
          });
        });
      });
    }, {
      port: port
    });
  });
};
