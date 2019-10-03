import React from 'react';
import "./AddAuthorForm.css";
// and the webpack setup in createReactApp will pick up that CSS import, do some magic, and make it all work

class AuthorForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name : '',
            imageUrl: '',
            books : [],
            bookTemp :  ''
        }

        // What this does is it guarantees that no matter how onFieldChange is called,
        // the value of this within the method will be the same as the value of this within the constructor
        this.onFieldChange = this.onFieldChange.bind(this);

        // must be binded in constructor other way we get Cannot read property 'props' of undefined error
        // this.props.onAddAuthor(this.state);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleAddBook = this.handleAddBook.bind(this);
    }

    handleSubmit(event){
        // stop the form from being submitted
         event.preventDefault();
         this.props.onAddAuthor(this.state);
    }

    onFieldChange(event){
        this.setState({
           [event.target.name]: event.target.value
        });
    }

    handleAddBook(event){
        this.setState({
           books: this.state.books.concat([this.state.bookTemp]),
           bookTemp : ''
        })
    }

    render(){
     return <form onSubmit={this.handleSubmit}>
               <div className="AddAuthorForm__input">
                   <label htmlFor="name">Name</label>
                   <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
               </div>
               <div className="AddAuthorForm__input">
                   <label htmlFor="imageUrl">Image URL</label>
                   <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
               </div>
               <div className="AddAuthorForm__input">
                  {this.state.books.map((book) => <p key={book}>{book} </p>)}
                  <label htmlFor="bookTemp">Books</label>
                  <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
                  <input type="button" value="+" onClick={this.handleAddBook}/>
               </div>
               <input type="submit" value="Add"/>
     </form>;
    }
}


// for is reserved js word, so htmlFor is used in jsx
function AddAuthorForm({match, onAddAuthor}){
    return <div className="AddAuthorForm">
           <h1>Add Author</h1>
           <AuthorForm onAddAuthor={onAddAuthor}/>
        </div>;
}

export default AddAuthorForm;