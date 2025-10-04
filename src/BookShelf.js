import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class BookShelf extends Component {
  renderShelf(titleText, keyShelf) {
    const list = (this.props.book || []).filter(b => b.shelf === keyShelf)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{titleText}</h2>
        <div className="bookshelf-books">
          {list.length === 0 ? (
            <div style={{ padding: '8px 0', color: '#6b7280', fontSize: 13 }}>
              Belum ada buku
            </div>
          ) : (
            <ol className="books-grid">
              {list.map(b => (
                <Book key={b.id} book={b} onChange={this.props.onChange} />
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Books Library</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.renderShelf('Currently Reading', 'currentlyReading')}
            {this.renderShelf('Want to Read', 'wantToRead')}
            {this.renderShelf('Read', 'read')}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf
