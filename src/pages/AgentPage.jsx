import React from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import OrderList from "../components/OrderList.jsx";
import { packageTypes } from "../data";

function AgentPage({
  isAgent,
  packages,
  orders,
  packageForm,
  setPackageForm,
  editingPackageId,
  savePackage,
  editPackage,
  removePackage,
  updateOrderStatus,
}) {
  return (
    <section className="section agent" id="agent">
      <div className="section-title">
        <div>
          <span className="eyebrow">Admin dashboard</span>
          <h2>Manage packages and customer requests.</h2>
        </div>

        {!isAgent && <p className="muted">Sign in as an admin to unlock these tools.</p>}
      </div>

      {isAgent && (
        <div className="dashboard">
          <form className="panel" onSubmit={savePackage}>
            <h3>{editingPackageId ? "Edit package" : "Add package"}</h3>

            <input
              placeholder="Package name"
              value={packageForm.name}
              onChange={(event) => setPackageForm({ ...packageForm, name: event.target.value })}
              required
            />
            <input
              placeholder="Place"
              value={packageForm.place}
              onChange={(event) => setPackageForm({ ...packageForm, place: event.target.value })}
              required
            />

            <select value={packageForm.type} onChange={(event) => setPackageForm({ ...packageForm, type: event.target.value })}>
              {packageTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <div className="two-col">
              <input
                type="number"
                min="1"
                placeholder="Days"
                value={packageForm.days}
                onChange={(event) => setPackageForm({ ...packageForm, days: event.target.value })}
                required
              />
              <input
                type="number"
                min="1"
                placeholder="Price"
                value={packageForm.price}
                onChange={(event) => setPackageForm({ ...packageForm, price: event.target.value })}
                required
              />
            </div>

            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              placeholder="Rating"
              value={packageForm.rating}
              onChange={(event) => setPackageForm({ ...packageForm, rating: event.target.value })}
            />
            <input
              placeholder="Image URL"
              value={packageForm.image}
              onChange={(event) => setPackageForm({ ...packageForm, image: event.target.value })}
            />
            <textarea
              placeholder="Description"
              value={packageForm.description}
              onChange={(event) => setPackageForm({ ...packageForm, description: event.target.value })}
            />

            <button className="primary" type="submit">
              <Plus size={18} /> {editingPackageId ? "Update package" : "Add package"}
            </button>
          </form>

          <div className="panel">
            <h3>Package list</h3>
            <div className="table-list">
              {packages.map((item) => (
                <div className="row" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.place} - Rs. {Number(item.price).toLocaleString("en-IN")}</span>
                  </div>

                  <button onClick={() => editPackage(item)} aria-label={`Edit ${item.name}`}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => removePackage(item.id)} aria-label={`Delete ${item.name}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="panel request-panel">
            <h3>Customer requests</h3>
            <OrderList orders={orders} onStatus={updateOrderStatus} />
          </div>
        </div>
      )}
    </section>
  );
}

export default AgentPage;
