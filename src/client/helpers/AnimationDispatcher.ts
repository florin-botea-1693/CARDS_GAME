import Attack from "./Attack";
import CardPick from "./CardPick";
import CardPlay from "./CardPlay";
import Playable from "./Playable";

export default class AnimationDispatcher
{
    public static dispatch(ev: any) {
        console.log(ev);
        let tmp = ev.name.split(".");
        let c: string = tmp[0];
        let m: string = tmp[1];

        switch (c) {
            case "Attack":
                Attack.perform(m, ev);
                break;
            case "CardPick":
                CardPick.perform(m, ev);
                break;
            case "CardPlay":
                CardPlay.perform(m, ev);
                break;
            case "Playable":
                Playable.perform(m, ev);
                break;
        }
    }
}