import Card from "../gameObjects/Card";

export default class AttackPointer {

    private static arrow: Phaser.GameObjects.Sprite;

    private static angle(fromX: number, fromY: number, toX: number, toY: number) {
        var dy = toY - fromY;
        var dx = toX - fromX;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta + 90;
    }

    public static pointer(attacker:Card, attacked:Card) {
        AttackPointer.clearPointer();
        
        window.scene.anims.create({ // nu are ce cauta aici
            key: 'pointing',
            frames: window.scene.anims.generateFrameNumbers('arrow', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        var angle, c1, c2, h;
        c1 = Math.abs(attacked.x - attacker.x);
        c2 = Math.abs(attacked.y - attacker.y);
        h = Math.sqrt(Math.pow(c1,2) + Math.pow(c2, 2));
        angle = AttackPointer.angle(
            attacker.x,
            attacker.y,
            attacked.x,
            attacked.y
        );

        let arrow = window.scene.add.sprite(attacker.x, attacker.y, 'arrow');
        AttackPointer.arrow = arrow;
            arrow.setOrigin(0.5, 1);
            arrow.setDisplaySize(10, h);
            arrow.angle = angle;
            arrow.anims.load('pointing');
            arrow.anims.play('pointing');
    }

    public static clearPointer() {
        if (AttackPointer.arrow)
            AttackPointer.arrow.destroy();
    }
}