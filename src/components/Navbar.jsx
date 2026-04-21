import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="nav-brand">
          devon<span>.</span>meyer
        </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Home</NavLink></li>
          <li><NavLink to="/portfolio" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Projects</NavLink></li>
          <li><NavLink to="/qualifications" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Experience</NavLink></li>
          <li><NavLink to="/books" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Books</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
