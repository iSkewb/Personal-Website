export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} Devon Meyer — built with React + Vite.</p>
        <div className="footer-links">
          <a href="mailto:dbmeyer95@gmail.com">dbmeyer95@gmail.com</a>
          <a href="https://github.com/dbmeyer95" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
