import Card from "../Card";
import CardActionMembers from "./CardActionMembers";
import IModifier from "../../../shared/IModifier";
import IClientAction from "../../../shared/IClientAction";
import ClientAction from "../../../shared/client-actions/CardState";

export default abstract class CardAction
{
    protected clientActions: Array<IClientAction> = [];
    protected actionMembers: CardActionMembers;
    
    protected partyCards: Array<Card>;
    protected enemyCards: Array<Card>;
    // vor fi sortati dupa indexExecutie
    protected partyModifiersBefore: Array<IModifier.Modifier>;
    protected partyModifiersAfter: Array<IModifier.Modifier>;
    protected enemyModifiersBefore: Array<IModifier.Modifier>;
    protected enemyModifiersAfter: Array<IModifier.Modifier>;

    public getClientActions() {
        return this.clientActions;
    }
    
    protected before(): void
	{
		let sortedModifiers = this.partyModifiersBefore.concat(this.enemyModifiersBefore).sort(m => m.executionIndex);
        let actions = sortedModifiers.map(m => m.perform(this.actionMembers));
        this.clientActions = actions.flat(Infinity);
	}

    protected after(): void
	{
		let sortedModifiers = this.partyModifiersAfter.concat(this.enemyModifiersAfter).sort(m => m.executionIndex);
        let actions = sortedModifiers.map(m => m.perform(this.actionMembers));
        this.clientActions = this.clientActions.concat(actions.flat(Infinity));
	}
	
	protected evalStates(): void
	{
		let states = this.partyCards.concat(this.enemyCards).map(c => ClientAction.CardState.evaluate(c));
        this.clientActions = this.clientActions.concat(states.flat(Infinity));
	}
}