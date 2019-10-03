// React-redux is an extra module that helps with the integration of React and Redux
// main service : connect React components to the application state
// can provide data from the Redux store to components when the component is rendered and 
// it can provide a way for components to publish actions that can then be used to modify the Redux store
// Provider : is a react COMPONENT provided by React-redux
   // When it is included in a React application, it enables all React components below it in the component tree,
   // that is its children or children's children to connect to the Redux store 
// connect : FUNCTION provided by React-redux that enhances React components connecting them to the Redux Store
   // in the ways specified
   // mapStateToProps : to specify what data from the Redux store should be provided to the React component
                      // as props, connect expects a parameter called mapStateToProps
                      // mapStateToProps is a function from the Redux store to a set of props for the component
                      // took care of getting data from the store to the component
   // mapDispatchTopProps : is a function that takes care of specifying 
                      // how the component can send actions to the Redux store
                      // provides a place to map component events to Redux store actions

// we will use react-redux to decouple react components from our Redux store

import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

let model = {
   running : false,
   time : 110
};

// reducer function
const update = (model = {running:false, time:0}, action) => {
// React redux makes a performance optimization where before re-rendering the app
// it firstly checks if the app state has changed at all
// it does that by a reference equality check
// Because this update function mutates the existing model object,
// React-redux doesn't see that as a change to the app state, because it's still the same object
// So, what we need to do is make sure that reducer function always returns a new object
// if the app state has changed, and I can do it just providing an empty object
    const updates = {
       'START' : (model) => Object.assign({}, model, {running:true}),
       'STOP' : (model) => Object.assign({}, model, {running:false}),
       'TICK' : (model) => Object.assign({}, model, {time: model.time +(model.running ? 1 : 0)})
    };

    return (updates[action.type] || (() => model))(model);
};

function mapStateToProps(state){
    // we need to think about what transformation we need from the Redux store to props for our component
    // for this app, the answer is no transformation at all
    return state;
}

function mapDispatchToProps(dispatch){
    // need to be able to modify the store
    return {
        onStart: () => { dispatch ({type: 'START'}); },
        onStop: () => { dispatch ({type: 'STOP'}); }
    };
}

// connect returns a function, and that function takes the react component as an argument,
// because view is a React component we changed it with Stopwatch
// only dependency of this component is props
// mapping of those props to the Redux state is done via the React-redux connect function and 
// the mapStateToProps, mapDispatchToProps functions
let Stopwatch = ReactRedux.connect(mapStateToProps, mapDispatchToProps) ((props) => {
   let minutes = Math.floor(props.time / 60);  
   let seconds = props.time - (minutes * 60);
   let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;

   return <div>
     <p>{minutes}:{secondsFormatted}</p>
     <button onClick={props.running ? props.onStop : props.onStart}> {props.running ? 'Stop' : 'Start'} </button>
    </div>
});

let container = Redux.createStore(update);

// Provider makes the react store available
// Now react redux will take care of re-rendering our application when the state changes 
// When the Stopwatch component renders, its data supplied by the React-redux provider
// mapping the store to the component via the mapStateToProps function
ReactDOM.render(
<ReactRedux.Provider store={container}>
    <Stopwatch />
</ReactRedux.Provider>
,
document.getElementById('root'));

let intents = {
    TICK : "TICK",
    START : "START",
    STOP : "STOP",
    RESET : "RESET"
}; 

setInterval(() => {
 container.dispatch({type:'TICK'});
}, 1000);