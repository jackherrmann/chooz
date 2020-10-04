const {yelpSearch} = require('../yelp-api/yelpSearch');

class Session {

    constructor(category, numActivities, location) {
        this.host = "";
        this.choosers = [];
        this.category = category;
        this.swipes = {};
        this.numActivities = numActivities;
        this.results = {}; // maps activites to num of matches, take that number compare to total num of users
        this.activities = [];
        this.location = location
    }

    getMembers() {
        return this.choosers;
    }

    getActivities() {
        return this.activities;
    }

    async generateActivities() {
        console.log(this.category)
        if (this.category == "movies") {

        } else if (this.category == "Food") {
            yelpSearch(this.category, this.location.latitude, this.location.longitude)
            .then((businesses) => {
                console.log(businesses[0]);
                var c = 0;
                
                for (var b of businesses) { 
                    if (c == this.numActivities) {
                        break;
                    }
                    
                    const activity = {
                        name : b.name,
                        cuisine : b.categories[0].title,
                        url : b.url,
                        image_url : b.image_url,
                        rating : b.rating,
                        price : b.price,
                        location : b.location.display_address[0] + ", " + b.location.display_address[1],
                    }

                    this.activities.push(activity);
                    c++;
                }
                
            })

            
            
            // name, price, cuisine, type = food, rating, 
        } else if (category == "events") {

        }
    
            //implement apis
        
    }

    addMember(name) {
        this.choosers.push(name);
    }

    setHost(name) {
        this.hose = name;
    }

    // performSwipe(name, direction) {
    //     var idx = this.choosers[name]

    //     if (direction == "left") {
    //         this.swipes[name][idx] = 0;
    //     } else {
    //         this.swipes[name][idx] = 1;
    //     }

    //     this.choosers[name]++;
    // }

    processSwipes(name, userSwipes) {
        this.swipes[name] = userSwipes;
    }

    isFinished() {
        for (i in choosers) {
            if (choosers[i] !== self.nums) {
                return false;
            }
        }

        return true;
    }

    getMatches() {
        indexes = {};
        currIndex = 0;

        for (i in swipes) {
            for (j of swipes[i]) {
                indexes[currIndex] += j;
                currIndex++;
            }
            currIndex = 0;
        }

        matches = [];

        for (i in indexes) {
            if (index[i] == this.choosers.length()) {
                matches.push(activities[i]);
            }
        }

        return matches;
    }
}

module.exports = { Session };