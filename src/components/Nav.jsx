import { NavLink } from 'react-router-dom'
import './Nav.css'

function Nav() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" className="nav-brand">
          Daycare
        </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/child-profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Child Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/attendance" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Attendance
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
