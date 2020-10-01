import IClientAction from "../IClientAction";
import Card from "../../server/app/Card";

export default ClientAction;

namespace ClientAction
{
	export class CardState
	{
		public static evaluate(card:Card): Array<IClientAction>
		{
            return [
                {

                }
            ];
		}
	}
}