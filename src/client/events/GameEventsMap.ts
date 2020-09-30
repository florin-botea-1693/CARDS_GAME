import PlayCard from "../listeners/PlayCard";
import PlayCardEvent from "./PlayCardEvent";
import SetPlayableEvent from "./SetPlayableEvent";
import SetPlayable from "../listeners/SetPlayable";

export default {
    cardPlayed: {
        event: PlayCardEvent,
        handler: PlayCard
    },
    setPlayable: {
        event: SetPlayableEvent,
        handler: SetPlayable
    }
}