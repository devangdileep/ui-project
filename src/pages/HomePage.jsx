import React from "react";
import { 
  Mountain, 
  Palmtree, 
  MapPin, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Calendar,
  Globe
} from "lucide-react";
import PackageCard from "../components/PackageCard.jsx";

function HomePage({ packages, orders, openPage, setFilter }) {
  
  // Calculate dynamic stats
  const totalDestinations = packages.length;
  const bookingsSent = orders.length;
  
  // Compute dynamic average rating
  const avgRating = packages.length 
    ? (packages.reduce((acc, p) => acc + Number(p.rating || 0), 0) / packages.length).toFixed(1)
    : "4.8";

  // Categories list with matching styles
  const categories = [
    { name: "Mountains", icon: <Mountain size={28} />, desc: "Cool alpine resorts & treks", count: packages.filter(p => p.type === "Mountains").length },
    { name: "Beaches", icon: <Palmtree size={28} />, desc: "Sunny shorelines & resorts", count: packages.filter(p => p.type === "Beaches").length },
    { name: "Culture", icon: <Globe size={28} />, desc: "Historical tours & heritage", count: packages.filter(p => p.type === "Culture").length },
    { name: "Nature", icon: <Compass size={28} />, desc: "Scenic reserves & getaways", count: packages.filter(p => p.type === "Nature").length }
  ];

  // Get top 3 rated featured packages
  const featuredPackages = [...packages]
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, 3);

  function handleCategoryClick(catName) {
    setFilter(catName);
    openPage("/packages");
  }

  return (
    <div className="animate-fade-in-up">
      {/* Dynamic Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <span>Explore the Extraordinary</span>
          <h1>Your Next Adventure Awaits in Style.</h1>
          <p>
            Browse high-fidelity curated tours, request custom trip bookings, and track approvals instantly. Managed seamlessly by verified travel agents.
          </p>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button className="primary" onClick={() => { setFilter("All"); openPage("/packages"); }}>
              Explore Packages <ArrowRight size={18} />
            </button>
            <button className="secondary" onClick={() => openPage("/request")}>
              Book a Custom Trip
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Stats Panel */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <strong>{totalDestinations}</strong>
            <span>Verified Packages Available</span>
          </div>
          <div className="stat-item">
            <strong>{bookingsSent}</strong>
            <span>Trip Requests Handled</span>
          </div>
          <div className="stat-item">
            <strong style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
              {avgRating} <Star size={24} fill="var(--primary)" style={{ color: "var(--primary)" }} />
            </strong>
            <span>Average Satisfaction Score</span>
          </div>
        </div>
      </section>

      {/* Interactive Categories */}
      <section className="category-section">
        <span className="eyebrow">Quick Select</span>
        <h2>Choose Your Style of Escape</h2>
        <p style={{ marginBottom: "30px" }}>Click on any of our primary travel genres to filter packages instantly.</p>
        
        <div className="category-grid">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              className="category-card"
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="icon-holder">
                {cat.icon}
              </div>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
              <span className="eyebrow" style={{ fontSize: "0.72rem", margin: 0, color: "var(--text-muted)" }}>
                {cat.count} {cat.count === 1 ? "package" : "packages"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tours Grid */}
      <section className="featured-section">
        <div className="featured-header">
          <div>
            <span className="eyebrow">Top Rated</span>
            <h2>Wanderly Highlights</h2>
            <p>Our highest-rated customer experiences, loaded with premium support and accommodations.</p>
          </div>
          <button className="secondary" onClick={() => { setFilter("All"); openPage("/packages"); }}>
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid">
          {featuredPackages.map((item) => (
            <PackageCard
              key={item.id}
              item={item}
              isAgent={false}
              choosePackage={(pkg) => {
                setFilter("All");
                // Select package and go to request page
                openPage("/request");
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
