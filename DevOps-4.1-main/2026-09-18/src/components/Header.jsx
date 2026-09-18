import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Chapter and Co. home">
        <span className="brand-mark">C<span>&</span>C</span>
        <span className="brand-name">Chapter <em>& Co.</em></span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#books">Browse books</a>
        <a href="#about">About us</a>
        <a className="cart-link" href="#cart">Cart <span>0</span></a>
      </nav>
    </header>
  );
}

export default Header;
