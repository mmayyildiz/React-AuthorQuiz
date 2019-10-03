import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
// npm install redux react-redux

import AddAuthorForm from './AddAuthorForm';

const authors = [
    {
        name : 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource:'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn',
                'Life on the Missisippi',
                'Roughing it']
    },
    {
        name : 'Joseph Conrad',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource:'Wikimedia Commons',
        books: ['Hearth of Darkness']   
    },
    {
        name : 'Stephen King',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource:'Wikimedia Commons',
        books: ['The Shining', 'IT']   
    },
    {
        name : 'Charles Dickens',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource:'Wikimedia Commons',
        books: ['David Cooperfield', 'A Tale of Two Cities']   
    },
    {
        name : 'William Shakespare',
        imageUrl: 'images/authors/williamshakespare.jpg',
        imageSource:'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']   
    },

    //npm install underscore
];

function getTurnData(authors){
    // concatenating each author's books into the larger set
   const allBooks = authors.reduce(function(p, c, i){
       return p.concat(c.books);
   }, []);

   // ilk 4'ünü al
   const fourRandomBooks = shuffle(allBooks).slice(0,4);
   const answer = sample(fourRandomBooks);

   return{
       books: fourRandomBooks,
       author: authors.find((author) => 
           author.books.some((title) => 
                title === answer))
   }
}


function reducer(state={authors, turnData:getTurnData(authors), highlight: ''}, action){
   
    switch(action.type){
        case 'ANSWER_SELECTED':
          const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
          state.highlight = isCorrect ? 'correct' : 'wrong';
          return Object.assign(
              {},
              state, {
                  highlight: isCorrect ? 'correct' : 'wrong'});
        case 'CONTINUE':
           return Object.assign({}, state, {
               highlight: '', 
               turnData: getTurnData(state.authors)
            });
        case 'ADD_AUTHOR':
        // When ADD_AUTHOR is dispatched
        // we will update the app state stored in our store
           return Object.assign({}, state, {
            authors: state.authors.concat([action.author])}
        );
        // if we dont know how to handle action, don't handle it at all 
        default: return state;
    } 
    return state;
}

// creating a store requires specifying a reducer function
let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/* --- DELETED --- *
function App(){
    // Provider's job is make this store available for all of its children
    return <ReactRedux.Provider store={store}>
        <AuthorQuiz />
    </ReactRedux.Provider>;
}
*/

/* ---- DELETED ----
const AuthorWrapper = withRouter(({history}) => 
     <AddAuthorForm onAddAuthor={(author) => {
       authors.push(author);
       history.push('/');
   }}/>
);
*/

// react-redux takes care of re-rendering. so we don't need render function
//function render(){
    // BrowserRouter component gives us ability to introduce route components
    // <React.Fragment> : added due to BrowserRouter only has one child element
    // grouping react elements under a single parent but using a component that has no DOM representation
    // this <React.Fragment> component doesn't add anything to the DOM

    // because adduthorform now connected to Redux store, we used it directly
  ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
        <React.Fragment>
            <Route exact path="/" component={AuthorQuiz} />
            <Route path="/add" component = {AddAuthorForm} />
        </React.Fragment>
    </ ReactRedux.Provider>
  </BrowserRouter>, document.getElementById('root'));
//}

//render();


serviceWorker.unregister();
