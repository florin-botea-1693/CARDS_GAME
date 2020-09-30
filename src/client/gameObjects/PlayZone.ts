import Card from './Card';

export default class PlayZone extends Phaser.GameObjects.Zone 
{
    private $h:DropZoneHelper;
    get _() {
        return this.$h;
    }

    constructor(config: {x:number, y:number, displayWidth:number, displayHeight:number}) {
        super(window.scene, config.x, config.y, config.displayWidth, config.displayHeight);
        let scene = window.scene;

        this.setRectangleDropZone(config.displayWidth, config.displayHeight);
        
        this.$h = new DropZoneHelper(this);

        scene.add.existing(this);

        //scene.socket.on('cardPlayed', function(card:Card) {
            // 2) il anunt acum...
        //})

        scene.input.on('drop', (pointer:any, card:Card, dropZone:Phaser.GameObjects.Zone) => {
            console.log({"cardPlayed": card});
            //if (gameObject.name != 'card' || gameObject.state != 'dragging') return;
            //window.scene.$event.emit('cardPlayed', {player:config.scene.player, card:gameObject});
            //window.scene.socket.emit('cardPlayed', gameObject.getData('card'));
        })
    }
}

class DropZoneHelper
{
    private zone:PlayZone;

    private border:any;

    constructor(dropZoneGO:PlayZone) {
        this.zone = dropZoneGO;

        let border = window.scene.add.graphics();
            border.lineStyle(4, 0xff69b4);
            border.strokeRect(
                dropZoneGO.x - dropZoneGO.displayWidth / 2,
                dropZoneGO.y - dropZoneGO.displayHeight / 2,
                dropZoneGO.displayWidth, dropZoneGO.displayHeight
            );
        this.border = border;
    }
}