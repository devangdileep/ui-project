import React from "react";
import { Check, X } from "lucide-react";

function OrderList({ orders, onStatus }) {
  if (!orders.length) {
    return <p className="muted">No requests yet.</p>;
  }

  return (
    <div className="table-list">
      {orders.map((order) => (
        <div className="row order-row" key={order.id}>
          <div>
            <strong>{order.packages?.name || "Package request"}</strong>
            <span>
              {order.customer_name} - {order.people} people - {order.travel_date}
            </span>
            {order.phone && <span>{order.phone}</span>}
            {order.note && <small>{order.note}</small>}
          </div>

          <span className={`status ${order.status}`}>{order.status}</span>

          {onStatus && order.status === "pending" && (
            <div className="actions">
              <button onClick={() => onStatus(order.id, "accepted")}>
                <Check size={16} /> Accept
              </button>
              <button onClick={() => onStatus(order.id, "declined")}>
                <X size={16} /> Decline
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default OrderList;
