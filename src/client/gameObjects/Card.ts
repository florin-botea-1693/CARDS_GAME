import CardSelectionManager from "../helpers/CardSelectionManager";
import AttackPointer from "../helpers/AttackPointer";
import CardHand from "./CardHand";

export default class Card extends Phaser.GameObjects.Container
{
    /* static collection */
    private static instances: any = {};
    public static getCard(id: number) {
        return Card.instances[id] ?? null;
    }
    public static addInstance(id:number, container:Card) {
        Card.instances[id] = container;
    }
    //-----------------------------------------------------

    /* phaser */
    private $h: CardHelper;
    get _() {
        return this.$h;
    }
    get helper() {
        return this.$h;
    }
    get h() {
        return this.$h;
    }

    constructor(x:number, y:number, cardData:ICard.Data, addToScene:boolean = true) {
        super(window.scene, x, y);
        this.$h = new CardHelper(this, cardData);
        if (addToScene)
            window.scene.add.existing(this);
    }
}

class CardHelper
{
    private container:Card;

    private id:number;

    private location:string = "inPack";
    private isMyCard:boolean = false;
    /* card object */
    private cover: Phaser.GameObjects.Sprite;
    private image: Phaser.GameObjects.Sprite;
    private attack: Phaser.GameObjects.Text;
    private light: Phaser.GameObjects.Sprite;
    private nimb: Phaser.GameObjects.Graphics;

    /* states */
    // private myCard:boolean;
    // private revealed:boolean;
    // private played:boolean;
    private isPlayable:boolean = false;
    private inHand:CardHand|null = null;

    /* animations */
    private activeTweens: {riseUp:any, placeDown: any} = {
        riseUp: null,
        placeDown: null
    };


    //======================================================================================================||
    // GETTERS
    //======================================================================================================||
    public getContainer() {
        return this.container;
    }
    public isRevealed() {
        return (this.isMyCard && this.location == "inHand") || this.location == "onTable";
    }
    getIsPlayed(): boolean 
    {
        return this.location == "onTable";
    }
    getIsMyCard(): boolean {
        return this.isMyCard;
    }
    getIsPlayable(): boolean {
        return this.isPlayable;
    }
    public getLight() {
        return this.light;
    }
    public getCover() {
        return this.cover;
    }
    public getImage() {
        return this.image;
    }
    public getNimb() {
        return this.nimb;
    }
    public getHand():CardHand|null {
        return this.inHand;
    }

    public getBodyWidthWithMargins() {
        return this.image.displayWidth + 20;
    }

    //======================================================================================================||
    // SETTERS
    //======================================================================================================||
    public setState(state:string, b:boolean) {
        console.log(state, b);
        switch(state) {
            case "played":
                // this.played = b;
                this.container.input.draggable = !b;
                break;
            case "revealed":
                // this.revealed = b;
                break;
            case "selected":
                // this.selected = b
                if (b) {
                    this.nimb.setTexture("card-outline-white");
                } else {//unselect
                    this.isPlayable ? this.nimb.setTexture("card-outline-green") : this.nimb.alpha = 0;
                }
                //this.nimb.alpha = b ? 1 : 0;
                break;
            case "playable":
                this.isPlayable = b;
                this.nimb.alpha = b ? 1 : 0;
                this.container.input.draggable = !this.getIsPlayed() && b;
                break;
        }
    }
    public setIsPlayable(b:boolean): void
    {
        this.isPlayable = b;
        this.nimb.alpha = b ? 1 : 0;
        this.container.input.draggable = !this.getIsPlayed() && b;
    }
    public setIsSelected(b:boolean): void
    {
        b ? this.nimb.setTexture("card-outline-white") :
            (this.isPlayable ? this.nimb.setTexture("card-outline-green") : this.nimb.alpha = 0);
    }
    public setLocation(s:string): void
    {
        this.location = s;
        switch (s) {
            case "onTable":
                this.container.input.draggable = false;
                break;
        }
    }

    public setInHand(hand:CardHand):void {
        this.inHand = hand;
    }


