import ICardData from "./ICardData";
import Player from "./Player";
var cookie = require("cookie");
/**
 * User devine player atunci cand intra intr-o camera
 */

export default class User 
{
    private static instances:{[key:string]:User} = {};
    /**
     * 
     * @param id = cookies.cookieName
     */
    public static find(id:string):User {
        return User.instances[id];
    }
    /**
     * 
     * @param socket = socket from client to identify user
     */
    public static identify(socket:SocketIO.Socket):User {
        let cookies = cookie.parse(socket.handshake.headers.cookie);  
        let user = User.find(cookies.cookieName) || new User({id:cookies.cookieName, cardsPack:[]}); // disconnect = delete cookie
        user.setSocket(socket);
        return user;
    }

    private socket:SocketIO.Socket = null;
    private id:string;
    private cardsPack:Array<ICard.Data>;
    private player:Player = null;
    
    public getId():string 
    {
        return this.id;
    }
    public getCardsPack(): Array<ICard.Data> 
    {
        return this.cardsPack;
    }
    public getSocket():any {
        return this.socket;
    }

    constructor(data:{id:string, cardsPack:Array<ICard.Data>}) {
        this.id = data.id;
        this.cardsPack = data.cardsPack;

        User.instances[this.id] = this;

        console.log(`User with id ${this.id} created`);
    }

    public setSocket(socket:SocketIO.Socket):void {
        this.socket = socket;
    }

    public setPlayer(player:Player):void {
        this.player = player;
    }

    public asPlayer():Player {
        return this.player;
    }
}