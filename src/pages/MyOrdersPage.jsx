import React from "react";
import OrderList from "../components/OrderList.jsx";

function MyOrdersPage({ orders }) {
  return (
    <section className="section">
      <span className="eyebrow">My orders</span>
      <h2>Track your package requests.</h2>
      <OrderList orders={orders} />
    </section>
  );
}

export default MyOrdersPage;
