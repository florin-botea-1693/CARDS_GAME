import PlayZone from "../gameObjects/PlayZone";
import CardPack from "../gameObjects/CardPack";
import CardHand from "../gameObjects/CardHand";
import AnimationDispatcher from "../helpers/AnimationDispatcher";

export default class Game extends Phaser.Scene
{
    private playZone:PlayZone|null = null;

    constructor() {
        //this.playZone
        super({
            key: 'GameTable'
        });
        window.scene = this;
    }

    init(/* aici */) {}

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
        this.load.image('jungle', '../src/assets/jungle.jpg');
        this.load.image('card-pack', '../src/assets/card-pack.bmp');
        this.load.image('card-hand', '../src/assets/card-hand.bmp');
    }

    create() {
        var gWidth = this.game.canvas.width;
        var gHeight = this.game.canvas.height;
        
        //this.add.image(gWidth/2, gHeight/4*3, 'jungle').setScale(window.GAME_SCALE, window.GAME_SCALE);

        /* game object layers */
        this.playZone = new PlayZone({
            x:gWidth/2, 
            y:gHeight/2, 
            displayWidth:gWidth*0.8, 
            displayHeight:gHeight/2
        });

        let myPack = new CardPack(0, 0, {image: "card-pack"}, false);
        let myPack_x = gWidth - (myPack.displayWidth/2) - 10; // ceva margin --> ||
        let myPack_y = gHeight - (myPack.displayHeight/2) - 10; // ceva margin --> _
        myPack.setPosition(myPack_x, myPack_y);
        this.add.existing(myPack);

        let myHand = new CardHand(0, 0, {image: "card-hand"}, false);
        let myHand_x = gWidth/2; // --> -|-
        let myHand_y = gHeight - (myHand.displayHeight/2) - 10; // ceva margin --> -_-
        myHand.setPosition(myHand_x, myHand_y);
        this.add.existing(myHand);
        
        myPack._.addCards([
            {id:1, name: 'Sconx', image:'c2', attack:17, revealed:false, isMyCard:true, isPlayed:false},
            {id:2, name: 'Sconx', image:'c2', attack:17, revealed:false, isMyCard:true, isPlayed:false},
            {id:3, name: 'Sconx', image:'c2', attack:17, revealed:false, isMyCard:true, isPlayed:false},
            {id:4, name: 'Sconx', image:'c2', attack:17, revealed:false, isMyCard:true, isPlayed:false},
            {id:5, name: 'Sconx', image:'c2', attack:17, revealed:false, isMyCard:true, isPlayed:false}
        ]);

        myHand._.addCards([
            {id:6, name: 'Sconx', image:'c2', attack:17, revealed:true, isMyCard:true, isPlayed:false},
            {id:7, name: 'Sconx', image:'c2', attack:17, revealed:true, isMyCard:true, isPlayed:false},
            {id:8, name: 'Sconx', image:'c2', attack:17, revealed:true, isMyCard:true, isPlayed:false},
            {id:9, name: 'Sconx', image:'c2', attack:17, revealed:true, isMyCard:true, isPlayed:false},
            {id:10, name: 'Sconx', image:'c2', attack:17, revealed:true, isMyCard:true, isPlayed:false}
        ]);

        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id:6},
        });

        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id:7},
        });

        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id:8},
        });

        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id:9},
        });

        AnimationDispatcher.dispatch({
            type: "stateChanged",
            name: "Playable.normal",
            newState: true,
            target: {id:10},
        });
/*
        this.player = Player.create({scene:this});
        this.enemyPlayer = Player.create({scene:this});

        var yourCamp = new Camp({
            scene:this, 
            displayWidth:gWidth*0.8, 
            x:gWidth/2, 
            y:zone.y + zone.displayHeight/4, 
            cards:[]
        });

        var yourHand = new Hand({scene:this, image:'hand', cards:[]});
            yourHand.x = gWidth/2;
            yourHand.y = gHeight - yourHand.displayHeight/2;

        var yourPack = new Pack({scene:this, image:'pack', cards:this.data.player.pack});
            yourPack.x = gWidth - yourPack.displayWidth/2;
            yourPack.y = gHeight - yourPack.displayHeight/2;
            yourPack.arrangeCards();

        this.player.addPack(yourPack).addHand(yourHand).addCamp(yourCamp);

        this.helpers.packToHandDealer.dealCards(this.player.pack, this.player.hand, this.data.player.pulled);
        
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            if (gameObject.state != 'inHand' && gameObject.state != 'dragging') return;
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.$event.on('cardPlayed', (data) => {
            this.helpers.handToCampDealer.playCard(data.player.hand, data.player.camp, data.card);
        })

        this.socket.on('attack', ({attacker, attacked, result, subattacks}) => {
            //attacker = Card.find(attacker)
            this.helpers.attacksDispatcher.dispatch(attacker, attacked);
        })

        this.socket.on('cardPlayed', ({player, card}) => {
            this.helpers.handToCampDealer.playCard(player, card);
        })
        */
    }
    
    update() {

    }

    render() {
        
    }
}