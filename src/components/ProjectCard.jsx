import { Link } from 'react-router-dom'
import { writeups } from '../pages/projects/registry'

export default function ProjectCard({ project }) {
  const hasWriteup = Boolean(writeups[project.slug])
  const refId = project.slug.replace(/-/g, '').slice(0, 6).toUpperCase()

  return (
    <article className={'card' + (project.featured ? ' card-featured' : '')}>
      <a
        href={project.demo || project.link}
        target="_blank"
        rel="noreferrer"
        className="card-media"
        aria-label={project.demo ? project.title + ' — view live demo' : project.title + ' — view on GitHub'}
      >
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" />
        ) : (
          <div className="card-media-placeholder">Image coming soon</div>
        )}
      </a>
      <div className="card-body">
        <span className="card-ref">{refId}</span>
        <div className="card-tag-row">
          {project.tags.map((t) => {
            const cls = t === 'Featured' ? 'tag tag-featured' : t === 'Hardware' ? 'tag tag-hw' : 'tag'
            return <span key={t} className={cls}>{t}</span>
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0 }}>{project.title}</h3>
          {hasWriteup && (
            <Link className="btn btn-primary" style={{ fontSize: 12, padding: '4px 12px', whiteSpace: 'nowrap', flexShrink: 0 }} to={`/projects/${project.slug}`}>Read writeup →</Link>
          )}
        </div>
        <div className="tagline">{project.tagline}</div>
        <p>{project.summary}</p>
        {project.highlights?.length > 0 && (
          <ul className="highlight-list">
            {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        )}
        <div className="card-footer">
          <div className="stack">
            {project.stack.map((s) => <span key={s} className="stack-item">{s}</span>)}
          </div>
          <div className="card-links">
            {project.demo && (
              <a className="card-link" href={project.demo} target="_blank" rel="noreferrer">
                Live ↗
              </a>
            )}
            {project.link && (
              <a className="card-link" href={project.link} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
