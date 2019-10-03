// response to the user actions
// DOM Events : events are generated by the browser :
// button click events, change events for text inputs, and form submission evenets
// React SyntheticEvent object

function Events(props){
    const clickHandler = console.log; // SyntheticEvent object
    // reactive function component that handles a DOM event
    return (<button onClick={clickHandler}>Make an event</button>);
}

ReactDOM.render(<Events />,
  document.getElementById('root'));


// preventDefault :  stop the browser doing what it would normally do
// most common example of this : prevent forms from submitting

function Nocheckbox(){
    return <input type="checkbox" onClick={(e) => {e.preventDefault();}}/>
}

ReactDOM.render(<Nocheckbox />, document.getElementById('root'));


class Reloader extends React.Component{

    constructor(props){
       super(props);
       this.state = {content : ""};
       this.onChar = this.onChar.bind(this);
       this.onGoTime = this.onGoTime.bind(this);
    }

    onChar(event){
       this.setState({content: event.target.value});
    }

    // normalinde DOM submit edip reload eder 
    onGoTime(event){
        if(this.state.content !== "reload"){
            event.preventDefault();
        }
    }

    render(){
        return(
            <form onSubmit={this.onGoTime}>
              <input type="text" value={this.state.content} onChange={this.onChar} />
              <input type="submit" value = "Go Time" />
            </form>
        );
    }
}


// Component events

class EventCounter extends React.Component{
    constructor(props){
       super(props);
       this.state = {clicks:0};
       this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(event){
       const clicksNew = this.state.clicks + 1;
       this.setState({clicks:clicksNew});
       if(clicksNew % 2 === 0){
           this.props.onEvenClick(clicksNew);
       }
    }

    render(){
        // onClick : DOM event
        return <div onClick={this.clickHandler}>
           this div has been clicked {this.state.clicks}
        times.
            </div>;
    }
}

// onEvenClick : component event
ReactDOM.render(<EventCounter onEvenClick={(data)=>{
    console.log('even ${data}');
}}/>, document.getElementById('root'));