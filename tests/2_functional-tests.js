const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('GET /api/convert', function () {
      test('Valid input: ?input=10L', function (done) {
          chai
              .request(server)
              .get('/api/convert?input=10L')
              .end(function (err, res) {
                  assert.equal(res.status, 200, 'Response status should be 200');
                  assert.equal(
                      res.text,
                      '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 Liters converts to 2.64172 galons"}'
                  );
                  done();
              });
        });
    });

  suite('GET /api/convert', function () {
    test('Invalid input: ?input=32g', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(
                    res.text,
                    '"invalid unit"'
                );
                done();
            });
      });
  });

  suite('GET /api/convert', function () {
    test('Invalid input: ?input=3/7.2/4kg', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(
                    res.text,
                    '"invalid number"'
                );
                done();
            });
      });
  });

  suite('GET /api/convert', function () {
    test('Invalid input: ?input=3/7.2/4kilomegagram', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(
                    res.text,
                    '"invalid number and unit"'
                );
                done();
            });
      });
  });

  suite('GET /api/convert', function () {
    test('Valid input: ?input=kg', function (done) {
        chai
            .request(server)
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(
                    res.text,
                    '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}'
                );
                done();
            });
      });
  });
});
