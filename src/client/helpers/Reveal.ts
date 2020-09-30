import Card from "../gameObjects/Card";

export default class Reveal
{
    public static basicReveal(card: Card) {
        if (card._.isRevealed()) return;
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