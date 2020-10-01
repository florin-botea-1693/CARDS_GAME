var cookie = require("cookie"); 
import User from "./app/User";
import Room from "./app/Room";
import Player from "./app/Player";
import Card from "./app/Card";
import CardPlay from "./app/actions/CardPlay";

module.exports = function(io:SocketIO.Server)
{
    console.log("dar de ce mergi...");
    io.of("/dev").on("connect", function(socket:SocketIO.Socket) 
    {
        let user = User.identify(socket);
        console.log(`Dev connection ${user.getId()}`);
        if (socket.handshake.query.test && socket.handshake.query.test == "GameTableTestScene") 
        {
            socket.join("admin_room");
            let room = Room.find("admin_room") || new Room({id:"admin_room"});
            let player = Player.find(user.getId()) || new Player(user);
            if (!room.hasPlayer(player)) {
                room.addPlayer(player);
            }
        }
        // room-ul ii transmite mesaj user-ului mesaj: please wait for opponent to enter in room
        // acelasi lucru se va intampla si de pe un alt browser (voi avea 2 admini)
        // cand user 2 intra in room, start 

        socket.on("room/sceneReady", function() 
        {
            console.log("room/sceneReady");
            let room = user.asPlayer().getRoom();
            room.setPlayerReady(user.getId());

            if (room.getPlayersReady().length < 2) 
            {
                socket.emit("room/waitingForOpponentToJoin");
                return;
            }

            if (room.gameStarted()) 
            {
                console.log("game is started, updating data to user after reload");
                socket.emit("room/roomData", room.getData());
                return;
            }

            if (room.getPlayersReady().length >= 2)
            {
                room.setReady();
            }
        });

        socket.on("card/play", function({cardId}) 
        {
        	// lock user.playCard for concurency pushing
            let card = user.asPlayer().cards.find(card => card.getId() == cardId);
            if (!card) throw new Error("User played a card, but card not found -> card.id:" + JSON.stringify({cardId}));
            console.log("playing card " + JSON.stringify(card.toJson()));
            let action = new CardPlay(card);
            socket.emit("room/eventsQueue", action.toClientActions()); 
            // unlock user
        });
    });

    io.on("connection", function(socket:SocketIO.Socket) 
    {
        let user = User.identify(socket); 
    });
}