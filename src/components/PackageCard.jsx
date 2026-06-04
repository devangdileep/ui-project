import React from "react";
import { Calendar, MapPin, Pencil, Star, ArrowRight } from "lucide-react";
import { demoPackages } from "../data";

function PackageCard({ item, isAgent, choosePackage, editPackage }) {
  
  // Clean rating displaying
  const ratingScore = Number(item.rating || 4.7).toFixed(1);

  return (
    <article className="card animate-fade-in-up">
      <div className="card-img-wrapper">
        <img 
          src={item.image || demoPackages[0].image} 
          alt={item.name} 
          loading="lazy" 
        />
        <div className="card-badge">{item.type}</div>
      </div>

      <div className="card-body">
        <div className="card-top">
          <h3>{item.name}</h3>
          <div className="rating-badge">
            <Star size={13} fill="currentColor" />
            <span>{ratingScore}</span>
          </div>
        </div>

        <div className="card-meta">
          <span>
            <MapPin size={14} /> {item.place}
          </span>
          <span>
            <Calendar size={14} /> {item.days} days
          </span>
        </div>

        <p className="card-desc">
          {item.description || "Comfortable tour package with high-end transport, hotel stays, and verified local guide support."}
        </p>

        <div className="price">
          <div className="price-details">
            <span className="price-label">Price per person</span>
            <strong className="price-amount">Rs. {Number(item.price).toLocaleString("en-IN")}</strong>
          </div>

          {isAgent ? (
            <button className="edit-button" onClick={() => editPackage(item)} title="Modify package details">
              <Pencil size={15} /> Edit
            </button>
          ) : (
            <button onClick={() => choosePackage(item)}>
              Book <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default PackageCard;
