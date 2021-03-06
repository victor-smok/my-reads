import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import ListBooks from './ListBooks'
import './App.css'



class BooksApp extends Component {
    state = {
        books: [],
        results: [],
        loading: false,
        showSearchLoading: false,
    }
    getAllBooks = () => {
        this.setState({
            loading: true
        })
        BooksAPI.getAll().then((books) => {
            this.setState({
                books,
                loading: false
            })
        })
    }
    componentDidMount() {
        this.getAllBooks()
    }
    moveTo = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.getAllBooks()
        })
    }
    search = (query, maxResults) => {
        this.setState({
            showSearchLoading: true
        })
        BooksAPI.search(query, maxResults).then(results => {
            this.setState({
                showSearchLoading: false,
                results: results
            })
        })
    }
    clearSearch = () => {
        this.setState({ results: [] })
    }

    render() {
        return (
            <div className="app">
                <Route
                    path='/search'
                    render={() => (
                        <Search
                            booksOnShelf={this.state.books}
                            moveTo={this.moveTo}
                            clearSearch={this.clearSearch}
                            search={this.search}
                            showSearchLoading={this.state.showSearchLoading}
                            searchResults={this.state.results}
                        />
                    )}
                />
                <Route
                    exact path='/'
                    render={() => (
                        <ListBooks
                            books={this.state.books}
                            moveTo={this.moveTo}
                            showLoader={this.state.loading}
                        />
                    )}
                />
            </div>
        )
    }
}

export default BooksApp
