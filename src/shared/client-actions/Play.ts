import IClientAction from "../IClientAction";
import Card from "../../server/app/Card";

export default ClientAction;

namespace ClientAction
{
	export class Play
	{
		public static normal(card:Card): Array<IClientAction>
		{
            return [
            	new ClientAction(ClientAction.Type.NORMAL_PLAY, card, card, card, card);
            ];
		}
	}
}