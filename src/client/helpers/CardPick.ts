import Card from "../gameObjects/Card";

export default class CardPick
{
    public static duration = 1000;

    static perform(m: string, ev:any) {
        let y = ev.target.isMyCard ? 500 : 100;
        let card: Card = Card.getCard(ev.target.id) || new Card(600, y, ev.target);
        switch (m) {
            case "normal":
                CardPick.normal(card);
                break;
        }
    }

    public static normal(card: Card) {
        if (card._.isRevealed() || card._.isPlayed()) {
            throw new Error("card is already played, or revealed");
            return;
        }

        // move tween
        window.scene.tweens.add({
            targets: card,
            x: { from: card.x, to: card.x - 400 },
            ease: 'Linear',
            duration: CardPick.duration,
            yoyo: false
        });
        // rise up tween
        window.scene.tweens.add({ // riseUp -> placeDown
            targets: card._.getImage(),
            scale: { from: card._.getImage().scale, to: window.GAME_SCALE + (window.GAME_SCALE*20/100) },
            ease: 'Linear',
            duration: CardPick.duration/2,
            yoyo: true,
        });

        // reveal tween
        if (!card._.isMyCard())
            return
        window.scene.tweens.add({
            targets: card._.getLight(),
            alpha: { from: 0, to: 0.8 },
            ease: 'Linear',
            duration: 500,
            yoyo: true
        });
        window.scene.tweens.add({
            targets: card._.getCover(),
            alpha: { from: 1, to: 0 },
            ease: 'Linear',
            duration: 500,
            yoyo: false
        });
        window.scene.tweens.add({
            targets: card._.getImage(),
            alpha: { from: 0, to: 1 },
            ease: 'Linear',
            duration: 500,
            yoyo: false
        });
        card._.setState("revealed", true);
    }
}