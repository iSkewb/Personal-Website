import { Link } from 'react-router-dom'

export function WriteupLayout({ children, eyebrow, title, subtitle, meta, heroImage }) {
  return (
    <article className="writeup">
      <Link to="/portfolio" className="writeup-back">← All projects</Link>
      <header className="writeup-header">
        {eyebrow && <div className="hero-eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {subtitle && <p className="writeup-subtitle">{subtitle}</p>}
        {meta && meta.length > 0 && (
          <dl className="writeup-meta">
            {meta.map((m) => (
              <div key={m.label} className="writeup-meta-item">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>
      {heroImage && (
        <figure className="writeup-hero">
          <img src={heroImage.src} alt={heroImage.alt || title} />
          {heroImage.caption && <figcaption>{heroImage.caption}</figcaption>}
        </figure>
      )}
      <div className="writeup-body">{children}</div>
    </article>
  )
}

export function Section({ id, title, children }) {
  return (
    <section id={id} className="writeup-section">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}

export function SubSection({ title, children }) {
  return (
    <div className="writeup-subsection">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  )
}

export function Figure({ src, alt, caption, width }) {
  return (
    <figure className="writeup-figure" style={width ? { maxWidth: width } : undefined}>
      {src ? (
        <img src={src} alt={alt || caption || ''} loading="lazy" />
      ) : (
        <div className="writeup-figure-placeholder">
          <span>Image placeholder</span>
          <small>{alt || 'Drop an image in /public and set src'}</small>
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function FigureGrid({ children, cols = 2 }) {
  return (
    <div className="writeup-figure-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {children}
    </div>
  )
}

export function DataTable({ caption, headers, rows }) {
  return (
    <div className="writeup-table-wrap">
      {caption && <div className="writeup-table-caption">{caption}</div>}
      <table className="writeup-table">
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Callout({ kind = 'info', title, children }) {
  return (
    <aside className={'writeup-callout callout-' + kind}>
      {title && <div className="callout-title">{title}</div>}
      <div>{children}</div>
    </aside>
  )
}

export function LogTimeline({ entries }) {
  return (
    <div className="writeup-log">
      {entries.map((e, i) => (
        <div key={i} className="log-entry">
          <div className="log-date mono">{e.date}</div>
          <div className="log-body">
            {e.title && <h4>{e.title}</h4>}
            <div>{e.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Code({ children, lang }) {
  return (
    <pre className="writeup-code">
      {lang && <span className="code-lang">{lang}</span>}
      <code>{children}</code>
    </pre>
  )
}
