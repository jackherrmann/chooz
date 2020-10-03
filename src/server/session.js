
class Session {

    constructor(category, num) {
        this.host = "";
        this.choosers = {};
        this.category = category;
        this.swipes = {};
        this.num = num;
        this.results = {}; // maps activites to num of matches, take that number compare to total num of users
        this.activities = [];
        this.generateActivities(this.category);
    }

    generateActivities(category) {
        if (category == "movies") {

        } else if (category == "food") {

        } else if (category == "events") {

        }

        //implement apis
        return -1; 
    }

    addMember(name) {
        this.choosers[name] = 0;

        var dummy = [];
        for (var i = 0; i < this.num; i++) {
            dummy.push(-1);
        }

        this.swipes[name] = dummy;
    }

    setHost(name) {
        this.hose = name;
    }

    performSwipe(name, direction) {
        var idx = this.choosers[name]

        if (direction == "left") {
            this.swipes[name][idx] = 0;
        } else {
            this.swipes[name][idx] = 1;
        }

        this.choosers[name]++;
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
            for (j in swipes[i]) {
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