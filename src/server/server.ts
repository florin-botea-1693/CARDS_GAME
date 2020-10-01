const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const http = require('http').createServer(app);
const HTMLing = require('htmling');
import User from "./app/User";
import socketIORoutes from "./routes/socket-io";
import Host from "./app/Host";
import Room from "./app/Room";
import Player from "./app/Player";
var path = require('path');
var cookie = require("cookie"); // npm install --save cookies

declare global {
    namespace NodeJS {
        interface Global {
            io: SocketIO.Server,
            host: Host
        }
    }
}
global.io = require('socket.io')(http);
global.host = new Host();
require("./io-events-handles")(global.io);

function checkOrSetCookie (req: any, res: any, next: any) {
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
      // no: set a new cookie
      var randomNumber=Math.random().toString();
      randomNumber=randomNumber.substring(2,randomNumber.length);
      res.cookie('cookieName',randomNumber, { maxAge: 9000000, httpOnly: true });
      //console.log('cookie created successfully');
    } 
    else {
      // yes, cookie was already present 
      //console.log('cookie exists', cookie);
    } 
    next();
}

app.use(cookieParser());
app.use(checkOrSetCookie);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('html', HTMLing.express(__dirname + '/views', {watch: true}));
app.set('view engine', 'html');

app.use(express.static('../../'));

app.get('/', (req: any, res: any) => {
    res.render("index", {data: {idCookie:req.cookies.cookieName}});
});
app.get('/dev', (req: any, res: any) => {
    res.render("index", {data: {idCookie:req.cookies.cookieName}});
});

app.get('/dev/GameTableDev', (req: any, res: any) => {
    res.render("GameTableDev", {data: JSON.stringify(Room.find("admin_room").getData(), null, "\t")});
});
app.post('/dev/GameTableDev', (req: any, res: any) => {
    console.log("data-post-by-dev");
    Room.find("admin_room")._setData(req.body.data);
    global.io.of('/dev').in("admin_room").emit("room/roomData", Room.find("admin_room").getData());
});

app.post('/dev/GameTableDev/events', (req: any, res: any) => {
    //Room.find("admin_room")._setData(req.body.data);
    global.io.of('/dev').in("admin_room").emit("room/eventsQueue", req.body.data);
});

//global.io.on('connection', socketIORoutes); // socketIORoutes
// nu am treaba cu asta momentan

http.listen(3000, () => {
    console.log('Server started!');
});

/*

io.on connection
    actualizam datele de socket la user

    socket.on card player
        am socket... gaseste room-ul, gaseste player ul...

*/
