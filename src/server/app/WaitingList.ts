const User = require('./user');

module.exports = class WaitingList {
    constructor() {
        this.waitingList = [];

        let self = this;

        this.findOpponentsAndMakeProposal = function() {
            if (self.waitingList.length < 2) {
                return;
            }
            // o lista cu propunerile deja facute, ca sa nu fac propuneri incrucisate
            // loop pentru fiecare match
            console.log(self.waitingList)
            let roomUID = 1234;
            $.io.to(self.waitingList[0].socket).emit('challengeFound', self.waitingList[1], roomUID);
            $.io.to(self.waitingList[1].socket).emit('challengeFound', self.waitingList[0], roomUID);
        }

        $.io.on('connection', function (socket) {
            socket.on('waitingListEntry', function() {
                // if user logged in, push new user with its data, else create fake user
                // for now, I create fake users
                self.waitingList.push(User.generate(socket.id, 'forest'));
                self.findOpponentsAndMakeProposal();
            })
        })

        // when user enters in list, give me a pl about what he pick, auth-token
        // find user by auth token, get its cards config
        // in no auth token, generate new user -> User.generate(io.socket.id, 'class');
        // find opponents and make proposal
        // io.emit proposal p1, p2
        // io.on user out, drop from waiting list
    }
}