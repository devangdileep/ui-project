import React from "react";
import { CalendarDays, MapPin, Pencil, Star } from "lucide-react";
import { demoPackages } from "../data";

function PackageCard({ item, isAgent, choosePackage, editPackage }) {
  return (
    <article className="card">
      <img src={item.image || demoPackages[0].image} alt={item.name} />

      <div className="card-body">
        <div className="card-top">
          <h3>{item.name}</h3>
          <span>
            <Star size={15} fill="currentColor" /> {item.rating}
          </span>
        </div>

        <p>
          <MapPin size={16} /> {item.place}
        </p>
        <p>
          <CalendarDays size={16} /> {item.days} days
        </p>
        <p>{item.description || "Comfortable tour package with transport, stay, and support."}</p>

        <div className="price">
          <strong>Rs. {Number(item.price).toLocaleString("en-IN")}</strong>

          {isAgent ? (
            <button onClick={() => editPackage(item)}>
              <Pencil size={16} /> Edit
            </button>
          ) : (
            <button onClick={() => choosePackage(item)}>Request</button>
          )}
        </div>
      </div>
    </article>
  );
}

export default PackageCard;
