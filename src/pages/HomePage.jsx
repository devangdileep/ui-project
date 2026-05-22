import React from "react";
import { services } from "../data";

function HomePage({ isSupabaseReady, session, profile, packages, orders, isAgent }) {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-text">
          <span>Tours and travels portal</span>
          <h1>Book trips, manage packages, and track requests.</h1>
          <p>
            Customers can request a package. Travel agents can add, edit, remove packages and accept or decline requests.
          </p>
          <a className="primary" href="#packages">Explore packages</a>
        </div>
      </section>

      {!isSupabaseReady && (
        <section className="notice section">
          <strong>Supabase setup needed</strong>
          <span>Create `.env.local` from `.env.example` and run `supabase/schema.sql` in your Supabase SQL editor.</span>
        </section>
      )}

      <section className="section intro">
        <div>
          <span className="eyebrow">Live roles</span>
          <h2>{session ? `Welcome, ${profile?.name || session.user.email}` : "Login as customer or travel agent."}</h2>
        </div>

        <div className="stats">
          <strong>{packages.length}</strong>
          <span>Packages</span>

          <strong>{orders.length}</strong>
          <span>{isAgent ? "Requests" : "My orders"}</span>

          <strong>{profile?.role === "agent" ? "Agent" : "User"}</strong>
          <span>Current role</span>
        </div>
      </section>

      <section className="section services">
        <div>
          <span className="eyebrow">Services</span>
          <h2>Travel work handled in one portal.</h2>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
