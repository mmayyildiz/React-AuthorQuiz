/*Easier to read and understand
Each element is transformed into a javascript function call
Babble 
Or Typescript to compile*/


<Sum a={4} b={3} />

React.createElement(
   Sum,
   {a:4, b:3},
   null);

<h1>
<Sum a={4} b={3} />
</h1>

React.createElement(
   'h1',
   null,
   React.createElement(
   Sum,
   {a:4, b:3},
   null));

function Sum(props){
    return <h1>
         {props.a} + {props.b} =
          {props.a + props.b}
        </h1>;
}

ReactDOM.render(<Sum a={4} b={2} />, document.getElementById('root'));


function Sum(props){
    React.createElement(
        'h1', // built-in element
        null,
        props.a, ' + ', props.b, ' = ', props.a + props.b 
    );
}

ReactDOM.render(
  React.createElement(
      'div',
      null,
      React.createElement(
          Sum,
          {a:4, b:2},
          null)),
     document.getElementById('root')
);


/*
    -> JSX -> JSX Transformer -> Javascript function calls
*/


// jsx attributes become component props
// Hello : react componet name
// now : JSX attribute
// curly braces içine javascript expr ları yazılır
<Hello now={new Date().toISOString()} />

//<Hello now="Literal string value" />

// Spread Attributes
const props = {a:4, b:2}; // spreads this object
const element = <Sum {...props} />;

ReactDOM.render(element, document.getElementById('root'));

// Events

function Clicker({ handleClick }){
   return <div>
       <button onClick={(e) => {handleClick('A');}}> A </button>
       <button onClick={(e) => {handleClick('B');}}> A </button>
       <button onClick={(e) => {handleClick('C');}}> A </button>
       </div>;
}

// const el = <Clicker handleClick={(l) => {log(l);}} />;

ReactDOM.render(<Clicker handleClick={(letter) => { console.log('${letter} clicked'); }} />, 
     document.getElementById('root')
);

// React Data Flow

function ClickyButtons({numberOfButtons, onSelection}){
    const makeButton = v => <button key={v} id={v} onClick={event => 
onSelection(event.target.id)}> {v} </button>;
    return <div>
         {_.range(1, numberOfButtons + 1).map(makeButton)}
        </div>;
}

ReactDOM.render(<ClickyButtons numberOfButtons={99} onSelection={console.log}/>,
    document.getElementById('root')
);


// Unescaping content 
// React escapes content by default. because,react default behavior to encode output, we end up seeing is the actual HTML.
// unescaped content means content that is not encoded to prevent cross site scripting attacks

// should avoid using this unless absolutely necassary
<div dangerouslySetInnerHTML = {{__html="<p>foo</p>"}}/>


function DangerContainer(props) {
  //  return <p>{props.dangerous} </p>; // <strong>HELLO</strong>
    // this tells react that that content should not be escaped and in turn that means that the output is 
    // correctly formatted
    // this is safe but may not be what we want
    return <p dangerouslySetInnerHTML={{__html:props.dangerous}} />; // HELLO

}

ReactDOM.render(<DangerContainer dangerous="<strong>HELLO</strong>" />,
    document.getElementById('root')
);

// Child Expressions and Elements
// JSX elements can be nested

function Sum({a, b}) {
    return <h1>{a} + {b} = {a + b} </h1>;
}

function ConditionalDisplay(props){
    return (<div>
     {props.isVisible ? props.children : null}
    </div>);
}

ConditionalDisplay.protoTypes = {
    isVisible : PropTypes.bool.isRequired
};

const state = {
    showSum : true
};

function render(){
   ReactDOM.render(<ConditionalDisplay isVisible={state.showSum}>
                    <h1> A <span>Sum</span> </h1>
                   <Sum a = {4} b = {2} />
                  </ConditionalDisplay>, document.getElementById('root'));
}

setInterval(() => {
   state.showSum = !state.showSum;
   render();
}, 2000);
