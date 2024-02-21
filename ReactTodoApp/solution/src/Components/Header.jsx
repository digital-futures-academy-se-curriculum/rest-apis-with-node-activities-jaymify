import { Link, NavLink } from 'react-router-dom';

import logo from './images/logo.svg';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm">
        <Link to="https://www.digitalfutures.com" className="navbar-brand" target="_blank" rel="noreferrer">
          <img src={logo} alt="Digital Futures" width="100" />
        </Link>
        <Link to="/" className="navbar-brand">Todo App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li>
              <NavLink to="/" className="nav-link" activeClassName="nav-link active">
                All Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" className="nav-link" activeClassName="nav-link active">
                Add Todo
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;