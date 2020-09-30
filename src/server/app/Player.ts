import User from "./User";
import Card from "./Card";
import Room from "./Room";
import CardFactory from "./CardFactory";
import CardPlay from "./actions/CardPlay";
import ICard from "../../shared/ICard";
import IPlayer from "../../shared/IPlayer";

/**
 * Player e de fapt user intrat intr-o camera
 */

export default class Player
{
    private static instances:{[key:string]:Player} = {};
    public static find(id:string) {
        return Player.instances[id];
    }

    private user:User; // in modul asta, user poate fi inlocuit oricand, in cazul in care se reconecteaza cu un alt socket id
    private _cards:Array<Card>; // nu va avea cards in hand/cards in pack, ci doar cards, iar fiecare card va avea un state
    
    private room:Room|null = null;

    public getId():string 
    {
        if (!this.user) throw new Error("No user to player");
        return this.user.getId();
    }
    public getSocket():any 
    {
        return this.user.getSocket();
    }
    public getRoom():Room {
        return this.room;
    }

    get id() {
        return this.user.getId();
    }

    get cards() {
        return this._cards;
    }

    public getCards() {
        return this._cards;
    }

    public getOpponent(): Player
    {
        return this.room.getPlayers().find(p => p.id != this.id);
    }

    public getCardsOnTable(): Array<Card>
    {
        return this._cards.filter(card => card.location == "onTable");
    }

    constructor(user:User) {
        this.user = user;
        this._cards = user.getCardsPack().map(cardData => CardFactory.create(this, cardData));

        Player.instances[user.getId()] = this;
        this.user.setPlayer(this);
        console.log(`Player with id ${this.getId()} created`);
        this.io();
    }

    public setRoom(room:Room) {
        this.room = room;
    }

    public setCards(cards:Array<ICard.Data>) {
        this._cards = cards.map(c => CardFactory.create(this, c));
    }

    public getEnemy(): Player
    {
        return this.room.getPlayers().find(p => p.id != this.id);
    }

    public toJson(): IPlayer.Data
    {
        return {
            id: this.getId(),
            cards: this.cards.map(c => c.toJson())
        }
    }

    private io() {
        console.log("setting up player io events");
        this.getSocket().on("gameTableSceneLoaded", () => {
            this.getSocket().emit("gameTableSceneData", this.room.getData())
            console.log(`Sending room data to player ${this.getId()}`);
        });
    }
}