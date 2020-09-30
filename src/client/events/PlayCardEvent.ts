import Card from "../gameObjects/Card";

export default class PlayCardEvent
{
    public card:Card;

    constructor(event:any) {
        this.card = Card.getCard(event.target.id);
    }
}