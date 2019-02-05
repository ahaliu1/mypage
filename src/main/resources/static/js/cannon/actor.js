/**
 * @constructor
 * @param {props} An object containing properties for the actor
 */
function Actor(props) {
    this.parent = null; //Set in the game.addActor method
    //TODO add additional properties for each eactor
    this.height = props.height;
    this.width = props.width;
    this.x = props.x;
    this.y = props.y;
    this.img = props.img;
};

/**
 * Sets the FSM for the particular actor.
 * @param {Object} FSM object as detailed in the instructions
 */
Actor.prototype.setFSM = function (startState, fsm) {
    this.states = fsm;
    this.currentState = fsm[startState];
}

/**
 * Recieves an event from dispatch and transitions the FSM appropriately
 * @param {Event} The event object recieved, which includes certain information
 *  depending on the event type
 * @return {boolean} True if the event was consumed by the actor, false if it
 *  was not consumed
 */
Actor.prototype.deliverEvent = function (event, game) {
    //TODO
    if (this.currentState[event.type] != null) {
        switch (event.type) {
            case "mousedown":
                if (event.offsetX <= this.x + this.width && event.offsetX >= this.x
                    && event.offsetY <= this.y + this.height && event.offsetY >= this.y) {


                    //move to the center
                    event.offsetX = event.offsetX - this.width / 2;
                    event.offsetY = event.offsetY - this.height / 2;

                    //getDragFocus
                    this.currentState[event.type].actions[0].func(event, event.type, this);

                    //转换状态
                    this.makeTransition(event, event.type);
                    return true;
                }
            case "dragmove":

                //move to the center
                event.offsetX = event.offsetX - this.width / 2;
                event.offsetY = event.offsetY - this.height / 2;

                //followeventposition
                this.currentState[event.type].actions[0].func(event, event.type, this, game);

                this.makeTransition(event, event.type);
                return true;
            case "dragend":
                //drap dragfocus
                this.currentState[event.type].actions[0].func(event, event.type, this);

                //
                this.makeTransition(event, event.type);

                return true;
            case "buttonpress":
                //changeimg
                this.currentState[event.type].actions[0].func(event, this.currentState[event.type].actions[0].params, this);
                this.draw(this.context);


                var params = this.currentState[event.type].actions[1].params;


                game.newAnimation(params.movingActor, params.targetActor, params.endMessage, params.passOverMessage, params.duration);

                this.makeTransition(event, event.type);
                return true;

            case "animstart":
                //changeimg
                this.currentState[event.type].actions[0].func(event, this.currentState[event.type].actions[0].params, this);
                this.draw(this.context);
                this.makeTransition(event, event.type);
                return true;
            case"animmove":
                //followeventposition
                this.currentState[event.type].actions[0].func(event, event.type, this, game);

                this.makeTransition(event, event.type);
                return true;
            case "animend":
                //followeventposition
                this.currentState[event.type].actions[0].func(event, event.type, this, game);

                //change img
                this.currentState[event.type].actions[1].func(event, this.currentState[event.type].actions[1].params, this);


                //moveto go back to cannon
                this.currentState[event.type].actions[2].func(event, this.currentState[event.type].actions[2].params, this);

                game.clear();
                game.onDraw(this.context);
                this.makeTransition(event, event.type);
                return true;
            case "message":
                //changeimg
                this.currentState[event.type].actions[0].func(event, this.currentState[event.type].actions[0].params, this);

                //add score
                this.currentState[event.type].actions[1].func(event, event.type, this);

                game.clear();
                game.onDraw(this.context);


                //"tick" dispatch tick message
                var recordTick = this.currentState[event.type].actions[2];


                this.makeTransition(event, event.type);
                recordTick.func(event, event.type, this);

                return true;
            case"tick":
                //changeimg
                this.currentState[event.type].actions[0].func(event, this.currentState[event.type].actions[0].params, this);

                //reset position
                this.currentState[event.type].actions[1].func(event, event.type, this);


                this.makeTransition(event, event.type);
                return true;
        }
    }
    return false;
}


/**
 * Transitions the FMS for a particular transition and event
 * @param {Event} event object recieved, which includes certain information
 *  depending on the event type
 */
Actor.prototype.makeTransition = function (event, transition) {
    //TODO

    this.currentState = this.states[this.currentState[event.type].endState];
}

/**
 * Draws the actor on the canvas based on its parameters
 * @param {Context} The HTML5 canvas context object to be drawn on.
 */
Actor.prototype.draw = function (context) {
    //TODO
    this.context = context;
    if (this.img != null) {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

Actor.prototype.clear = function (context) {
    //TODO
    context.clearRect(this.x, this.y, this.width, this.height);

}