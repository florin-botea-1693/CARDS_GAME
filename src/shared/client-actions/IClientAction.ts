export default class ClientAction
{
    public final type: ClientAction.Type;
    public final actionHolder: ICard.Data;
    public final actionReceiver: ICard.Data;
    public final result: IClientActionResult;
}

interface IClientActionResult
{
	public final actionHolder: ICard.Data;
    public final actionReceiver: ICard.Data;
}