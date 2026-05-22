import React from "react";
import OrderList from "../components/OrderList.jsx";

function MyOrdersPage({ orders, session, isAgent, openPage }) {
  if (!session || isAgent) {
    return (
      <section className="section">
        <span className="eyebrow">My orders</span>
        <h2>Customer orders page.</h2>
        <p>Please login as a customer to see your package requests.</p>
        <button className="primary" onClick={() => openPage("/login")}>Go to login</button>
      </section>
    );
  }

  return (
    <section className="section">
      <span className="eyebrow">My orders</span>
      <h2>Track your package requests.</h2>
      <OrderList orders={orders} />
    </section>
  );
}

export default MyOrdersPage;
