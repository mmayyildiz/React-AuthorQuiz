function Frm(){
    return <div>
        <input type="text" value="react" /><br />
        <textarea value="react"/><br />
        <select value="sunday">
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
        </ select>
        </div>
}


class Identity_readonly extends React.Component {
    // Form elements Readonly. to change we must bound them smth that can change. 
    // values of the inputs are bound to the state. So
    // Add state to the component 
    // Bind inputs to the component state
    // So they can change if the state changes
    // Use onChange handler to update state

    render(){
        return(
        <form>
           <input type="text" name="firstName" value="" placeHolder="First Name" /> 
           <input type="text" name="lastName" value="" placeHolder="Last Name" />
        </form>
        );
    }
}

class Identity extends React.Component {
    constructor(){
       super();
       this.state = {
          firstName: "",
          lastName: ""
       };
       // bind onFieldChange method to the class
       // that is necessary so that withing onFieldChange we can access this
       this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(event){
       this.setState({
         [event.target.name]: event.target.value
       });
    }

    render(){
        return(
            <form>
                <input type="text" name="firstName" value={this.state.firstName} placeHolder="First Name" onChange={this.onFieldChange} /> 
                <input type="text" name="lastName" value={this.state.lastName} placeHolder="Last Name" onChange={this.onFieldChange} />
            </form>
        );
    }
}


ReactDOM.render(<Identity />, document.getElementById('root'));


// Form Libraries
// Forms can be time consuming 
// we will look at a library called React JSON schema form, which is available as an NPM module.

const {default: Form} = JSONSchemaForm;

const schema = {
    "title" : "identity",
    "type" : "object",
    "required" : [
        "firstName",
        "lastName"
    ],
    "properties" : {
        "firstName": {
            "type" : "string",
            "title" : "First Name",
            "minLenght": 1,
            "maxLenght": 6
        },
        "lastName": {
            "type": "string",
            "title": "Last name"
        },
        "age": {
            "type": "number",
            "title": "Age"
        }
    }
}

ReactDOM.render((
   <Form schema={schema} noHtml5Validate onSubmit={console.log} showErrorList={false}/>
), document.getElementById("root"));


// Form Validation
// the easy way to add validation to a form is to use one of the form libraries that has validation included.
// validate on change or on submission
// Display errors inline or aggregated elsewhere

// Client-side Routing with HTML5 pushState
// HTML5 includes an API called pushState or history that allows js 
// to update the browser URL without triggering a request to the server

// React Router
// Client-side router for React
// Conditional rendering based on routes
// The Route Component

//<Route exact path="/" component={Welcome}/>
//<Route exact path="/about" component={About}/>

<Route path="/single/:id" component={Single} />

function Single({match}){
    return <div>{match.params.id} </div>;
}
// React Router implementation :
ReactDOM.render(<BrowserRouter>
  <section id="navigation">
      <Route path="/" component={Menu}/>
  </section>
  <section id="detail">
      <Route exact path="/" component={Welcome}/>
      <Route path="/list" component={List}/>
      <Route path="/single/:id" component={Single}/>
  </section>
</BrowserRouter>, document.getElementById('app'));


// import 3 identifiers from the ReactRouterDOM module
const{
    BrowserRouter, // is a component wrapper around any elements tha we want to use routes
    Route,  // is a component that render other components based on the route path
    Link  // is a component to use to generate a link
}  = ReactRouterDOM;

const characters = {
    "lady-glasses": "https://s.pluralsight.com/authorkit/img/Gray/Geek_Female_Circle_Gray.png",
    "tie-guy": "https://s.pluralsight.com/authorkit/img/People/Gray/Male_1_Circle_Gray.png"
};

function Character({match}){
    const imgUrl = characters[match.params.character].replace(/Gray/g, match.params.color);
    return <div><img src={imgUrl} /></div>
}

const DashBoard = () => (
     <div style={{ width:'400px', height: '400px'}}>
        <div className="cell">
          <Route path="top/left/:character/:color" component={Character} />
        </div>
        <div className="cell">
          <Route path="top/right/:character/:color" component={Character} />
        </div>
        <div className="cell">
          <Route path="bottom/left/:character/:color" component={Character} />
        </div>
        <div className="cell">
          <Route path="bottom/right/:character/:color" component={Character} />
        </div>
     </div>
);

ReactDOM.render(
    // BrowserRouter : to get the route elements to work
    // foreach character we take an array of cell positions
    // and we map those as well and then for each combination of character and position
    // we map the four possible character colors
    <BrowserRouter>
     <div>
        <aside>
            {Object.keys(characters).map((name) =>
                ["/top/left", "/top/right", "/bottom/left", "bottom/right"].map((corner) =>
                   ["Gray", "Green", "Orange", "Purple"].map((color) =>
                    <Link to={'${corner}${name}/${color}'}> {'${corner}${name}/${color}'} </Link>
                )))}
        </aside>

        <main>
            <Route path="/" component={Dashboard}/>
            <Route path="/top" render={() => <div>Something at the top</div>}/>
            <Route path="/bottom" render={() => <div>Something at the bottom</div>}/>
        </main>
     </div>
    </BrowserRouter>
    , document.getElementById('root')
);


// Refs :  a way of accessing the underlying DOM elements that are wrapped by React components  
// there are several APIs for this purpose : use React.createRef();

class Identity extends React.Components{
    constructor(){
       super();
       // to access to underlying DOM nodes and manipulate them with the browser API
       this.myDiv = React.createRef();
    }


    // lifecycle method
    // which is a common place to take advantage of refs
    // Because it is called after the component has been rendered, and
    // the DOM elements have been created
    componentDidMount(){
        // interpreted by browser as html
        this.myDiv.current.innerHTML += "<br/> Set on the wrapped DOM element. <strong>Unsafe</strong>";
    }

    render(){
        // having done that we can access the current prop of myDiv in componentDidMount to get a reference
        // to the DOM element that is rendered for my React div element
        // not interpreted as html
        return <div ref={this.myDiv}>
               {"Set in render <strong>Safe</strong>"} 
            </div>
    }
}


