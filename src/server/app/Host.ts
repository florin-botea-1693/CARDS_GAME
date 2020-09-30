//const WaitingList = require('./waiting-list');
import User from "./User";
import Player from "./Player";
import Room from "./Room";
var cookie = require('cookie');

export default class Host
{
    private waitingList:Array<string> = []; // player = client cookie or id if logged in
    private rooms:{[key:string]: Room} = {};

    private players:{[key:string]: Player} = {};
    private playerBySocket:{[key:string]: Player} = {};
    // this.socketByPlayer = {} -> socket = atribut al lui Player
    // this.playerInRoom = {}-> room = atribut al lui Player

    public bindPlayerSocket(player_id:string, socket_id:string) {
        this.playerBySocket[socket_id] = Player.find(player_id);
    }

    public getPlayerBySocket(socket_id:string) {
        return this.playerBySocket[socket_id];
    }

    constructor() {
        // this.waitingList = new WaitingList()

        // this.playerIdHasSocket = {} // doar in cazul in care player e logat, ca sa il intorc in joc in cazul in care iese
        // this.playerHasSocket = {}
        // on player accepts challange, put it in preRoom and in playerInRoom
        // if preRoom is ready, addRoom and emit to players that game is starting with room object
        // set a timeout and if room is not ready, emit to user that challange refused
        
        // when user make action, this find user by token/sokket.id then find room by playerInRoom then call a room.specificFunction(withpl)
/*
        $.io.on('connection', function (socket) {
            let cookies = cookie.parse(socket.handshake.headers.cookie);
            // let player = cookies.cookieName;
            // for debugging on 8080
            var player = socket.handshake.query.token;
            self.bindPlayerSocket(player, socket.id);

            socket.on('waitingListEntry', function() {
                // /*PLAYER User.generate(socket.id, 'forest')
                self.players[player] = User.generate(player, 'forest'); // || get user from db and create one new player based on config there
                if (! self.waitingList.includes(player)) {
                    self.waitingList.push(player);
                }
                
                self.waitingList.forEach(otherPlayer => {
                    if (otherPlayer != player && otherPlayer != 'undefined' && player != 'undefined') {
                        var uniqueRoomId = 'unique_room_id';
                        self.rooms[uniqueRoomId] = new Room({id:uniqueRoomId});
                        $.io.to(self.getSocketByPlayer(otherPlayer)).emit('challengeFound', uniqueRoomId);
                        $.io.to(self.getSocketByPlayer(player)).emit('challengeFound', uniqueRoomId);
                        console.log('sent challenge to ' + otherPlayer + ' -> ' + self.getSocketByPlayer(otherPlayer))
                        console.log('sent challenge to ' + player + ' -> ' + self.getSocketByPlayer(player))
                        setTimeout(function() {
                            if (!self.rooms[uniqueRoomId].getPlayer(player) || !self.rooms[uniqueRoomId].getPlayer(otherPlayer)) {
                                console.log('challenge refused');
                                delete self.rooms[uniqueRoomId];
                            }
                        }, 10000)
                    }
                })
            })

            socket.on('challengeAccepted', function(uniqueRoomId) {
                var room = self.rooms[uniqueRoomId];
                if (room.isFull()) {
                    console.log(self.getPlayerBySocket() + ' -> ' + socket.id + ' accepted, but room is full', room)
                }
                if (!room.getPlayer(player)) {
                    room.addPlayer(self.players[player]);
                    self.playerInRoom[player] = uniqueRoomId;
                }
                console.log( self.getPlayerBySocket(socket.id) + ' -> ' + socket.id + ' has entered in room ' + uniqueRoomId, self.rooms[uniqueRoomId] )
                if (room.isFull()) {
                    room.startGame();
                    // room va avea acces la host pentru a emite evenimente
                }
            })

            // tot ce tine de turns, timeouts, va trebui facut la nivel de server, ca sa nu am fake de la client

            socket.on('passTurn', function() {
                var player = self.getPlayerBySocket(socket.id);
                var room = self.rooms[self.playerInRoom[player]];
                // console.log(`${player} -> ${socket.id} has passed turn in room ${self.rooms[self.playerInRoom[player]]}`, self.playerInRoom, self.rooms)
                room.passTurn(player); // timeout va fi pe camera si camera va emite catre socket ca doar are acces la globala
            })

            socket.on('substractCardsFromPack', function(count) {
                // find player by socket
                // find room by player
                socket.emit('cardsSubstracted', 1, [1, 2, 3]);
            })

            socket.on('cardPlayed', function(card) {
                // find player by socket
                // find room by player
                // room.playCard(player, card)
                socket.emit('cardPlayed', card);
            })
        })
        */
    }
}