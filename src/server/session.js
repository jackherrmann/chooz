const {yelpSearch} = require('../yelp-api/yelpSearch');

class Session {

    constructor(category, numActivities, location, params) {
        this.host = "";
        this.choosers = [];
        this.category = category;
        this.swipes = {};
        this.numActivities = numActivities;
        this.results = {}; // maps activites to num of matches, take that number compare to total num of users
        this.activities = [];
        this.location = location;
        this.params = params;
    }

    getMembers() {
        return this.choosers;
    }

    getActivities() {
        return this.activities;
    }


    addMember(name) {
        this.choosers.push(name);
    }

    setHost(name) {
        this.hose = name;
    }

    processSwipes(name, userSwipes) {
        this.swipes[name] = userSwipes;
    }

    isFinished() {
        if (Object.keys(this.swipes).size() == this.choosers.length) {
            return true;
        }

        return false;
    }

    getMatches() {
        indexes = {};
        currIndex = 0;

        for (var i of swipes) {
            for (var j of swipes[i]) {
                indexes[currIndex] += j;
                currIndex++;
            }
            currIndex = 0;
        }

        matches = [];

        for (var i of indexes) {
            if (index[i] == this.choosers.length) {
                matches.push(activities[i]);
            }
        }

        return matches;
    }
}

module.exports = { Session };