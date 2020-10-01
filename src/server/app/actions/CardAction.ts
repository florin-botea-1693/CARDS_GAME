export default abstract class CardAction
{
	private actionMembers: CardActionMembers; // src - target
	// va merge si in caz de atac, pt ca sunt doar modifiers... si pot fi setati in ctrctor
	protected after(): void
	{
		let sortedModifiers = this.partyModifiersAfter.concat(this.enemyModifiersAfter).sort(m => m.index);
        let actions = sortedModifiers.map(m => m.perform(this.actionMembers));
        this.clientActions = this.clientActions.concat(actions.flat(Infinity));
	}
	
	protected before(): void
	{
		let sortedModifiers = this.partyModifiersBefore.concat(this.enemyModifiersBefore).sort(m => m.index);
        let actions = sortedModifiers.map(m => m.perform(this.actionMembers));
        this.clientActions = actions.flat(Infinity);
	}
	
	protected evalStates(): void
	{
		let states = this.partyCards.concat(this.enemyCards).map(c => ClientAction.CardState.evaluate(c));
        this.clientActions = this.clientActions.concat(states.flat(Infinity));
	}
}