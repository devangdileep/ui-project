import React from "react";
import { Search, Compass } from "lucide-react";
import PackageCard from "../components/PackageCard.jsx";
import { packageTypes } from "../data";

function PackagesPage({
  query,
  setQuery,
  filter,
  setFilter,
  visiblePackages,
  isAgent,
  choosePackage,
  editPackage,
  packages,
}) {
  return (
    <section className="section animate-fade-in-up" id="packages">
      <div className="section-title">
        <div>
          <span className="eyebrow">Curated Collections</span>
          <h2>Explore Travel Packages</h2>
          <p>Find professionally organized tours and travels. Send booking requests instantly.</p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <label className="search">
            <Search size={18} />
            <input 
              value={query} 
              onChange={(event) => setQuery(event.target.value)} 
              placeholder="Search destination, tour title..." 
            />
          </label>
        </div>
      </div>

      <div className="filters">
        {["All", ...packageTypes].map((item) => {
          const count = item === "All"
            ? packages.length
            : packages.filter(p => p.type === item).length;

          return (
            <button 
              className={filter === item ? "active" : ""} 
              key={item} 
              onClick={() => setFilter(item)}
            >
              {item}
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      {visiblePackages.length > 0 ? (
        <div className="grid">
          {visiblePackages.map((item) => (
            <PackageCard
              key={item.id}
              item={item}
              isAgent={isAgent}
              choosePackage={choosePackage}
              editPackage={editPackage}
            />
          ))}
        </div>
        
      ) : (
        <div style={{ textAlign: "center", padding: "60px 20px" }} className="panel">
          <Compass size={40} style={{ color: "var(--primary)", marginBottom: "15px", opacity: 0.6 }} />
          <h3>No Packages Found</h3>
          <p>We couldn't find any packages matching "{query}" under "{filter}". Try adjusting your search query or category filters.</p>
        </div>
      )}
    </section>
  );
}

export default PackagesPage;
