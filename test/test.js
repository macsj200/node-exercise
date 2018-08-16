var assert = require('assert');
const request = require('request');

describe('People', function() {
  describe('get people', function() {
    it('should get all 87 people', function(done) {
        // this.timeout(9000);
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
  });
});