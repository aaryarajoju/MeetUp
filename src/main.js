
// global variables
const apiURL = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix';
const {apiKey} = require('./config.json');
const httpPostRequestURL = `${apiURL}?key=${apiKey}`
// const {locations} = require('./sampleLocations.json');
const {locations} = require('./testLocations1.json');
const numberOfOrigins = locations.origins.length;
const numberOfDestinations = locations.destinations.length;

// node modules import
const axios = require('axios')

// sending post request to the api, to get the distance matrix, for the locations
axios
    .post(httpPostRequestURL, locations)
    .then(res => {

        let status = res.status
        // console.log(status);

        // status `200` = success
        if (Number(status) === 200) {
            let results = res.data.resourceSets[0].resources[0].results;
            // console.log(results);

            let distanceMatrix = [];
            let k = 0;
            for (let i = 0; i < numberOfOrigins; i++) {
                let distances = [];
                for (let j = 0; j < numberOfDestinations; j++) {
                    distances.push(results[k].travelDistance);
                    k++;
                }
                distanceMatrix.push(distances);
            }
            // console.log(distanceMatrix);

            let timeMatrix = [];
            let l = 0;
            for (let i = 0; i < numberOfOrigins; i++) {
                let times = [];
                for (let j = 0; j < numberOfDestinations; j++) {
                    times.push(results[l].travelDuration);
                    l++;
                }
                timeMatrix.push(times);
            }
            // console.log(timeMatrix);

            let averageDistance = [];
            for (let j = 0; j < numberOfDestinations; j++) {
                let totalDistance = 0;
                for (let i = 0; i < numberOfOrigins; i++) {
                    totalDistance += distanceMatrix[i][j];
                }
                let avgDist = totalDistance / numberOfOrigins;
                averageDistance.push(avgDist)
            }
            // console.log(averageDistance);

            let averageTime = [];
            for (let j = 0; j < numberOfDestinations; j++) {
                let totalTime = 0;
                for (let i = 0; i < numberOfOrigins; i++) {
                    totalTime += timeMatrix[i][j];
                }
                let avgTime = totalTime / numberOfOrigins;
                averageTime.push(avgTime)
            }
            // console.log(averageTime);

            let indexOfClosestDist = averageDistance.indexOf(Math.min(...averageDistance));
            let indexOfClosestTime = averageTime.indexOf(Math.min(...averageTime));

            console.log(`\n\nclosest place (on the basis of distance): ${locations.destinations[indexOfClosestDist].name}`);
            console.log('people\'s distance from the place:');
            for (let i = 0; i < numberOfOrigins; i++) {
                console.log(`\t${locations.origins[i].name}: ${distanceMatrix[i][indexOfClosestDist].toFixed(2)} miles`);
            }
            console.log(`average distance: ${averageDistance[indexOfClosestDist].toFixed(2)} miles`);

            console.log(`\n\nclosest place (on the basis of time): ${locations.destinations[indexOfClosestTime].name}`);
            console.log('estimated time taken for people to get to the place:');
            for (let i = 0; i < numberOfOrigins; i++) {
                console.log(`\t${locations.origins[i].name}: ${timeMatrix[i][indexOfClosestTime].toFixed(2)} minutes`);
            }
            console.log(`average time: ${averageTime[indexOfClosestTime].toFixed(2)} minutes`);
        }
        console.log('\n\n');
    })
    .catch(error => {
        console.error(error);
    });

