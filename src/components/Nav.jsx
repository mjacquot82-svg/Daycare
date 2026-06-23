import './Nav.css'

function Nav({ currentPage, onNavigate }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <button
          className="site-logo"
          onClick={() => onNavigate('home')}
          aria-label="Go to home page"
        >
          Daycare
        </button>
        <nav className="site-nav" aria-label="Primary navigation">
          <button
            className={`nav-link${currentPage === 'home' ? ' nav-link--active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-link${currentPage === 'child-profile' ? ' nav-link--active' : ''}`}
            onClick={() => onNavigate('child-profile')}
          >
            Child Profile
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Nav
