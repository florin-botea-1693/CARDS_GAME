import * as Phaser from 'phaser';

// import PhaserGame from "./phaser.game.ts";
import io from 'socket.io-client';
import CardTestScene from './../tests/CardTestScene';
import GameTableScene from "./scenes/GameTableScene";
import EventsDispatcher from './EventsDispatcher';
import GameTableTestScene from '../tests/GameTableTestScene';
var cookie = require("cookie");

declare global {
    interface Window {
        game: Phaser.Game; 
        GAME_SCALE: number;
        scene: any;
        $socket: SocketIOClient.Socket;
        socket: SocketIOClient.Socket;
        EventsDispatcher: EventsDispatcher;
        AnimationDispatcher: any;
        getSessionToken: Function;
    }
}

// window.$socket = io('/', {
//     query: {token: window.navigator.productSub}
// });

let idCookie:string|null = null;
let m = document.querySelector("meta[name=idCookie]");
if (!m) {
    alert("Error identifying the client");
    throw new Error("Error identifying the client");
} else {
    idCookie = m.getAttribute('content');
}

window.getSessionToken = function():string {
    return idCookie as string;
}
window.$socket = window.socket = io.connect(window.location.href/*, {
    query: {token: window.navigator.productSub, namespace: "/dev"},
}*/);

function getScene(): any {
    let urlParams = new URLSearchParams(window.location.search);
    let test: any = urlParams.get('test');
    let scene:any = GameTableScene;
    switch (test) {
        case "CardTestScene":
            scene = CardTestScene;
            break;
        case "GameTableTestScene":
            scene = GameTableTestScene;
            break;
    }
    return scene;
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
    //gameScale: 1,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    dom: {
        createContainer: true
    },
    scene: getScene(),
};

window.GAME_SCALE = window.devicePixelRatio / 3;
window.EventsDispatcher = new EventsDispatcher();
window.$socket.on("gameEvent", function(event:any) {
    let events = Array.isArray(event) ? event : [event];
    events.forEach((ev:any) => window.EventsDispatcher.dispatch(ev));
});

window.game = new Phaser.Game(config);