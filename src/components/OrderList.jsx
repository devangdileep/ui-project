import React from "react";
import { Check, X, Calendar, Users, Phone, FileText } from "lucide-react";

function getStatusText(status) {
  if (status === "accepted") return "Approved";
  if (status === "declined") return "Declined";
  return "Pending Approval";
}

function OrderList({ orders, onStatus }) {
  if (!orders.length) {
    return (
      <div style={{ textAlign: "center", padding: "30px 20px" }}>
        <p className="muted" style={{ fontSize: "1rem" }}>No requests logged yet.</p>
      </div>
    );
  }

  return (
    <div className="table-list">
      {orders.map((order) => (
        <div className="row order-row animate-fade-in-up" key={order.id}>
          <div className="row-info">
            <strong style={{ fontSize: "1.1rem" }}>{order.packages?.name || "Package Request"}</strong>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Users size={14} /> {order.people} {order.people === 1 ? "Traveler" : "Travelers"}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Calendar size={14} /> Date: {order.travel_date}
              </span>
              {order.phone && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Phone size={14} /> {order.phone}
                </span>
              )}
            </div>

            {order.customer_name && (
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2px" }}>
                By: {order.customer_name} ({order.customer_email || "N/A"})
              </span>
            )}
            
            {order.note && (
              <small>
                <span style={{ fontWeight: "600", color: "var(--primary)" }}>Inquiries:</span> {order.note}
              </small>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span className={`status ${order.status}`}>{getStatusText(order.status)}</span>

            {onStatus && order.status === "pending" && (
              <div className="order-actions">
                <button 
                  className="approve-btn" 
                  onClick={() => onStatus(order.id, "accepted")}
                  title="Approve booking request"
                >
                  <Check size={15} /> Approve
                </button>
                <button 
                  className="decline-btn" 
                  onClick={() => onStatus(order.id, "declined")}
                  title="Decline booking request"
                >
                  <X size={15} /> Decline
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
