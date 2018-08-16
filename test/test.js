var assert = require('assert');
const request = require('request');

describe('People', function() {
  describe('get people', function() {
    it('should get all 87 people', function(done) {
        const result = request.get('http://localhost:3000/people', (err, res) => {
            if (err) {
                done(err);
            }
            // const people = JSON.parse(res);
            const people = JSON.parse(res.body);
            // console.log(people.length);
            assert.equal(people.length, 87);
            done();
        });
    });

    it('should sort people by name', function(done) {
        const result = request.get('http://localhost:3000/people?sortBy=name', (err, res) => {
            if (err) {
                done(err);
            }
            // const people = JSON.parse(res);
            const people = JSON.parse(res.body);
            // console.log(people.length);
            assert.equal(people.length, 87);
            done();
        });
    });

    it('should fail gracefully with unknown sortBy', function(done) {
        const result = request.get('http://localhost:3000/people?sortBy=foo', (err, res) => {
            if (err) {
                done(err);
            }
            // const people = JSON.parse(res);
            const people = JSON.parse(res.body);
            // console.log(people.length);
            assert.equal(people.length, 87);
            done();
        });
    });
  });
});