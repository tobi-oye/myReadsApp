import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
 
    bookShelves: {currentlyReading:{shelveName:"Currently Reading",books:[]}, wantToRead:{shelveName:"Want to Read",books:[]}}, read:{shelveName:"Read",books:[]},
    options: {currentlyReading:{label:"Currently Reading",id:"currentlyReading"}, wantToRead:{label:"Want to Read",id:"wantToRead"}, read:{label:"Read",id:"read"}, none:{label:"None",id:"none"}},
    allBooks:[],
  };

  /**
   * function to move book from one book shelve to the other
   * @param {*} event
   * it will get element id and clicked value from the click event
   * conditional statement for the various values 
   *  if true add the new element id  to the array and filter the previous element based on id
   * 
   */
  // moveBook = (singleElem,optionvalue,elem) => {
  //   //  console.log(elem,e.target.value)
  //   let newValue = options.target.value
  //   if(newValue === "currentlyReading"){
  //     BooksAPI.update(singleElem,newValue) 
  //     elem.filter((element) => {
  //       this.setState((previouState)=>{
  //         previouState.
  //       })
  //     })
  //     }
  //   }
    
  // };
  

  componentDidMount(){
    BooksAPI.getAll().then((res) => {
      return this.setState({allBooks:res, 
        bookShelves:{
          currentlyReading: {shelveName:"Currently Reading",books: res.splice(0,2)}, 
        wantToRead:{shelveName:"Want to Read",books:res.splice(2,2)}, 
        read:{shelveName:"Read",books:res}
      }
    })
  })
}
  


  render() {
   const {showSearchPage,bookShelves,options,allBooks} = this.state;
  //  console.log(this.state.wantToRead)

    return (
      <div className="app">
           
        {this.state.showSearchPage ? (
          <div className="search-books">h
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>

            </div>
            <div className="list-books-content">
              <div>
                {Object.values(bookShelves).map((book) => {
                                 return  <div className="bookshelf">
                                  <h2 className="bookshelf-title">{book.shelveName}</h2>
                                  <div className="bookshelf-books">
                                    <ol className="books-grid currentlyReading">
                                    {book.books.map((img) => {
                                      return  <li>
                                      <div className="book">
                                        <div className="book-top">
                                          <div
                                            className="book-cover"
                                            style={{
                                              width: 128,
                                              height: 193,
                                              backgroundImage: `url(${img.imageLinks.smallThumbnail})`,
                                            }}
                                          />
                
                                          <div className="book-shelf-changer">
                                            <select
                                              onClick={(e) => {
                                                return this.moveBook(book,e);
                                              }}
                                            >
                                              <option value="move" disabled>
                                                Move to...
                                              </option>
                                              {Object.values(options).map((elem) => {
                                                return <option value ={elem.id} > {elem.label} </option>;
                                              })}
                                            </select>
                                          </div>
                                        </div>
                                        <div className="book-title">
                                          {img.title}
                                        </div>
                                            <div className="book-authors">{img.authors[0]}</div>
                                      </div>
                                    </li>
                                    })}
                                    </ol>
                                  </div>
                                </div>
                })}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default BooksApp;
