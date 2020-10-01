import User from "./User";
import Player from "./Player";
import ICard from "../../shared/ICard";
import IModifier from "../../shared/IModifier";

export default abstract class Card
{
    protected _player:Player;

    protected id:number;
    protected cardId:number;

    protected image:string;

    protected _location:string;

    protected name:string;
    protected _attack:number;

    protected _playMode:ICard.PlayMode;

    // modifiers cu efect personal
    protected _modifiers:Array<IModifier.Modifier> = [];

    public static getModifiers(cards:Array<Card>, tBy:IModifier.TriggerBy, tOn:IModifier.TriggerOn) {
        let r:Array<IModifier.Modifier> = [];
        cards.forEach(c => {
            r.concat(c.modifiers.filter(m => m.triggeredBy == tBy && m.triggeredOn == tOn));
        });
        return r;
    }

    public getId() {
        return this.id;
    }

    get player() {
        return this._player;
    }

    get location() {
        return this._location;
    }

    get playMode() {
        return this._playMode;
    }

    get modifiers(): Array<IModifier.Modifier> {
        return this._modifiers;
    }

    /**
     * check if card mana request is fullfilled
     */
    public isPlayable(): boolean
    {
        return true;
    }

    /**
     * check if played card can perform action
     */
    public isActive(): boolean
    {
        return true;
    }

    public syncIsPlayable(): void
    {
        // put some animation
    }

    public syncIsActive(): void
    {
        // some animation
    }

    public setLocation(s:string): void
    {
        this._location = s;
    }

    public toJson(): ICard.Data 
    {
        return {
            location: this.location,
            isPlayable: this.isPlayable(),
            id: this.id,
            cardId: this.cardId,
            name: this.name,
            image: this.image,
            attack: this._attack,
        }
    }
}