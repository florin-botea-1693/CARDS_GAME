import Card from "../gameObjects/Card";

export default class Attack
{
    static perform(m: string, ev:any) {
        let attacker: Card = Card.getCard(ev.attacker.id);
        let victim: Card = Card.getCard(ev.attacked.id);
        switch (m) {
            case "normal":
                Attack.normal(attacker, victim);
                break;
        }
    }

    public static normal(attacker:Card, victim:Card) {
        window.scene.children.bringToTop(attacker._.getContainer());
        window.scene.tweens.add({
            targets: attacker._.getContainer(),
            x: { from: attacker._.getContainer().x, to: victim._.getContainer().x },
            y: { from: attacker._.getContainer().y, to: victim._.getContainer().y },
            ease: 'Linear',
            duration: 500,
            yoyo: true
        });
    }
}