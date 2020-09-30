import Card from "../Card";
import User from "../User";
import PlayCard from "../actions/CardPlay";
import Player from "../Player";
import ICard from "../../../shared/ICard";

export default class Lemurian extends Card
{
    constructor(player:Player, cardData:ICard.Data) 
    { // + room, chiar am nevoie de room, dar si de user
        super();

        this.id = cardData.id;
        this.cardId = 1;
        this.name = "Lemurian";
        this._location = cardData.location;
        this.image = "c1";
        this._player = player;

        this._playMode = ICard.PlayMode.NORMAL;
    }
}