import Card from "../Card";

export default class CardPlay
{
	private clientActions: Array<IClientAction> = [];
	
    private card:Card;
    // vor fi sortati dupa indexExecutie
    private partyModifiersBefore: Array<IModifier.Modifier>;
    private partyModifiersAfter: Array<IModifier.Modifier>;
    private enemyModifiersBefore: Array<IModifier.Modifier>;
    private enemyModifiersAfter: Array<IModifier.Modifier>;

    constructor(card:Card) {
        this.card = card;


    }

    private beforePlay()
    {
    	let actions: Array<Array<IClientAction>>;
        actions = this.partyModifiersBefore.map(m => m.perform(this.card));
        actions.concat(this.enemyModifiersBefore.map(m => m.perform(this.card)));
        this.clientActions = actions.flat(Infinity);
    }

    private play(): Array<IClientAction>
    {
        this.beforePlay();
        switch (this.card.playMode) {
            case ICard.PlayMode.NORMAL:
                this.playNormal(this.card);
                break;
        }
        this.afterPlay();
        return this.clientActions;
    }

    private afterPlay()
    {
    	// la fel ca mai sus, doar ca fac concat la clientActions
        this.partyModifiersAfter.forEach(m => m.perform(this.card));
        this.enemyModifiersAfter.forEach(m => m.perform(this.card));
        cartile.aliate.map(c => ClientAction.CardState.evaluate(c)); // intoarce [IClientAction] pt fiecare carte
        // pentru toate cartile de pe tabla calculam daca pot fi jucate, daca sunt distruse, etc
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