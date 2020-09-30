import Card from "../gameObjects/Card";

export default class CardSelectionManager 
{
    private static selected: Card;

    public static selectCard(card: Card) {
        // controlez aici daca poate fi selectata
        if (!card._.getIsPlayable())
            return;

        if (this.selected)
            this.selected._.setState("selected", false);
            
        this.selected = card;
        card._.setState("selected", true);
    }

    public static getSelected() {
        return CardSelectionManager.selected;
    }
}