// Redux is popular and quality state container in React 
// provides good basis for implementing the MVI architecture
// Redux API :
// createStore(reducer, initialState) : the function used to create a new store, which is 
   // the container for our app state
// to create a store the programmer supplies a reducer function and the initial store state
// getState : returns the current app state from within the store
// Actions = intent  and shoul be objects
// dispacth : sends an action to the store to be applied to the current state
   // the action is processed by the reducer function which builds a new application state
// subscribe : registers a callback to be called when the application state held within the store changes


import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

let model = {
   running : false,
   time : 110
};

let view = (m) => {
   let minutes = Math.floor(m.time / 60);  
   let seconds = m.time - (minutes * 60);
   let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
   let handler = (event) => {
       container.dispatch(m.running ? {type : 'STOP'} : {type : 'START'});
    };

   return <div>
     <p>{minutes}:{secondsFormatted}</p>
     <button onClick={handler}> {m.running ? 'Stop' : 'Start'} </button>
    </div>
};


const update = (model = {running:false, time:0}, action) => {

    const updates = {
       'START' : (model) => Object.assign(model, {running:true}),
       'STOP' : (model) => Object.assign(model, {running:false}),
       'TICK' : (model) => Object.assign(model, {time: model.time +(model.running ? 1 : 0)})
    };

    return (updates[action.type] || (() => model))(model);
};


let container = Redux.createStore(update);

const render = () => {
   ReactDOM.render(view(container.getState()), document.getElementById('root'));
}

container.subscribe(render);

let intents = {
    TICK : "TICK",
    START : "START",
    STOP : "STOP",
    RESET : "RESET"
}; 

render();

setInterval(() => {
 container.dispatch({type:'TICK'});
}, 1000);
