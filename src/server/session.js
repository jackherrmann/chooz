


class Session {

    constructor(members, category, swipes) {
        this.sockets = {}
        this.members = members;
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
        this.members.push(name);

        var dummy = [];
        for (var i = 0; i < swipes; i++) {
            dummy.push(0);
        }

        this.swipes.push(dummy);
    }

}