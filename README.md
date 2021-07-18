# MeetUp

Analyzes and suggests the closest meet-up location

## Inspiration
Instead of spending a lot of time, seeing which location would be closer to everyone, just entering the locations into the program, it'll tell which would be the closest

## What it does
Takes in all the locations of people and all the meetup locations, sends a post HTTP request to the bing maps rest API, and gets a distance matrix. analyzes the distance matrix, to find the closest location, and console.log() that location

## How we built it
used the bing maps rest API to get the distance matrix,
did some basic arithmetic to calculate the closest

## Challenges we ran into
the response from bing maps API call, was not the easiest to navigate

## Accomplishments that we're proud of
it took just a couple of hours to build the whole project

## What we learned
working with bing maps, using axios for sending HTTP requests from js

## What's next for MeetUp
instead of hard-coding all the locations, get user-input; make a mobile app to ease the user experience
