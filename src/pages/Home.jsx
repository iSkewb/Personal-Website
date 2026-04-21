import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const skillGroups = [
  { name: 'Hardware / RTL', items: ['SystemVerilog', 'Verilog', 'Vivado', 'Spartan-7', 'Fixed-point Q16.16', 'UART'] },
  { name: 'Languages', items: ['Python', 'C++', 'JavaScript', 'SQL', 'LaTeX'] },
  { name: 'Web & Tools', items: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Vite', 'Git'] },
  { name: 'Data & ML', items: ['NumPy', 'TensorFlow', 'OpenCV', 'Recharts', 'Tableau'] },
  { name: 'Finance', items: ['DCF', 'Monte Carlo', 'LSM', 'CFA L1 Candidate', 'Excel / PowerPoint'] }
]

export default function Home() {
  const featured = projects.filter((p) => p.featured)

  return (
    <>
      <section className="hero">
        <div className="hero-layout">
          <div className="hero-text">
            <div className="hero-eyebrow">Computer Engineering · Texas A&M</div>
            <h1>Howdy, I'm Devon.</h1>
            <p className="hero-sub">
              I'm Devon — a computer engineering student with a minor in math, pursuing an MS in Finance.
              I build pipelined FPGA designs, full-stack web apps, and numerical software. Incoming student
              engineering intern at American Electric Power, summer 2026.
            </p>
            <div className="hero-cta">
              <Link to="/portfolio" className="btn btn-primary">View projects →</Link>
              <Link to="/qualifications" className="btn">Experience & education</Link>
              <a href="mailto:dbmeyer95@gmail.com" className="btn">Get in touch</a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            <img src="/meyer_devon.jpg" alt="Devon Meyer" className="hero-photo" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>Featured projects</h2>
            <div className="sub">Strongest work — hardware pipelines with real numerical validation.</div>
          </div>
          <Link to="/portfolio" className="btn">All projects →</Link>
        </div>
        <div className="grid">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>Skills</h2>
            <div className="sub">Comfortable from RTL up through application code.</div>
          </div>
        </div>
        <div className="skills-grid">
          {skillGroups.map((g) => (
            <div key={g.name} className="skill-block">
              <h4>{g.name}</h4>
              <div className="skill-chips">
                {g.items.map((i) => <span key={i} className="chip">{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
