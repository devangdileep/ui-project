import React from "react";
import { Search } from "lucide-react";
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
}) {
  return (
    <section className="section" id="packages">
      <div className="section-title">
        <div>
          <span className="eyebrow">Packages</span>
          <h2>Find a package and request a trip.</h2>
        </div>

        <label className="search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search destination" />
        </label>
      </div>

      <div className="filters">
        {["All", ...packageTypes].map((item) => (
          <button className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

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
    </section>
  );
}

export default PackagesPage;
