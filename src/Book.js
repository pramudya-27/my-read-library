import React from 'react'

const Book = (props) => {
  const b = props.book || {}
  const shelf = b.shelf || 'none'
  const title = b.title || 'No title'
  const authors = Array.isArray(b.authors) ? b.authors.join(', ') : (b.authors || '')
  const imageLinks = b.imageLinks || {}
  const thumbnailUrl = (imageLinks && imageLinks.thumbnail) ? imageLinks.thumbnail : ''
  const preview = b.previewLink

  const bookCoverStyle = {
    width: 128,
    height: 193,
    backgroundImage: thumbnailUrl ? 'url(' + thumbnailUrl + ')' : 'none',
    backgroundColor: thumbnailUrl ? 'transparent' : '#f2f2f2',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={bookCoverStyle} />
          <div className="book-shelf-changer">
            <select value={shelf} onChange={e => props.onChange(b, e.target.value)}>
              <option value="none">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
        {preview ? (
          <div style={{ marginTop: 8 }}>
            <a href={preview} target="_blank" rel="noreferrer">Preview</a>
          </div>
        ) : null}
      </div>
    </li>
  )
}

export default Book
