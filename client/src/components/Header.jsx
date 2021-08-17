import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__title">
        <h1>Pendulums</h1>
      </div>
      <nav className="header__nav">
        <Link to="/">home</Link>
        <Link to="/documentation">Documentation</Link>
      </nav>
    </header>
  );
};

export default Header;
