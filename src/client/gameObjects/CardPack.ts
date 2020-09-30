import Card from './Card';

export default class CardPack extends Phaser.GameObjects.Image 
{
    private $h:CardPackHelper;
    get _() {
        return this.$h;
    }
    get helper() {
        return this.$h;
    }
    get h() {
        return this.$h;
    }

    constructor(x:number, y:number, config:{image:string}, addToScene:boolean = true) {
        super(window.scene, x, y, config.image);

        this.$h = new CardPackHelper(this);

        if (addToScene)
            window.scene.add.existing(this);
    }
}

class CardPackHelper
{
    private image:CardPack;

    private cards:Phaser.GameObjects.Group;

    constructor(image:CardPack) 
    {
        let scene = window.scene;
        this.image = image;
        this.image.setScale(window.GAME_SCALE, window.GAME_SCALE);

        this.cards = scene.add.group();
    }

    public addCards(cardsData:Array<ICard.Data>): void 
    {
        let rightMargin = this.image.x + this.image.displayWidth/2; // -->|
        for (let i=0; i<cardsData.length; i++) {
            let card = new Card(0, 0, cardsData[i], false);
            let x = rightMargin - (card._.getImage().displayWidth/2) - (i*15); // -->||
            let y = this.image.y;
            card.x = x;
            card.y = y;
            this.cards.add(card, true);
        }
    }

    public arrangeCards():void {

    }
}