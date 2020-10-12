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
 
    bookShelves: [{shelveName:"Currently Reading",books:[]}, {shelveName:"Want to Read",books:[]}, {shelveName:"Read",books:[]}],
    options: ["Currently Reading", "Want to Read", "Read", "None"],
    allBooks:[],
    currentlyReading:[],
    wantToRead:[],
    read:[]
  };

  /**
   * function to move book from one book shelve to the other
   * @param {*} event
   */


  moveBook = (e) => {
    // let elem;
  };

  componentDidMount(){
    BooksAPI.getAll().then((res) => {
      return this.setState({allBooks:res, bookShelves:[{shelveName:"Currently Reading",books: res.splice(0,2)}, {shelveName:"Want to Read",books:res.splice(2,2)}, {shelveName:"Read",books:res}]
    })
  })
}
  


  render() {
   const {showSearchPage,bookShelves,options,allBooks = []} = this.state
  //  console.log(this.state.wantToRead)

    return (
      <div className="app">
           
        {this.state.showSearchPage ? (
          <div className="search-books">
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
                {this.state.bookShelves.map((elem) => {
                                 return  <div className="bookshelf">
                                  <h2 className="bookshelf-title">{elem.shelveName}</h2>
                                  <div className="bookshelf-books">
                                    <ol className="books-grid currentlyReading">
                                    {elem.books.map((elem) => {
                                      return  <li>
                                      <div className="book">
                                        <div className="book-top">
                                          <div
                                            className="book-cover"
                                            style={{
                                              width: 128,
                                              height: 193,
                                              backgroundImage: `url(${elem.imageLinks.smallThumbnail})`,
                                            }}
                                          />
                
                                          <div className="book-shelf-changer">
                                            <select
                                              onClick={(e) => {
                                                return this.moveBook(e);
                                              }}
                                            >
                                              <option value="move" disabled>
                                                Move to...
                                              </option>
                                              {this.state.options.map((elem) => {
                                                return <option> {elem} </option>;
                                              })}
                                            </select>
                                          </div>
                                        </div>
                                        <div className="book-title">
                                          {elem.title}
                                        </div>
                                            <div className="book-authors">{elem.authors[0]}</div>
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
}

export default BooksApp;
