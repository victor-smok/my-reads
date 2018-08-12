import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loader from './Loader'

class Search extends Component {
    static propTypes = {
        booksOnShelf: PropTypes.array,
        search: PropTypes.func.isRequired,
        showSearchLoading: PropTypes.bool.isRequired,
        searchResults: PropTypes.array,
        moveTo: PropTypes.func.isRequired,
        clearSearch: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    componentDidMount() {
        this.clearQuery()
    }

    clearQuery = () => {
        this.setState({query: ''})
        this.props.clearSearch()
    }   

    updateQuery = (query) => {
        this.setState({
            query: query.target.value
        })

        if (query.target.value === '') {
            console.log('limpar query')
            this.clearQuery()
            this.props.search('', 40)
        }
        else {
            this.props.search(this.state.query, 40)
        }
    }

    getShelf = (book) => {
        var filteredBooks = this.props.booksOnShelf.filter(b => b.title === book.title)
        if (filteredBooks.length > 0)
            return filteredBooks[0].shelf
        else
            return 'none'
    }
    render() {
        const { searchResults } = this.props

        let results
        if (searchResults && typeof (searchResults.map) === 'function') {
            results = searchResults.map((book) => {

                let bookThumbnail
                if (book.imageLinks)
                    bookThumbnail = book.imageLinks.thumbnail
                

                let bookShelf = this.getShelf(book);
                return (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(e) => { this.props.moveTo(book, e.target.value); }} defaultValue={bookShelf}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors && book.authors.map((author) => {
                                return (
                                    <span key={author} className="author-name"> {author}</span>
                                )
                            })}
                            </div>
                        </div>
                    </li>
                )
            })
        }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.updateQuery} value={this.state.query} />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.props.showSearchLoading && <Loader/>}
                    <ol className="books-grid">
                        {results}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search
