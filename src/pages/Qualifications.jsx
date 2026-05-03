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

const service = [
  {
    role: 'Special Events Counselor',
    org: 'Freshman Reaching Excellence in Engineering',
    url: 'http://freefreshmen.com',
    img: '/service-images/free.JPG',
    imgAlt: 'FREE special events',
    bullets: [
      'Planned and executed 5 large events (retreats, formal banquet) for ~120 students.',
      'Learned the importance of advance planning and cross-team coordination for large-scale programming.'
    ]
  },
  {
    role: 'Eagle Scout',
    org: 'Boy Scouts of America',
    url: 'https://www.scouting.org',
    img: '/service-images/eagleScout.JPG',
    imgAlt: 'Eagle Scout',
    bullets: [
      "Earned Scouting's highest rank; led a service project building a gaga ball pit for a local church.",
      'Developed team leadership, timeline communication, and adaptive planning skills.'
    ]
  },
  {
    role: 'Participant — The Big Event',
    org: 'Texas A&M University',
    url: 'https://bigevent.tamu.edu',
    img: '/service-images/bigEvent.JPG',
    imgAlt: 'The Big Event',
    bullets: [
      "Participated twice in Texas A&M's largest single-day student-run service project.",
      'Performed yard maintenance and community outreach in the Bryan–College Station area.'
    ]
  },
  {
    role: 'Street Cleanup Volunteer',
    org: 'Adopt-a-Street Program — City of College Station',
    url: 'https://www.cstx.gov',
    img: '/service-images/streetclean.JPG',
    imgAlt: 'Street cleanup',
    bullets: [
      'Cleaned streets twice per semester through the FREE service committee.',
      'Strengthened team bonds while contributing to community beautification.'
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

function ServiceCard({ item }) {
  return (
    <div className="tl-item" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0 }}>
        {item.img ? (
          <img
            src={item.img}
            alt={item.imgAlt}
            style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: 3, border: '1px solid var(--border)', display: 'block' }}
          />
        ) : (
          <div style={{
            width: 110, height: 110, borderRadius: 3,
            border: '1px solid var(--border)',
            background: 'var(--bg-elev)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 10px, var(--border) 10px 11px)',
          }}>
            <span style={{ fontSize: 10, color: 'var(--text-mute)', fontFamily: 'JetBrains Mono, monospace', textAlign: 'center', padding: '0 6px' }}>{item.imgAlt}</span>
          </div>
        )}
      </a>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="tl-head">
          <h3>
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              {item.role}
            </a>
          </h3>
        </div>
        <div className="tl-org">{item.org}</div>
        <ul>{item.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
      </div>
    </div>
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

      <section className="section">
        <div className="section-head"><h2>Service</h2></div>
        <div className="timeline">
          {service.map((item, i) => <ServiceCard key={i} item={item} />)}
        </div>
      </section>

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
