import React from "react";

function HomePage({ openPage }) {
  function goToPackages(event) {
    event.preventDefault();
    openPage("/packages");
  }

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-text">
          <span>Tours and travels portal</span>
          <h1>Book trips, manage packages, and track requests.</h1>
          <p>
            Customers can request a package. Agents can add, edit, remove packages and accept or decline requests.
          </p>
          <a className="primary" href="/packages" onClick={goToPackages}>Explore packages</a>
        </div>
      </section>
    </>
  );
}

export default HomePage;
