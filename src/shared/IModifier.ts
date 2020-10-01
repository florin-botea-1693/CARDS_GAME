import Card from "../server/app/Card";
import IClientAction from "./IClientAction";
import CardActionMembers from "../server/app/actions/CardActionMembers";

export default IModifier;

namespace IModifier
{
    export interface Modifier
    {
        source: Card;
        triggeredBy: IModifier.TriggerBy;
        triggeredOn: IModifier.TriggerOn;
        triggerMoment: IModifier.TriggerMoment;
        perform: IModifier.PerformModifier;
        executionIndex: number;
    }

    export interface PerformModifier
    {
        (members:CardActionMembers): Array<IClientAction>;
    }

    export enum TriggerBy
    {
        ALLY_CARD,
        ENEMY_CARD,
        SELF
    }

    export enum TriggerOn
    {
        CARD_PLAY,
        CARD_DROP,
        CARD_ATTACK
    }

    export enum TriggerMoment
    {
        BEFORE,
        AFTER
    }
}