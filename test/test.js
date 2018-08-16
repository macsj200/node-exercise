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
            assert.deepEqual(people, require('../people_name.json'));
            done();
        });
    });

    it('should sort people by height', function(done) {
        const result = request.get('http://localhost:3000/people?sortBy=height', (err, res) => {
            if (err) {
                done(err);
            }
            // const people = JSON.parse(res);
            const people = JSON.parse(res.body);
            // console.log(people.length);
            assert.deepEqual(people, require('../people_height.json'));
            done();
        });
    });

    it('should sort people by mass', function(done) {
        const result = request.get('http://localhost:3000/people?sortBy=mass', (err, res) => {
            if (err) {
                done(err);
            }
            // const people = JSON.parse(res);
            const people = JSON.parse(res.body);
            // console.log(people.length);
            assert.deepEqual(people, require('../people_mass.json'));
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

describe('Planets', function() {
  describe('get planets', function() {
    it('should get all 61 planets', function(done) {
        const result = request.get('http://localhost:3000/planets', (err, res) => {
            if (err) {
                done(err);
            }
            // const people = JSON.parse(res);
            const planets = JSON.parse(res.body);
            // console.log(people.length);
            assert.equal(planets.length, 61);
            done();
        });
    });

    it('should replace people urls with names', function(done) {
        const result = request.get('http://localhost:3000/planets', (err, res) => {
            if (err) {
                done(err);
            }
            // const people = JSON.parse(res);
            const planets = JSON.parse(res.body);
            // console.log(people.length);
            for(let planet of planets) {
                if (planet.residents.length > 0) {
                    for(let resident of planet.residents) {
                        assert(resident.indexOf("swapi.co") === -1);
                    }
                }
            }
            done();
        });
    });
  });
});