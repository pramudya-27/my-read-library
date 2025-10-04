import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
  state = { query: '' }
  timer = null

  updateQuery = (query) => {
    this.setState({ query })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.props.OnSearch(query)
    }, 300)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  // setelah pilih rak, simpan lalu kembali ke dashboard
  handleChangeAndGoHome = (book, shelf) => {
    this.props.onChange(book, shelf)
    if (shelf && shelf !== 'none') {
      this.props.history.push('/')
    }
  }

  render() {
    const books = Array.isArray(this.props.book) ? this.props.book : []
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link onClick={this.props.onClick} className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(sbook => (
              <Book
                key={sbook.id}
                book={sbook}
                onChange={this.handleChangeAndGoHome}
              />
            ))}
          </ol>

          <div className="pagination">
            <button disabled={!this.props.hasPrev} onClick={this.props.onPrev}>Prev</button>
            <button disabled={!this.props.hasNext} onClick={this.props.onNext}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchBooks)
