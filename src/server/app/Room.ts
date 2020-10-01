import Player from "./Player";
import IRoom from "../../shared/IRoom";

export default class Room 
{
    private static instances:{[key:string]:Room} = {};
    public static find(id:string) {
        return Room.instances[id];
    }

    private _id:string;
    private turn:number = 0;
    private maxWaiting:number = 5000;
    private timeOut:number = null;
    private _gameStarted:boolean = false;

    private players:Array<Player> = [];
    private playersReady:Array<string> = [];

    constructor(data:{id:string}) 
    { // unique_id
        this._id = data.id; // il pot genera aici in cazul in care nu e specificat

        Room.instances[this._id] = this;
        console.log(`Room with id ${this._id} created`);
        this.setIO();
    }

    get id():string {
        return this._id;
    }

    public getPlayers(): Array<Player>
    {
        return this.players;
    }

    public addPlayer(player:Player): void
    {
        if (this.isFull()) {
            throw new Error("The room " + this.id + " is full;");
        }
        player.getSocket().join(this.id);
        player.setRoom(this);
        this.players.push(player);
        console.log(`Player with id ${player.getId()} has entered in room_id ${this.id}`);
        if (this.isFull()) {
            console.log(`Room with id ${this.id} is now full.`);
            this.setReady();
        }
    }

    public hasPlayer(player:Player): boolean 
    {
        return this.players.findIndex(p => p.getId() == player.getId()) >= 0;
    }

    public isFull(): boolean 
    {
        return this.players.length >= 2;
    }

    public isEmpty(): boolean 
    {
        return this.players.length == 0;
    }

    public getPlayersReady(): Array<string>
    {
        return this.playersReady;
    }

    public setPlayerReady(s:string): void
    {
        if (this.playersReady.length >= 2 || this.playersReady.includes(s)) {
            return;
        }
        this.playersReady.push(s);
    }

    public setReady(): void
    {
        if (!this.isFull()) {
            throw new Error("The game can not be ready because the room is not full");
        }
        console.log(`The room with id ${this.id} is ready to start.`);
        (global.io as any).of('/dev').in(this.id).emit("room/roomData", this.getData());
    }

    public gameStarted(): boolean 
    {
        return this._gameStarted;
    }

    public startGame(): void
    {
        
    }

    public getData(): IRoom.Data
    {
        var cache:any = [];
        return {
            players: [
                this.players[0].toJson(),
                this.players[1].toJson()
            ]
        }
    }

    /**
     * only in dev mode
     */
    public _setData(data:IRoom.Data): void 
    {
        data.players.forEach(p => {
            Player.find(p.id).setCards(p.cards);
        });
    }
//
    public setIO() {/*
        var self = this;
        global.io.on('connection', function (socket: any) {
            socket.on("GameTableSceneReady", function() {
                if (self.playersReady.length >= 2 || self.playersReady.includes(socket.id)) {
                    return;
                }
                self.playersReady.push(socket.id);
                if (self.playersReady.length >= 2) { // pentru egalitate
                    // scena e gata, jocul a inceput, trimitem datele catre client, apoi un pick cards event
                    self.players.map(player => {
                        global.io.to(player.getSocketId()).emit("sceneDataUpdate", self.getData());
                        player.dragCards(3); // asta va anunta player si inamic
                    });
                    setTimeout(function() {
                        self.triggerTurnTimeout();
                    }, 3000) // sa dau timp primului player
                }
            })
            this.triggerTimeout = function () {
                self.timeOut = setTimeout(function() {
                    self.nextTurn()
                }, self.maxWaiting)
            }
        });*/
    }
    /*
    constructor(data) {
        var self = this;
        this.id = data.id;

        this.players = {} // pot edita asta aici ca nu pateste nimic, se creaza un nou user de fiecare data cand intra intr o noua asteptare
        this.turns = [];
        this.turn = 0;
        this.maxWaiting = 5000;
        this.timeOut = null;

        this.addPlayer = function(player) {
            self.players[player.id] = player;
            self.turns.push(player.id);
        }

        this.startGame = function() {
            var playersIds = Object.keys(self.players);
            self.players[playersIds[0]].pullCards(3);
            self.players[playersIds[1]].pullCards(3);

            var dataPacks = {} // socket : data pack
            playersIds.forEach( (p_id, index) => {
                let o_id = playersIds[(index+1) % 2];
                dataPacks[$.host.getSocketByPlayer(p_id)] = {
                    your: self.players[p_id],
                    opponent: self.players[o_id]
                }
            })
            
            for (let _socket in dataPacks) {
                $.io.to(_socket).emit('gameStarted', dataPacks[_socket]);
            }

            setTimeout(function() {
                self.triggerTimeout();
            }, 3000) // sa dau timp primului player
        }

        this.nextTurn = function() {
            self.turn = (self.turn+1) % self.turns.length;
            let turnsSocket = $.host.getSocketByPlayer(self.turns[self.turn]);
            $.io.to(turnsSocket).emit('yourTurn');
            console.log("next turn triggered ", self.turn, self.turns);
            self.triggerTimeout();
        }

        this.triggerTimeout = function () {
            self.timeOut = setTimeout(function() {
                self.nextTurn()
            }, self.maxWaiting)
        }
       
        this.passTurn = function(player_id) {
            if (self.turns[self.turn] != player_id) {
                console.log('player ' + player_id + ' tried to pass turn, but is not his turn');
                return;
            }
            clearTimeout(self.timeOut);
            self.nextTurn();
            console.log('turn passed by ' + player_id);
        }

        this.isFull = () => Object.keys(self.players).length >= 2;
        this.getPlayer = (player) => self.players[player]; 

        // on player dropped annonce other player, 
        // if user is not logged in and conn lost, make real drop
        // nu cred ca voi avea niciodata nevoie de asta, poate doar functii ajutatoare pe ea, ca daca bag socket listen aici, e duplicat la greu de events
    }*/
}