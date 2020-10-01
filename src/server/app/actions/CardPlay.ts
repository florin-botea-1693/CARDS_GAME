import Card from "../Card";

export default class CardPlay
{
	private clientActions: Array<IClientAction> = [];
	
    private card: Card;
    private partyCards: Array<Card>;
    private enemyCards: Array<Card>;
    // vor fi sortati dupa indexExecutie
    private partyModifiersBefore: Array<IModifier.Modifier>;
    private partyModifiersAfter: Array<IModifier.Modifier>;
    private enemyModifiersBefore: Array<IModifier.Modifier>;
    private enemyModifiersAfter: Array<IModifier.Modifier>;

	// !!!! nu e nevoie/ar fi limitativ sa impart modifiers executia lor in functie de party... las pe index !!!
	// extrag metodele de mai jos (before play, after play, evaluate) intr-un parent class
    constructor(card:Card) {
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
        this.clientActions.concat(ClientAction.Play.normal(card));
    }
}