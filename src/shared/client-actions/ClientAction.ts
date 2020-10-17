export class ClientAction
{
    public type:ClientAction.Type;
    public data:any;

    constructor(type:ClientAction.Type, data:any)
    {
        this.type = type;
        this.data = data;
    }
    // public final type: ClientAction.Type;
    // public final actionHolder: ICard.Data;
    // public final actionReceiver: ICard.Data;
    // public final result: IClientActionResult;
}

export namespace ClientAction
{
    export enum Type
    {
        CARD_PLAYED
    }
}