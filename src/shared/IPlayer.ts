import ICard from "./ICard";

export default IPlayer;

namespace IPlayer
{
    export interface Data
    {
        id: string;
        cards: Array<ICard.Data>;
    }
}