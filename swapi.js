const request = require('request-promise');

const apiBaseUrl = 'https://swapi.co/api/'

let cachedPeople;

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
            console.log(`fetched ${people.length} of ${count}`);
        }

        console.log(`Done fetching. Fetched ${people.length}`)

        cachedPeople = people;
    }

    // TODO test sorting
    people = people.sort((personA, personB) => personA[sortBy] - personB[sortBy]);

    // TODO test assert(people.length === 87)
    return people;
};

module.exports.fetchPeople = fetchPeople;