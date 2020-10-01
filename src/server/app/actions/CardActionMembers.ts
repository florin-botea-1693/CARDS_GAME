import Card from "../Card";

export default class CardActionMembers
{
	private _actionHolder: Card;
	private _actionReceiver: Card;

	get actionHolder() {
		return this._actionHolder;
    }
    get actionReceiver() {
        return this._actionReceiver;
    }
    
    public setActionReceiver(card:Card) {
        this._actionReceiver = card;
    }

    constructor(holder:Card, receiver:Card) 
    {
        this._actionHolder = holder;
        this._actionReceiver = receiver;
    }
}