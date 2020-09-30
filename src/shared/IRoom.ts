import IPlayer from "./IPlayer";

export default IRoom;

namespace IRoom 
{
    export interface Data
    {
        players: Array<IPlayer.Data>;
    }
}