import Card from "../gameObjects/Card";

export default class Playable
{
    static perform(m: string, ev:any) {
        let card: Card = Card.getCard(ev.target.id); // va suporta si arii pe viitor
        switch (m) {
            case "normal":
                Playable.normal(card, ev.newState);
                break;
        }
    }

    public static normal(card:Card, b: boolean) {
        card._.setState("playable", b);
    }
}