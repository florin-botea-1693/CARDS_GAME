import Card from './Card';
import ICardData from './ICardData';

export default class CardHand extends Phaser.GameObjects.Image 
{
    private $h:CardHandHelper;
    get _() {
        return this.$h;
    }

    constructor(x:number, y:number, config:{image:string}, addToScene:boolean = true) {
        super(window.scene, x, y, config.image);

        this.$h = new CardHandHelper(this);

        if (addToScene)
            window.scene.add.existing(this);
    }
}

class CardHandHelper
{
    private image:CardHand;

    private cards:Phaser.GameObjects.Group;

    constructor(image:CardHand) {
        let scene = window.scene;
        this.image = image;
        this.image.setScale(window.GAME_SCALE, window.GAME_SCALE);

        this.cards = scene.add.group();
    }

    public addCards(cardsData:Array<ICardData>):void {
        let leftEdgeCardX = this.image.x - this.image.displayWidth/2; // |<--
        let cardsDistance = this.image.displayWidth/(cardsData.length-1); // || || ||
        for (let i=0; i<cardsData.length; i++) {
            let card = new Card(0, 0, cardsData[i], false);
            let marginX = card._.getImage().displayWidth < cardsDistance ? card._.getImage().displayWidth : cardsDistance;
            let x = leftEdgeCardX + (card._.getImage().displayWidth/2) + (marginX * i); // -->||
            let y = this.image.y;
            card.setPosition(x, y);
            card._.setInHand(this.image);
            this.cards.add(card, true);
        }
    }

    public removeCard(card:Card, b:boolean = false) {
        this.cards.remove(card, b);
    }

    public arrangeCards():void {
        let leftEdgeCardX = this.image.x - this.image.displayWidth/2; // |<--
        let cardsArray = this.cards.getChildren();
        let cardsDistance = this.image.displayWidth/(cardsArray.length-1); // || || ||
        for (let i=0; i<cardsArray.length; i++) {
            let card = cardsArray[i] as Card;
            let marginX = card._.getImage().displayWidth < cardsDistance ? card._.getImage().displayWidth : cardsDistance;
            let x = leftEdgeCardX + (card._.getImage().displayWidth/2) + (marginX * i); // -->||
            let y = this.image.y;
            card.setPosition(x, y);
        }
        // eventual le pun si un index
    }
}