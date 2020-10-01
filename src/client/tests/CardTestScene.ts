import Card from '../gameObjects/Card';
import AnimationDispatcher from '../helpers/AnimationDispatcher';

window.AnimationDispatcher = AnimationDispatcher;

export default class CardTestScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CardTestScene'
        });
    }

    preload() {
        this.load.image('c1', '../src/assets/cards/c1.jpg');
        this.load.image('c2', '../src/assets/cards/c2.jpg');
        this.load.image('c3', '../src/assets/cards/c3.jpg');
        this.load.image('c4', '../src/assets/cards/c4.jpg');
        this.load.image('c5', '../src/assets/cards/c5.jpg');
        this.load.image('card-back', '../src/assets/card-back.png');
        this.load.image('white', '../src/assets/white.bmp');
        this.load.image('card-outline-white', '../src/assets/card-outline-white.jpg');
        this.load.image('card-outline-green', '../src/assets/card-outline-green.jpg');
        this.load.image('card-outline-red', '../src/assets/card-outline-red.jpg');
        this.load.spritesheet('arrow', '../src/assets/arrow.png', {frameWidth:53, frameHeight:142});
    }

    create() { var self = this; window.scene = this;
        let dz = new Phaser.GameObjects.Zone(this, 700, 100, 200, 200);
        dz.setRectangleDropZone(200, 200);
        let border = this.add.graphics();
        border.lineStyle(4, 0xff69b4);
        border.strokeRect(dz.x - dz.displayWidth / 2, dz.y - dz.displayHeight / 2, dz.displayWidth, dz.displayHeight);
    
        this.add.existing(dz);
        this.input.on('drop', (pointer:any, card:Card, dropZone:Phaser.GameObjects.Zone) => {
            card._.setState("played", true);
        })

        //var card1 = new Card({scene:this, x: 200, y: 70, cardData: {id:1, name: 'Lemurian', attack: 16, image: 'c1', revealed: false, isMyCard:true, isPlayed:false}})

        var card2 = new Card(100, 180, {id:2, name: 'Sconx', image:'c2', attack:17, revealed:true, isMyCard:true, isPlayed:false})

        var card3 = new Card(100, 290, {id:3, name: 'Wolf', image:'c3', attack:17, revealed:true, isMyCard:false, isPlayed: false})

        var card4 = new Card(100, 400, {id:4, name: 'Lemurian', image:'c1', attack:17, revealed:false, isMyCard:false, isPlayed: false})

        var card5 = new Card(100, 510, {id:5, name: 'Lemurian', image:'c1', attack:17, revealed:true, isMyCard:true, isPlayed: false})

        // evenimente de la server ar fi in felul urmator
        let ev2 = {
            type: "attack",
            name: "Attack.normal",
            attacker: {id:1},
            attacked: {id:2}
        }
/*
        let ev3 = {
            type: "attack",
            name: "Attack.onBruiser",
            attacker: null,
            attacked: null
        }

        let ev4 = {
            type: "attack",
            name: "Attack.ranged",
            attacker: null,
            attacked: null
        }

        let ev5 = {
            type: "attack",
            name: "Attack.stealth",
            attacker: null,
            attacked: null
        }

        let ev6 = {
            type: "buff",
            name: "Buff.heal",
            target: []
        }

        let ev7 = {
            type: "debuff",
            name: "Debuff.bleed",
            target: []
        }

        let ev8= {
            type: "stateChanged",
            name: "CardPlay.normal",
            target: {id: 3},
        }

        let ev9= {
            type: "stateChanged",
            name: "CardConsumed.normal",
            target: [/* array of card objects from server ],
        }
/*
        let ev10= {
            type: "stateChanged",
            name: "CardPlay.lockUntilAttack",
            target: null,
        }

        let ev11= {
            type: "stateChanged",
            name: "CardHovered.byEnemy",//byYou
            target: null,
        }

        let ev13= {
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id:5},
        }

        let ev12= {
            type: "newTurn",
            name: "newTurn",//byYou
            target: null, // true or false
        }

        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "CardPick.normal",
            target: {id:1, name: 'Lemurian', image:'c1', attack:17, revealed:false, isMyCard:true, isPlayed: false}
        });
*/
        /*
        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id:1},
        });
        
        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "CardPlay.normal",
            target: {id: 1},
        });

        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id: 1},
        });
        
        
        */


        /*
        AnimationDispatcher.dispatch(ev2); // attack
        AnimationDispatcher.dispatch(ev8); // play card
        AnimationDispatcher.dispatch(ev13); // set playable
        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id:1},
        });
        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id:2},
        });
        */

/*
        this.selected = card2;

        // check if timeline is counting tween.oncomplete
        var timeline = this.tweens.createTimeline();
        var tween1 = {
            targets: card3,
            x: { from: card3.x, to: 300 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0,            // -1: infinity
            onComplete: function(tween, targets) {
                self.tweens.add({
                    targets: card3,
                    x: { from: card3.x, to: 100 },
                    ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 1000,
                    repeat: 0,            // -1: infinity
                })
            }
        }
        var tween2 = {
            targets: card4,
            x: { from: card4.x, to: 300 },
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0,            // -1: infinity
        }

        timeline.add(tween1);
        timeline.add(tween2);
        timeline.play();


        this.input.on('pointerover', function(pointer, gameObject) {
            //if (!self.selected) return;
            // implement card/object global position function
            var angle, c1, c2, h;
            c1 = Math.abs(gameObject[0].x - self.selected.x);
            c2 = Math.abs(gameObject[0].y - self.selected.y);
            h = Math.sqrt(Math.pow(c1,2) + Math.pow(c2, 2));
            angle = self.angle(self.selected.x, self.selected.y, gameObject[0].x, gameObject[0].y);

            self.anims.create({
                key: 'pointing',
                frames: self.anims.generateFrameNumbers('arrow', { start: 0, end: 1 }),
                frameRate: 2,
                repeat: -1
            });

            self.arrow = self.add.sprite(self.selected.x, self.selected.y, 'arrow');
            self.arrow.setOrigin(0.5, 1);
            self.arrow.setDisplaySize(10, h);
            self.arrow.angle = angle;
            self.arrow.anims.load('pointing');
            self.arrow.anims.play('pointing');
        })

        this.input.on('pointerout', function(pointer, gameObject) {
            if (!self.selected) return;
            self.arrow.destroy();
        })*/
    }
    
    update() { var self = this;
        
    }
}