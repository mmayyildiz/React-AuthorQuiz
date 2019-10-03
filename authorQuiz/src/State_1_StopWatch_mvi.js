import React from 'react';
import ReactDOM from 'react-dom';
// Model-view-intent Architecture
// model-view-controller did not work well on the client side, new ideas gained popularity
// model : single object that completely describes the state of the user interface
// view : is a function that transforms the model into the user interface
// model is the input to the view function and the user interface is the output of the view function
// at any moment the user interface can be generated based on nothing but the model
// when the model changes, the view function can generate the corresponding changed user interface
// how is the model changed?
// the UI generated by the view function can produce intents.
// Intents are things the user wants to do
// user selecting an answer is an intent
// when intent is produced it is applied to the model creating an updated model
// the updated model is then passed through the view function to produce the updated user interface

// modal is the total source of truth. entire user interface is described by the model
// view produces the user interface based on nothing but the model
// model can only be changed by processing intents on the current model

// like fsm :
// model : possible states
// intents : possible transitions. transtions the model from one state to the next


let model = {
   running : false,
   time : 110
};

// const view = (model) => <div> {model.time} </div>;

let view = (model) => {
   let minutes = Math.floor(model.time / 60);  
   let seconds = model.time - (minutes * 60);
   let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
   let handler = (event) => {
       model = update(model, model.running ? 'STOP' : 'START');
    };

   return <div>
     <p>{minutes}:{secondsFormatted}</p>
     <button onClick={handler}> {model.running ? 'Stop' : 'Start'} </button>
    </div>
};

const update = (model, intent) => {

     const updates = {
        'START' : (model) => Object.assign(model, {running:true}),
        'STOP' : (model) => Object.assign(model, {running:false}),
        'TICK' : (model) => Object.assign(model, {time: model.time +(model.running ? 1 : 0)})
     };

     return updates[intent](model);
};

let intents = {
    TICK : "TICK",
    START : "START",
    STOP : "STOP",
    RESET : "RESET"
}; 

const render = () => {
   ReactDOM.render(view(model), document.getElementById('root'));
}

render();

setInterval(() => {
    model = update(model, 'TICK');
    render();
}, 1000);
