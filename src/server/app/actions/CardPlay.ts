import Card from "../Card";

export default class CardPlay
{
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
        this.partyModifiersBefore.forEach(m => m.perform(this.card));
        this.enemyModifiersBefore.forEach(m => m.perform(this.card));
    }

    private play(): void
    {
        this.beforePlay();
        switch (this.card.playMode) {
            case ICard.PlayMode.NORMAL:
                this.playNormal(this.card);
                break;
        }
        this.afterPlay();
    }

    private afterPlay()
    {
        this.partyModifiersAfter.forEach(m => m.perform(this.card));
        this.enemyModifiersAfter.forEach(m => m.perform(this.card));
    }

    private playNormal(card:Card): void
    {
        if (!card.isPlayable()) {
            throw new Error("Card is not playable");
        }
        card.setLocation("onTable");
    }
}