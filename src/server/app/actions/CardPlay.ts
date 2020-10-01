import Card from "../Card";
import CardAction from "./CardAction";
import IClientAction from "../../../shared/IClientAction";
import ICard from "../../../shared/ICard";

export default class CardPlay extends CardAction
{
    private card: Card;

	// !!!! nu e nevoie/ar fi limitativ sa impart modifiers executia lor in functie de party... las pe index !!!
	// extrag metodele de mai jos (before play, after play, evaluate) intr-un parent class
    constructor(card:Card) 
    {
        super();
        this.card = card;
        
    }

    private play(): Array<IClientAction>
    {
        this.before();
        switch (this.card.playMode) {
            case ICard.PlayMode.NORMAL:
                this.playNormal(this.card);
                break;
        }
        this.after();

		return this.clientActions;
    }

    private playNormal(card:Card): void
    {
        if (!card.isPlayable()) {
            throw new Error("Card is not playable");
        }
        card.setLocation("onTable");
        //this.clientActions.concat(ClientAction.Play.normal(card));
    }
}