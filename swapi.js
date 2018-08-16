const request = require('request-promise');

const apiBaseUrl = 'https://swapi.co/api/'

let cachedPeople;
let cachedPlanets;

const getAndParse = async (requestUrl) => {
    // Send get request (async/await style)
    const jsonResponse = await request.get(requestUrl);

    // text -> js object
    const parsedResponse = JSON.parse(jsonResponse);

    return parsedResponse;
};

const fetchPeople = async (sortBy = 'name') => {
    // TODO validate sortBy

    let people;

    if(cachedPeople) {
        people = cachedPeople;

        console.log('serving cached people');
    } else {
        people = []
        // Initialize request url
        let requestUrl = apiBaseUrl + 'people';

        // Loop while has next page
        while(requestUrl) {
            const { count, next, results } = await getAndParse(requestUrl);
            // Tell loop to get next page
            requestUrl = next;
            people = people.concat(results);
            console.log(`fetched ${people.length} of ${count} people`);
        }

        console.log(`Done fetching. Fetched ${people.length}`)

        cachedPeople = people;
    }

    // TODO test sorting
    // Make a copy of array to prevent concurrency issues
    const sortedPeople = [...people].sort((personA, personB) => {
        if(sortBy === "name") {
            return personA[sortBy].localeCompare(personB[sortBy]);
        } else if(sortBy === "height" || sortBy === "mass") {
            return personA[sortBy] - personB[sortBy];
        } else {
            return 0;
        }
    });

    // TODO test assert(people.length === 87)
    return sortedPeople;
};

module.exports.fetchPeople = fetchPeople;

const fetchPlanets = async () => {
    let planets;

    if(cachedPlanets) {
        planets = cachedPlanets;

        console.log('serving cached planets');
    } else {
        planets = []
        // Initialize request url
        let requestUrl = apiBaseUrl + 'planets';

        // Loop while has next page
        while(requestUrl) {
            const { count, next, results } = await getAndParse(requestUrl);
            // Tell loop to get next page
            requestUrl = next;
            planets = planets.concat(results);
            console.log(`fetched ${planets.length} of ${count} planets`);
        }

        console.log(`Done fetching. Fetched ${planets.length}`)

        cachedPlanets = planets;

        for(let planet of planets) {
            for(let i = 0; i < planet.residents.length; i++) {
                for(let person of cachedPeople) {
                    if(person.url === planet.residents[i]) {
                        planet.residents[i] = person.name;
                    }
                }
            }
        }
    }

    return planets;
};

module.exports.fetchPlanets = fetchPlanets;