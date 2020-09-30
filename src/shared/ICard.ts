export default ICard;  

namespace ICard {
    export interface Data 
    {
        location: string;
        isPlayable: boolean;
    
        id: number;
        cardId: number;
        name: string;
        image: string;
        attack: number;
    }
    
    export enum PlayMode
    {
        NORMAL
    }
}
