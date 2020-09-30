import GameEventsMap from "./events/GameEventsMap";

let eventsMap = (GameEventsMap as {[key: string]: any});

export default class EventsDispatcher
{
    /**
     * @prop eventsPool - events that are not executed because of page not loaded/object not loaded
     */
    private eventsPool:Array<any> = [];
    private isLinearExecutingEvent:boolean = false;

    constructor() {

    }

    public dispatch(event:{name:string, linear:boolean}) { // un singur event
        let self = this;
        // if not loaded, add to pool and set timeout foreach in pool
        if (this.isLinearExecutingEvent) {
            // daca actualul eveniment este in executare si nu accepta un alt eveniment peste
            this.eventsPool.push(event);
            return;
        }
        this.isLinearExecutingEvent = event.linear;
        if (this.isLinearExecutingEvent) {
            eventsMap[event.name].handler(new eventsMap[event.name].event(event), function() 
                {
                    self.isLinearExecutingEvent = false;
                    if (self.eventsPool[0]) {
                        self.dispatch(self.eventsPool[0]);
                        self.eventsPool.shift(); // remove event from pool
                    }
                }
            );
        } else {
            eventsMap[event.name].handler(new eventsMap[event.name].event(event), function() {});
        }
    }
}