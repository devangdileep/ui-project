import React, { useMemo } from "react";
import { 
  Calendar, 
  Users, 
  Phone, 
  FileText, 
  DollarSign, 
  MapPin, 
  Tag, 
  AlertCircle,
  Clock
} from "lucide-react";

function RequestPage({ packages, request, setRequest, createOrder }) {
  
  // Find currently selected package
  const selectedPackage = useMemo(() => {
    return packages.find((p) => p.id === request.package_id);
  }, [packages, request.package_id]);

  // Calculate live pricing
  const numPeople = Number(request.people) || 1;
  const basePrice = selectedPackage ? Number(selectedPackage.price) : 0;
  const subtotal = basePrice * numPeople;
  const serviceFee = subtotal * 0.05; // 5% travel service fee
  const grandTotal = subtotal + serviceFee;

  return (
    <section className="section booking animate-fade-in-up" id="request">
      <div className="booking-header">
        <span className="eyebrow">Booking Portal</span>
        <h2>Book Your Travel Package</h2>
        <p>
          Fill in the details below to request a package booking. Travel agents will review your requests and update status shortly.
        </p>

        {/* Selected Package Highlight Box */}
        {selectedPackage ? (
          <div className="selected-package-box">
            <span>Currently Selected Package</span>
            <strong>{selectedPackage.name}</strong>
            <div style={{ display: "flex", gap: "15px", fontSize: "0.85rem", color: "var(--text)", marginTop: "4px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)" }}>
                <MapPin size={14} /> {selectedPackage.place}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)" }}>
                <Clock size={14} /> {selectedPackage.days} Days
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)" }}>
                <Tag size={14} /> {selectedPackage.type}
              </span>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px", background: "rgba(255, 255, 255, 0.03)", border: "1px dashed var(--border)", borderRadius: "12px", marginTop: "15px" }}>
            <AlertCircle size={20} style={{ color: "var(--primary)" }} />
            <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Please select a package from the dropdown to activate pricing details.</span>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gap: "30px" }}>
        {/* Booking Form Panel */}
        <form className="panel booking-form" onSubmit={createOrder}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}>Select Package</label>
            <select 
              value={request.package_id} 
              onChange={(event) => setRequest({ ...request, package_id: event.target.value })} 
              required
            >
              <option value="">Choose a tour package...</option>
              {packages.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name} ({item.place})
                </option>
              ))}
            </select>
          </div>

          <div className="two-col">
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}><Calendar size={13} /> Travel Date</label>
              <input
                type="date"
                value={request.travel_date}
                onChange={(event) => setRequest({ ...request, travel_date: event.target.value })}
                required
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}><Users size={13} /> Travelers count</label>
              <input
                type="number"
                min="1"
                placeholder="Travelers count"
                value={request.people}
                onChange={(event) => setRequest({ ...request, people: event.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}><Phone size={13} /> Mobile Contact</label>
            <input
              placeholder="e.g. +91 98765 43210"
              value={request.phone}
              onChange={(event) => setRequest({ ...request, phone: event.target.value })}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}><FileText size={13} /> Special Inquiries</label>
            <textarea
              placeholder="Add flight preference, dietary requests, room choices etc."
              value={request.note}
              onChange={(event) => setRequest({ ...request, note: event.target.value })}
            />
          </div>

          {/* Pricing Estimation display */}
          <div className="cost-calculator">
            <h4 style={{ fontSize: "1rem", color: "#ffffff", borderBottom: "1px solid var(--border)", paddingBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <DollarSign size={16} /> Cost Estimation Breakdown
            </h4>
            
            <div className="cost-row">
              <span>Tour Base Rate (per traveler)</span>
              <strong>Rs. {basePrice.toLocaleString("en-IN")}</strong>
            </div>
            
            <div className="cost-row">
              <span>Travelers</span>
              <strong>x {numPeople}</strong>
            </div>

            <div className="cost-row">
              <span>Subtotal</span>
              <strong>Rs. {subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="cost-row">
              <span>Booking Service Tax (5%)</span>
              <strong>Rs. {serviceFee.toLocaleString("en-IN")}</strong>
            </div>

            <div className="cost-row total-row">
              <strong>Grand Total Price</strong>
              <strong>Rs. {grandTotal.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <button className="primary" type="submit" style={{ width: "100%", marginTop: "10px" }}>
            Confirm & Send Request
          </button>
        </form>
      </div>
    </section>
  );
}

export default RequestPage;
