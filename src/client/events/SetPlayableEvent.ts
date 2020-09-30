import Card from "../gameObjects/Card";

export default class SetPlayableEvent 
{
    public card:Card;
    public newState:boolean;

    constructor(event:any) {
        this.card = Card.getCard(event.target.id);
        this.newState = event.newState;
    }
}