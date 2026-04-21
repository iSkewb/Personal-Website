import { useMemo, useState } from 'react'
import { books } from '../data/books'

function Stars({ rating }) {
  const pct = Math.max(0, Math.min(100, (rating / 10) * 100))
  return (
    <div className="rating">
      <div className="rating-bar">
        <div className="rating-fill" style={{ width: pct + '%' }} />
      </div>
      <span className="rating-num">{rating}<span className="rating-of">/10</span></span>
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Books() {
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('date-desc')

  const types = useMemo(() => ['All', ...Array.from(new Set(books.map((b) => b.type)))], [])

  const filtered = useMemo(() => {
    const list = filter === 'All' ? books.slice() : books.filter((b) => b.type === filter)
    const sorters = {
      'date-desc': (a, b) => new Date(b.date) - new Date(a.date),
      'date-asc': (a, b) => new Date(a.date) - new Date(b.date),
      'rating-desc': (a, b) => b.rating - a.rating,
      'rating-asc': (a, b) => a.rating - b.rating,
      'title-asc': (a, b) => a.title.localeCompare(b.title)
    }
    return list.sort(sorters[sort])
  }, [filter, sort])

  return (
    <>
      <section className="hero" style={{ paddingBottom: 16 }}>
        <div className="hero-eyebrow">Reading Log · 2026</div>
        <h1 style={{ fontSize: 'clamp(34px, 5vw, 48px)' }}>Books</h1>
        <p className="hero-sub">
          What I've been reading this year. Fiction mostly — fantasy, sci-fi, and classics — with
          nonfiction side quests in finance, history, and faith. Ratings are out of 10.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="books-controls">
          <div className="chip-row">
            {types.map((t) => (
              <button
                key={t}
                className={'filter-chip' + (filter === t ? ' active' : '')}
                onClick={() => setFilter(t)}
              >
                {t}
                <span className="filter-count">
                  {t === 'All' ? books.length : books.filter((b) => b.type === t).length}
                </span>
              </button>
            ))}
          </div>
          <label className="sort-ctrl">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="date-desc">Most recent</option>
              <option value="date-asc">Oldest first</option>
              <option value="rating-desc">Highest rated</option>
              <option value="rating-asc">Lowest rated</option>
              <option value="title-asc">Title (A–Z)</option>
            </select>
          </label>
        </div>

        <div className="book-list">
          {filtered.map((b, i) => (
            <article key={b.title + i} className="book-row">
              <div className="book-meta">
                <div className="book-date mono">{formatDate(b.date)}</div>
                <span className={'book-type book-type-' + b.type.toLowerCase()}>{b.type}</span>
              </div>
              <div className="book-main">
                <h3>{b.title}</h3>
                <div className="book-author">{b.author}</div>
                <div className="book-genres">
                  {String(b.genres).split(',').map((g) => (
                    <span key={g.trim()} className="book-genre">{g.trim()}</span>
                  ))}
                </div>
              </div>
              <div className="book-side">
                <Stars rating={b.rating} />
                <div className="book-pages mono">{b.pages} pp</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
