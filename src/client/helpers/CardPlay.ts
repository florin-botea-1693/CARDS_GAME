import Card from "../gameObjects/Card";

export default class CardPlay
{
    public static duration: number = 1000;

    static perform(m: string, ev:any) {
        let card: Card = Card.getCard(ev.target.id)
        switch (m) {
            case "normal":
                CardPlay.normal(card);
                break;
        }
    }

    public static normal(card: Card) {
        // duration
        card._.setState("playable", false);
        window.scene.tweens.add({
            targets: card,
            x: { from: card.x, to: card.x + 1 },
            ease: 'Linear',
            duration: CardPlay.duration,
            yoyo: false,
            onComplete: function() {
                card._.placeDown();
            }
        });
        window.scene.tweens.add({ // riseUp -> placeDown
            targets: card._.getImage(),
            scale: { from: card._.getImage().scale, to: window.GAME_SCALE + (window.GAME_SCALE*20/100) },
            ease: 'Linear',
            duration: CardPlay.duration/2,
            yoyo: true,
        });
    }
}