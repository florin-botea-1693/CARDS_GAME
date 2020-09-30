import PlayCardEvent from "../events/PlayCardEvent";

export default function PlayCard(ev:PlayCardEvent, cb:() => void) 
{
    let duration = 300;

    ev.card._.setState("playable", false);
    ev.card._.setState("played", true);
    window.scene.tweens.add({
        targets: ev.card,
        x: { from: ev.card.x, to: ev.card.x + 1 },
        ease: 'Linear',
        duration: duration,
        yoyo: false,
        onComplete: function() {
            ev.card._.placeDown();
            cb();
        }
    });
    window.scene.tweens.add({ // riseUp -> placeDown
        targets: ev.card._.getImage(),
        scale: { from: ev.card._.getImage().scale, to: window.GAME_SCALE + (window.GAME_SCALE*20/100) },
        ease: 'Linear',
        duration: duration/2,
        yoyo: true,
    });
}