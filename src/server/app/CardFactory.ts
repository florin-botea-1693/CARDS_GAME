import Card from "./Card";
import Lemurian from "./cards/Lemurian";
import Player from "./Player";
import ICard from "../../shared/ICard";

export default class CardFactory
{
    public static create(player:Player, cardData:ICard.Data): Card 
    {
        return new Lemurian(player, cardData);
    }
}
