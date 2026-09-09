export default function ContactPage() {
  return (
    <div className="book-page book-page-content contact-page">
      <span className="chapter-label">chapter v</span>
      <a href="mailto:hello@rizqinr.dev" className="contact-email">
        hello@rizqinr.dev
      </a>
      <div className="contact-socials">
        <a
          href="https://github.com/rizqinrr"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social"
        >
          github
        </a>
        <a
          href="https://linkedin.com/in/rizqinrr"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social"
        >
          linkedin
        </a>
        <a
          href="https://twitter.com/rizqinrr"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social"
        >
          twitter
        </a>
      </div>
    </div>
  );
}
