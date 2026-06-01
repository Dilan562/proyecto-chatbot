import '../Styles/Footer.css';

function Footer() {
  return (
    <div
      className="Footer"
      style={{ textAlign: "center", padding: "20px", color: "#555" }}
    >
      <div>
        <p>© 2026 Placitas. Todos los derechos reservados.</p>
        <p>Contacto: pqrs@placitas.com | Teléfono: +1 (555) 123-4567</p>
      </div>
      <div className="social-icons" style={{ marginTop: "10px" }}>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="/facebook.png"  alt="Facebook" className="social-icon" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <img src="/X.png" alt="Twitter" className="social-icon" />
        </a>
        <a href="https://www.instagram.com/?hl=es" target="_blank" rel="noopener noreferrer">
          <img src="/instagram.png" alt="Instagram" className="social-icon" />
        </a>
      </div>
    </div>
  );
}
export default Footer;
