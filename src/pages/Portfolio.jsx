import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function Portfolio() {
  return (
    <section className="hero" style={{ paddingBottom: 24 }}>
      <div className="hero-eyebrow">Portfolio</div>
      <h1 style={{ fontSize: 'clamp(34px, 5vw, 48px)' }}>Projects</h1>
      <p className="hero-sub" style={{ marginBottom: 40 }}>
        A mix of hardware design, full-stack web, and applied ML. The hardware work is where
        I've spent the most time — pipelined RTL, fixed-point numerics, and systematic debugging.
      </p>
      <div className="grid">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  )
}
