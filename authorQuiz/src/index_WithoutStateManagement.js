import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
//npm install react-router-dom

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

function resetState(){
    return{
    turnData: getTurnData(authors),
    highlight: ''}
};

// const a assign edilemez
let state = resetState();

function onAnswerSelected(answer){
   const isCorrect = state.turnData.author.books.some((book) => book === answer);
   state.highlight = isCorrect ? 'correct' : 'wrong';
   render();
}

function App(){
    return <AuthorQuiz {...state} 
      onAnswerSelected={onAnswerSelected}
      onContinue={() => {
          state = resetState();
          render();
      }}/>;
}


const AuthorWrapper = withRouter(({history}) => 
     <AddAuthorForm onAddAuthor={(author) => {
       authors.push(author);
       history.push('/');
   }}/>
);


function render(){
    // BrowserRouter component gives us ability to introduce route components
    // <React.Fragment> : added due to BrowserRouter only has one child element
    // grouping react elements under a single parent but using a component that has no DOM representation
    // this <React.Fragment> component doesn't add anything to the DOM
  ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorWrapper}/>
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));
}

render();


serviceWorker.unregister();
