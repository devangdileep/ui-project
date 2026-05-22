import React, { useState } from "react";
import { Menu, Plane, X } from "lucide-react";

function Navbar({ page, openPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function goToPage(event, path) {
    event.preventDefault();
    setMenuOpen(false);
    openPage(path);
  }

  return (
    <header className="nav">
      <a className="brand" href="/" onClick={(event) => goToPage(event, "/")}>
        <Plane size={24} />
        Wanderly
      </a>

      <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={menuOpen ? "links open" : "links"}>
        <a className={page === "/" ? "active" : ""} href="/" onClick={(event) => goToPage(event, "/")}>Home</a>
        <a className={page === "/packages" ? "active" : ""} href="/packages" onClick={(event) => goToPage(event, "/packages")}>Packages</a>
        <a className={page === "/request" ? "active" : ""} href="/request" onClick={(event) => goToPage(event, "/request")}>Request</a>
        <a className={page === "/orders" ? "active" : ""} href="/orders" onClick={(event) => goToPage(event, "/orders")}>Orders</a>
        <a className={page === "/agent" ? "active" : ""} href="/agent" onClick={(event) => goToPage(event, "/agent")}>Agent</a>
        <a className={page === "/login" ? "active" : ""} href="/login" onClick={(event) => goToPage(event, "/login")}>Login</a>
      </nav>
    </header>
  );
}

export default Navbar;
