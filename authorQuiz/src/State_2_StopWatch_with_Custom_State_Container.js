import React from 'react';
import ReactDOM from 'react-dom';

let model = {
   running : false,
   time : 110
};

let view = (m) => {
   let minutes = Math.floor(m.time / 60);  
   let seconds = m.time - (minutes * 60);
   let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
   let handler = (event) => {
       container.dispatch(m.running ? 'STOP' : 'START');
    };

   return <div>
     <p>{minutes}:{secondsFormatted}</p>
     <button onClick={handler}> {m.running ? 'Stop' : 'Start'} </button>
    </div>
};

const createStore = (reducer) => {
   let internalState= {
            running : false,
            time : 110
        };
   let handlers = [];
   return {
       // the reducer returns the new state
      dispatch: (intent) => {
          internalState = reducer(internalState, intent);
          handlers.forEach(h => { h(); });
      },
      subscribe: (handler) => {
          handlers.push(handler);
      },
      getState: () => internalState
   };
};


const update = (model = {running:false, time:0}, intent) => {

    const updates = {
       'START' : (model) => Object.assign(model, {running:true}),
       'STOP' : (model) => Object.assign(model, {running:false}),
       'TICK' : (model) => Object.assign(model, {time: model.time +(model.running ? 1 : 0)})
    };

    return (updates[intent] || (() => model))(model);
};

// to be able to create that container, because it needs to apply intents to our model,
// that createStore function is going to need the update function
let container = createStore(update);

const render = () => {
   ReactDOM.render(view(container.getState()), document.getElementById('root'));
}

// subscribe a callback function to be called when the model changes
// everytime my application state changes,
// I want to call the render function to rerender UI from the current model and update the DOM
// the change on the model triggers the subscribe callback handler
container.subscribe(render);

let intents = {
    TICK : "TICK",
    START : "START",
    STOP : "STOP",
    RESET : "RESET"
}; 

render();

setInterval(() => {
 container.dispatch('TICK');
}, 1000);


