// BooksAPI.js — Google Books API + localStorage

const GB_API = 'https://www.googleapis.com/books/v1/volumes'
const SHELF_KEY = 'myreads.shelves'

// opsional: gunakan env .env => REACT_APP_GOOGLE_API_KEY
const API_KEY =
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_GOOGLE_API_KEY) ||
  (typeof window !== 'undefined' && window.GOOGLE_API_KEY) ||
  ''

function withKey(url) {
  if (!API_KEY) return url
  var u = new URL(url)
  u.searchParams.set('key', API_KEY)
  return u.toString()
}

function loadShelves() {
  try {
    return JSON.parse(localStorage.getItem(SHELF_KEY)) || {}
  } catch (e) {
    return {}
  }
}

function saveShelves(map) {
  localStorage.setItem(SHELF_KEY, JSON.stringify(map))
}

function normalizeVolume(item) {
  const v = item || {}
  const info = v.volumeInfo || {}
  const img = info.imageLinks || {}

  return {
    id: v.id,
    title: info.title || 'No title',
    authors: Array.isArray(info.authors) ? info.authors : (info.authors ? [info.authors] : []),
    imageLinks: { thumbnail: (img && img.thumbnail) || (img && img.smallThumbnail) || '' },
    previewLink: info.previewLink || '',
    shelf: 'none'
  }
}

export const get = async (bookId) => {
  const res = await fetch(withKey(GB_API + '/' + bookId))
  const data = await res.json()
  const book = normalizeVolume(data)
  const shelves = loadShelves()
  book.shelf = shelves[book.id] || 'none'
  return book
}

export const getAll = async () => {
  const shelves = loadShelves()
  const ids = Object.keys(shelves)
  if (ids.length === 0) return []
  const books = await Promise.all(ids.map(id => get(id).catch(() => null)))
  return books.filter(Boolean).map(b => ({ ...b, shelf: shelves[b.id] || 'none' }))
}

export const update = async (book, shelf) => {
  const shelves = loadShelves()
  if (shelf === 'none') delete shelves[book.id]
  else shelves[book.id] = shelf
  saveShelves(shelves)
  return { shelves }
}

export const search = async (query, startIndex = 0, maxResults = 20) => {
  if (!query || !query.trim()) return []
  const params = new URLSearchParams({
    q: query.trim(),
    startIndex: String(startIndex),
    maxResults: String(maxResults),
    printType: 'books'
  })
  const res = await fetch(withKey(GB_API + '?' + params.toString()))
  const data = await res.json()
  const items = Array.isArray(data.items) ? data.items : []
  const shelves = loadShelves()
  return items.map(normalizeVolume).map(b => ({ ...b, shelf: shelves[b.id] || 'none' }))
}
