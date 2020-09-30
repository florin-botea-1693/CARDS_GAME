import Card from "../server/app/Card";

export default IModifier;

namespace IModifier
{
    export interface Modifier
    {
        source: Card;
        triggeredBy: IModifier.TriggerBy;
        triggeredOn: IModifier.TriggerOn;
        moment: IModifier.TriggerMoment;
        perform: IModifier.PerformModifier;
        executionIndex: number;
    }

    export interface PerformModifier
    {
        (triggererCard: Card): void;
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