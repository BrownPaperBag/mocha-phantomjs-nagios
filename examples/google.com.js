/* jshint expr: true */

var should = require('should');

describe('google.com', function() {
  this.timeout(910000);

  describe('Homepage', function() {
    it('should have status of "success"', function(done) {
      phantomPage('http://www.google.com/', function(error, ph, status, page) {
          status.should.be.exactly('success').and.be.a.String;
          page.close();
          ph.exit();
          done();
      });
    });
  });

  describe('Homepage', function() {
    it('should contain exactly one text input', function(done) {
      phantomPage('http://www.google.com', function(error, ph, status, page) {
        return page.evaluate(function() {
          return $('input[type="text"]').length;
        }, function(err,result) {
          result.should.be.exactly(0).and.be.a.Number;
          page.close();
          ph.exit();
          done();
        });
      });
    });
  });
});
