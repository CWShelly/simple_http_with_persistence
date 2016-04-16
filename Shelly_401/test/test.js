const assert = require('assert');
const chai = require('chai');
const expect = require('chai').expect();
// const chaiHTTP = require('chai-http');
// chai.use(chaiHTTP);
const request = require('superagent');
const fs = require('fs');
const server = require(__dirname + '/../server');

describe('simple http server with server', () => {
  after((done) => {
    server.close(() =>{
      done();
    });
  });

  it('should accept posts to /notes + have created a json file', (done)=> {
    request
    .post('localhost:3000/notes')
    .send({hello: 'Lorem ipsum.'})
    .end((err, res) => {
      assert.equal('Lorem ipsum', 'Lorem ipsum', 'text is not lorem');
      assert.ok(fs.statSync('notes.json'));
      done();
  });
  });

  it('should connect, get 200, say expected text', (done) => {
    request
      .get('localhost:3000/notes')
      .end((err, res) => {
        assert((res.status === 200), 'status is not 200');
        done();
      });
  });


it('should 404 on bad requests', (done) => {
  request.get('localhost:3000/notroute')
    .end((err, res) => {
      assert((res.status === 404), 'status is not 404');
      done();
    });
});

});
