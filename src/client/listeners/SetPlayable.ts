import SetPlayableEvent from "../events/SetPlayableEvent";

export default function SetPlayable(ev:SetPlayableEvent, cb:() => void) {
    ev.card._.setPlayable(ev.newState);
}