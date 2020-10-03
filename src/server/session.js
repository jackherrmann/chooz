


class Session {

    constructor(choosers, category, swipes) {
        this.sockets = {}
        this.choosers = choosers;
        this.category = category;
        this.swipes = [];

        var dummy = []
        for (var i = 0; i < swipes; i++) {
            dummy.push(0);
        }

        this.swipes.push(dummy);
    }

    addMember(socket, name) {
        this.sockets[socket.id] = socket;
        this.choosers.push(name);

        var dummy = [];
        for (var i = 0; i < swipes; i++) {
            dummy.push(0);
        }

        this.swipes.push(dummy);
    }

}