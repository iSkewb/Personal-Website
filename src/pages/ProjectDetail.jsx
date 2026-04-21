import { Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { writeups } from './projects/registry'

export default function ProjectDetail() {
  const { slug } = useParams()
  const Writeup = writeups[slug]

  if (!Writeup) {
    return (
      <section className="hero">
        <div className="hero-eyebrow">Not found</div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)' }}>No writeup yet</h1>
        <p className="hero-sub">
          There's no long-form writeup registered for <code>{slug}</code> yet. Start one by duplicating{' '}
          <code>src/pages/projects/_Template.jsx</code> and registering it in{' '}
          <code>src/pages/projects/registry.js</code>.
        </p>
        <Link to="/portfolio" className="btn">← All projects</Link>
      </section>
    )
  }

  return (
    <Suspense fallback={<div className="hero"><p className="hero-sub">Loading writeup…</p></div>}>
      <Writeup />
    </Suspense>
  )
}
