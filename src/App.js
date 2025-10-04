import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import { Route, Switch } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    AllBooks: [],
    searchIndex: 0,
    pageSize: 20,
    lastQuery: ''
  }

  componentDidMount() {
    this.LoadBooks()
  }

  LoadBooks = () => {
    BooksAPI.getAll()
      .then((books) => this.setState({ books: books || [] }))
      .catch(() => this.setState({ books: [] }))
  }

  changeShelf = (bookchange, shelf) => {
    BooksAPI.update(bookchange, shelf).then(() => {
      this.LoadBooks()
      this.setState((state) => ({
        AllBooks: (state.AllBooks || []).map(b => (b.id === bookchange.id ? { ...b, shelf } : b))
      }))
    })
  }

  clearArray = () => {
    this.setState({ AllBooks: [], lastQuery: '', searchIndex: 0 })
  }

  OnSearch = (query) => {
    if (query && query.trim()) {
      const pageSize = this.state.pageSize
      this.setState({ lastQuery: query, searchIndex: 0 })
      BooksAPI.search(query, 0, pageSize)
        .then((AllBooks) => this.setState({ AllBooks: AllBooks || [] }))
        .catch(() => this.setState({ AllBooks: [] }))
    } else {
      this.clearArray()
    }
  }

  loadMore = (dir) => {
    const { lastQuery, searchIndex, pageSize } = this.state
    if (!lastQuery) return
    const nextIndex = Math.max(0, searchIndex + dir * pageSize)
    BooksAPI.search(lastQuery, nextIndex, pageSize).then(AllBooks => {
      this.setState({ AllBooks: AllBooks || [], searchIndex: nextIndex })
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BookShelf
                book={this.state.books}
                onChange={this.changeShelf}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                onClick={this.clearArray}
                book={this.state.AllBooks}
                OnSearch={this.OnSearch}
                onChange={this.changeShelf}
                onNext={() => this.loadMore(1)}
                onPrev={() => this.loadMore(-1)}
                hasPrev={this.state.searchIndex > 0}
                hasNext={this.state.AllBooks.length === this.state.pageSize}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
