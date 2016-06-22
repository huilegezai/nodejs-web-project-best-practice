'use strict';

/**
 * 测试 /api/topics 接口
 */

const should = require('should');
const request = require('supertest');
const app = require('../app');
const Topic = require('../proxy/topic');

describe('/api/topic/:id', function () {

  it('should response null', function (done) {
    request(app)
      .get('/api/topic/000000000000000000000000')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        should.not.exists(res.body.error);
        should.equal(res.body.topic, null);
        done();
      });
  });

  it('should response topic', function (done) {
    Topic.getList({}, (err, list) => {
      if (err) throw err;

      list.should.be.an.Array();
      list.length.should.greaterThan(0);

      const topic = list[0];

      request(app)
        .get('/api/topic/' + topic._id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          should.not.exists(res.body.error);
          should.notEqual(res.body.topic, null);
          res.body.topic.should.be.an.Object();
          res.body.topic._id.should.equal(topic._id.toString());
          done();
        });
    })
  });

});
