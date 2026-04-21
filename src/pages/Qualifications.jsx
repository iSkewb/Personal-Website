const experience = [
  {
    role: 'Student Engineering Intern (Incoming)',
    org: 'American Electric Power — Shreveport, LA',
    when: 'May 2026 – Aug 2026',
    bullets: [
      'Incoming summer internship with a major US electric utility.',
      'Focus area: power systems engineering and field applications.'
    ]
  },
  {
    role: 'Tutor',
    org: 'At Home Academy — Shreveport, LA',
    when: 'Jun 2024 – Present',
    bullets: [
      'ACT / SAT tutoring in math, reading, writing, and science for 10+ students with individualized strategies.',
      'High school calculus, physics, history, and English — adapting instruction to learning style.'
    ]
  },
  {
    role: 'Hardware Accelerator Developer (Personal)',
    org: 'FPGA-Based American Option Pricing — QMC & LSM',
    when: 'May 2025 – Aug 2025',
    bullets: [
      'Designed a custom pipelined FPGA datapath for Monte Carlo option pricing using Sobol sequences, GBM, and Longstaff-Schwartz regression.',
      'Integrated fixed-point math, simulation logic, and UART control into a standalone pricing engine.'
    ]
  }
]

const leadership = [
  {
    role: 'Team Member — Valuation & Financial Modeling',
    org: 'Corporate Finance Case Competition',
    when: 'Aug 2025',
    bullets: [
      'Placed 2nd evaluating the acquisition of a growth-phase agribusiness company.',
      'Led the DCF analysis with industry comparables, growth assumptions, and risk premiums.'
    ]
  },
  {
    role: 'Special Events Counselor',
    org: 'Freshman Reaching Excellence in Engineering',
    when: 'May 2024 – Apr 2025',
    bullets: [
      'Planned and executed 5 large events (retreats, formal banquet) for a 100+ member org.',
      'Led team-building and social programming that increased event attendance.'
    ]
  },
  {
    role: 'Service Committee Member',
    org: 'Freshman Reaching Excellence in Engineering',
    when: 'Sep 2023 – Apr 2024',
    bullets: [
      'Selected as 1 of 10 service committee members from 700 applicants.',
      'Coordinated service projects — street cleaning, community gardening, letters to campus workers.'
    ]
  }
]

const education = [
  {
    role: 'Master of Science in Finance',
    org: 'Texas A&M — Mays Business School',
    when: 'Expected May 2028',
    bullets: ['GPA: 3.67 / 4.00', 'CFA Level 1 Candidate']
  },
  {
    role: 'B.S. Computer Engineering, Minor in Mathematics',
    org: 'Texas A&M — College of Engineering',
    when: 'Expected May 2027',
    bullets: [
      'GPA: 3.82 / 4.00',
      'Craig & Galen Brown Engineering Honors Program · National Merit Finalist',
      'Relevant courses: Digital System Design, Computer Architecture, Signals & Systems, Data Structures & Algorithms'
    ]
  }
]

const awards = ["President's Endowed Scholar", 'Eagle Scout', "Dean's Honor Roll", 'National Merit Finalist']

function Block({ title, items }) {
  return (
    <section className="section">
      <div className="section-head"><h2>{title}</h2></div>
      <div className="timeline">
        {items.map((it, i) => (
          <div key={i} className="tl-item">
            <div className="tl-head">
              <h3>{it.role}</h3>
              <span className="when">{it.when}</span>
            </div>
            <div className="tl-org">{it.org}</div>
            <ul>{it.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Qualifications() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: 8 }}>
        <div className="hero-eyebrow">Experience & Education</div>
        <h1 style={{ fontSize: 'clamp(34px, 5vw, 48px)' }}>Background</h1>
        <p className="hero-sub">
          Dual-degree student — computer engineering plus an MS in Finance — with honors program
          involvement, professional tutoring experience, and an incoming utility engineering
          internship.
        </p>
      </section>

      <Block title="Experience" items={experience} />
      <Block title="Leadership & Involvement" items={leadership} />
      <Block title="Education" items={education} />

      <section className="section">
        <div className="section-head"><h2>Awards</h2></div>
        <div className="skill-chips">
          {awards.map((a) => <span key={a} className="chip" style={{ fontSize: 13, padding: '6px 12px' }}>{a}</span>)}
        </div>
      </section>
    </>
  )
}
