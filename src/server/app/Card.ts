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

    public attack(card:Card): void
    {
        if (!this.isActive()) {
            throw new Error("Card is not playable");
        }

        let modifiers:Array<IModifier.Modifier> = [];
        modifiers.concat(
            Card.getModifiers(this.player.getOpponent().getCardsOnTable(), IModifier.TriggerBy.ENEMY_CARD, IModifier.TriggerOn.CARD_ATTACK),
            Card.getModifiers(this.player.getCardsOnTable(), IModifier.TriggerBy.ALLY_CARD, IModifier.TriggerOn.CARD_ATTACK),
        );
        
        modifiers.forEach((m) => {
            if (m.moment != IModifier.TriggerMoment.BEFORE) return;
            m.perform(this);
        });

        // attack action here

        modifiers.forEach((m) => {
            if (m.moment != IModifier.TriggerMoment.AFTER) return;
            m.perform(this);
        });
    }

    // public abstract play(): void;
    /*
    private executeSceneModifierIf(m:IModifier.SceneModifier, triggeredBy:IModifier.TriggerBy, triggeredOn:IModifier.TriggerOn, moment:IModifier.TriggerMoment): void
    {
        if (m.triggeredBy == triggeredBy && m.triggeredOn == triggeredOn && m.moment == moment)
        {
            m.perform(this);
        }
    }

    private executeSelfModifierIf(m:IModifier.SelfModifier, triggeredOn:IModifier.TriggerOn, moment:IModifier.TriggerMoment): void
    {
        if (m.triggeredOn == triggeredOn && m.moment == moment)
        {
            m.perform();
        }
    }

    private beforePlay(): void
    {

    }

    private executeWrapped(f:Function, on:IModifier.TriggerOn): void
    {
        let allyCards = this.getPlayer().getCardsOnTable();
        let enemyCards = this.getPlayer().getOpponent().getCardsOnTable();

        // modificatori aliati
        allyCards.forEach(card => card.sceneModifiers.forEach(m => {
            this.executeSceneModifierIf(m, IModifier.TriggerBy.ALLY_CARD, on, IModifier.TriggerMoment.BEFORE);
        }));
        // modificatori proprii
        this.selfModifiers.forEach(m => {
            this.executeSelfModifierIf(m, on, IModifier.TriggerMoment.BEFORE)
        });
        // modificatori inamici
        enemyCards.forEach(card => card.sceneModifiers.forEach(m => {
            this.executeSceneModifierIf(m, IModifier.TriggerBy.ENEMY_CARD, on, IModifier.TriggerMoment.BEFORE);
        }));

        f();

        // modificatori aliati
        allyCards.forEach(card => card.sceneModifiers.forEach(m => {
            this.executeSceneModifierIf(m, IModifier.TriggerBy.ALLY_CARD, on, IModifier.TriggerMoment.AFTER);
        }));
        // modificatori proprii
        this.selfModifiers.forEach(m => {
            this.executeSelfModifierIf(m, on, IModifier.TriggerMoment.AFTER)
        });
        // modificatori inamici
        enemyCards.forEach(card => card.sceneModifiers.forEach(m => {
            this.executeSceneModifierIf(m, IModifier.TriggerBy.ENEMY_CARD, on, IModifier.TriggerMoment.AFTER);
        }));
    }
    */
}