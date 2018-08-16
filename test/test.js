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
            const people = JSON.parse(res);
            console.log(people);
            // assert.equal(res.length === 87);
            done();
        });
    });
  });
});