import './App.css'

const features = [
  {
    eyebrow: 'Operations',
    title: 'Child attendance tracking',
    description:
      'Record check-ins and check-outs in seconds with clear status updates for every classroom.',
  },
  {
    eyebrow: 'Communication',
    title: 'Parent communication',
    description:
      'Share announcements, reminders, and quick updates so families stay informed throughout the day.',
  },
  {
    eyebrow: 'Reporting',
    title: 'Daily reports',
    description:
      'Deliver a polished summary of meals, naps, activities, and notes before pickup time.',
  },
]

function App() {
  return (
    <main className="page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Trusted childcare management</p>
          <h1>Daycare</h1>
          <p className="hero-text">
            A professional, family-friendly platform that helps centers stay organized,
            keep parents connected, and deliver confident care every day.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#features">
              Explore features
            </a>
            <a className="secondary-action" href="#trust">
              Why families trust us
            </a>
          </div>
          <ul className="hero-highlights" aria-label="Key service benefits">
            <li>Real-time classroom visibility</li>
            <li>Simple family communication</li>
            <li>Consistent daily reporting</li>
          </ul>
        </div>

        <aside className="hero-panel" aria-label="Daycare overview">
          <div className="panel-card spotlight">
            <span className="panel-label">Today&apos;s overview</span>
            <strong>42 children safely checked in</strong>
            <p>Attendance is current across every room with instant status visibility.</p>
          </div>
          <div className="panel-grid">
            <div className="panel-card">
              <span className="metric">98%</span>
              <p>Parent message open rate for important classroom updates.</p>
            </div>
            <div className="panel-card">
              <span className="metric">3 min</span>
              <p>Average time for staff to complete and send a daily report.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="trust-section" id="trust">
        <div>
          <p className="section-label">Built for confidence</p>
          <h2>Professional tools for the routines families depend on</h2>
        </div>
        <p className="section-text">
          Daycare supports dependable operations with a calm, trustworthy experience for
          administrators, educators, and parents.
        </p>
      </section>

      <section className="feature-section" id="features">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <p className="feature-eyebrow">{feature.eyebrow}</p>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
