export default function(socket:any) {
    console.log('A user connected: ' + socket.handshake.headers.cookie);
    // on document ready, send scene to client
    socket.on("GameTableSceneReady", function(/* poate un session_id aici */) {
        // trimitem data in functie de scene type
        let player = global.host.getPlayerBySocket(socket.id);
        let room = player.getRoom();
        if (room.getPlayersReady().length >= 2 || room.getPlayersReady().includes(socket.id)) {
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
        socket.emit("sceneDataUpdate", {});
    });

    socket.on("cardPlayed", function(e:{cardId:number}) {
        console.log(e.cardId);
        socket.emit("gameEvent", [
            {
                name: "cardPlayed",
                linear: true,
                target: {id:e.cardId},
            },
            {
                name: "setPlayable",
                newState: true,
                linear: false,
                target: {id:e.cardId},
            },            
        ]);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
    });
}