import React, { useState } from "react";
import { Menu, Plane, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <a className="brand" href="#home">
        <Plane size={24} />
        Wanderly
      </a>

      <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={menuOpen ? "links open" : "links"}>
        <a href="#packages">Packages</a>
        <a href="#request">Request</a>
        <a href="#agent">Agent</a>
        <a href="#login">Login</a>
      </nav>
    </header>
  );
}

export default Navbar;
