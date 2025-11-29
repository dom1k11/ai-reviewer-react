import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">

      {/* Desktop buttons */}
      <div className="desktop-buttons">
        <Link to="/app">
          <button className="btn btn-secondary mx-2">Main Page</button>
        </Link>

        <Link to="/stats">
          <button className="btn btn-secondary mx-2">Stats</button>
        </Link>
      </div>
      <div className="right-side">
        <Link to="/login">
          <button className="btn btn-primary">Log in</button>
        </Link>
      </div>

      {/* Mobile menu */}
      <div className="mobile-only">
        <button
          className="btn btn-outline-light"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ☰ Menu
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu-custom">
            <Link to="/app">
              <button className="btn btn-secondary my-1">Main Page</button>
            </Link>

            <Link to="/stats">
              <button className="btn btn-secondary my-1">Stats</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-primary my-1">Log in</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