    //======================================================================================================||
    // CONSTRUCTOR
    //======================================================================================================||
    constructor(container:Card, data:ICard.Data) 
    {
        // data -> to -> this
        let scene = window.scene;
        this.container = container;
        this.id = data.id;
        this.location = data.location;
        this.isPlayable = data.isPlayable;
        this.isMyCard = data.isMyCard;

        // this.components
        this.nimb = scene.add.sprite(0, 0, 'card-outline-green')
            .setScale(window.GAME_SCALE, window.GAME_SCALE)
            .setDepth(1);
            this.nimb.alpha = this.isPlayable ? 1 : 0;

        this.cover = scene.add.sprite(0, 0, 'card-back')
            .setScale(window.GAME_SCALE, window.GAME_SCALE);

        this.image = scene.add.sprite(0, 0, data.image)
            .setScale(window.GAME_SCALE, window.GAME_SCALE)
            .setDepth(2);

        this.attack = scene.add.text(0, 0, data.attack)
            .setFontSize(18)
            .setColor('#00ffff');

        this.light = scene.add.sprite(0, 0, 'white')
            .setScale(window.GAME_SCALE, window.GAME_SCALE);

        this.cover.alpha = this.isRevealed() ? 0 : 1;
        this.image.alpha = this.isRevealed() ? 1 : 0;
        this.light.alpha = 0;
        this.attack.alpha = 0;

        this.container.add([this.cover, this.image, this.attack, this.light, this.nimb]);
        this.container.sort("depth");

        Card.addInstance(data.id, this.container);

        this.addBehaviours();
    }

    //======================================================================================================||
    // INTERACTIONS
    //======================================================================================================||
    private addBehaviours(): void
    {
        let scene = window.scene;
        this.container.setSize(this.image.displayWidth, this.image.displayHeight).setInteractive();
        this.container.input.hitArea.setSize(this.image.displayWidth, this.image.displayHeight);
        scene.input.setDraggable(this.container);
        this.container.input.draggable = this.isMyCard && this.isPlayable;

        this.container.on('dragstart', (pointer: any, gameObject: any) => {
            console.log("dragstart");
            // selected card = null
            if (!this.isPlayable) return;
            scene.children.bringToTop(this.container);
            //this.container.setState('dragging');
            this.riseUp();
        });

        /* drop || play */
        this.container.on('dragend', (pointer: any, x: number, y: number, dropped: boolean) => {
            console.log("dragend");
            if (!dropped) {
                if (this.activeTweens.riseUp != null) {
                    this.activeTweens.riseUp.stop();
                }
                this.image.scale = window.GAME_SCALE;
                this.nimb.alpha = this.isPlayable ? 1 : 0;
                if (this.inHand) {
                    this.inHand._.arrangeCards();
                }
                //this.container.setState('inHand');
                //this.scene.$event.emit('cardDropped', this);
                return;
            }
            console.log({"cardPlayed":this, "fromHand":this.inHand});
            this.setLocation("onTable");
            if (this.inHand) {
                this.inHand._.removeCard(this.container);
                this.inHand._.arrangeCards();
                this.inHand = null;
            }
            window.socket.emit("card/play", {cardId:this.id});
            //this.placeDown(); place down doar daca avem confirmare de la server de play!!!
        });

        /* select || unselect card */
        this.container.on('pointerdown', (a:any,b:any,c:any,d:any,e:any,f:any,g:any) => {
            console.log({a,b,c,d,e,f,g})
            console.log("pointerdown");
            if (this.getIsPlayed()) { // || this.staticPlayable
                CardSelectionManager.selectCard(this.container);
            }
        });

        /* hover card */
        this.container.on('pointerover', () => {
            // 1 show card description if is revealed
            // 2 show target pointer if has selected and target is played
            if (CardSelectionManager.getSelected() && CardSelectionManager.getSelected() != this.container && this.getIsPlayed()) {
                AttackPointer.pointer(CardSelectionManager.getSelected(), this.container);
            }
        });

        /* hover out of card */
        this.container.on('pointerout', () => {
            AttackPointer.clearPointer();
        });

        scene.input.on('drag', function (pointer:any, gameObject: any, dragX: number, dragY: number) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }

    //======================================================================================================||
    // HELPERS
    //======================================================================================================||
    public riseUp() {
        this.nimb.alpha = 0;
        window.scene.children.bringToTop(this);
        this.activeTweens.riseUp = window.scene.tweens.add({
            targets: this.image,
            scale: { from: this.image.scale, to: window.GAME_SCALE + (window.GAME_SCALE*20/100) },
            ease: 'Linear',
            duration: 200,
            yoyo: false
        });
    }

    public placeDown() {
        this.activeTweens.placeDown = window.scene.tweens.add({
            targets: this.image,
            scale: { from: this.image.scale, to: window.GAME_SCALE },
            ease: 'Linear',
            duration: 200,
            yoyo: false,
        });
    }
}