import React from "react";
import { 
  Pencil, 
  Plus, 
  Trash2, 
  User, 
  Lock, 
  Package, 
  Clock, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import OrderList from "../components/OrderList.jsx";
import { packageTypes } from "../data";

function DashboardPage({
  session,
  profile,
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
  openPage,
}) {
  // If not logged in
  if (!session) {
    return (
      <section className="section animate-fade-in-up">
        <div style={{ maxWidth: "500px", margin: "40px auto", textAlign: "center" }} className="panel">
          <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "#f87171", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justify: "center", margin: "0 auto 20px" }}>
            <Lock size={28} />
          </div>
          <span className="eyebrow" style={{ color: "#f87171" }}>Access Denied</span>
          <h2 style={{ fontSize: "1.6rem", marginTop: "10px" }}>Dashboard Locked</h2>
          <p style={{ marginBottom: "24px" }}>Please log in to your account to view bookings, track packages, or access portal controls.</p>
          <button className="primary" style={{ width: "100%" }} onClick={() => openPage("/login")}>
            Sign In Now
          </button>
        </div>
      </section>
    );
  }

  // Calculate dynamic stats
  const totalPackages = packages.length;
  const totalRequests = orders.length;
  
  const pendingRequests = orders.filter(o => o.status === "pending").length;
  const approvedRequests = orders.filter(o => o.status === "accepted").length;
  const declinedRequests = orders.filter(o => o.status === "declined").length;

  const totalEarnings = orders
    .filter(o => o.status === "accepted")
    .reduce((sum, o) => {
      // Find package price
      const pkg = packages.find(p => p.id === o.package_id);
      const price = pkg ? Number(pkg.price) : 0;
      return sum + (price * (Number(o.people) || 1));
    }, 0);

  return (
    <section className="section animate-fade-in-up">
      <div className="section-title">
        <div>
          <span className="eyebrow">User Dashboard</span>
          <h2>Welcome, {profile?.name || session.user.email}</h2>
          <p style={{ textTransform: "capitalize", fontWeight: "600", color: varColor(profile?.role) }}>
            Role: {profile?.role || "Customer"}
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="secondary" onClick={() => openPage("/login")}>
            <User size={16} /> Profile Settings
          </button>
        </div>
      </div>

      {/* RENDER CUSTOMER VIEWS */}
      {!isAgent ? (
        <div className="requests-wrapper">
          {/* Customer Dynamic Stats Widgets */}
          <div className="dashboard-grid">
            <div className="dashboard-card primary-card">
              <div className="icon-box">
                <Package size={22} />
              </div>
              <div>
                <span>Total Bookings</span>
                <strong>{totalRequests}</strong>
              </div>
            </div>
            
            <div className="dashboard-card warning-card">
              <div className="icon-box">
                <Clock size={22} />
              </div>
              <div>
                <span>Awaiting Approval</span>
                <strong>{pendingRequests}</strong>
              </div>
            </div>

            <div className="dashboard-card accent-card">
              <div className="icon-box">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <span>Approved Trips</span>
                <strong>{approvedRequests}</strong>
              </div>
            </div>

            <div className="dashboard-card danger-card">
              <div className="icon-box">
                <XCircle size={22} />
              </div>
              <div>
                <span>Declined Trips</span>
                <strong>{declinedRequests}</strong>
              </div>
            </div>
          </div>

          <div className="dashboard-panel">
            <h3>
              <Clock size={20} /> My Travel Packages & Requests
            </h3>
            <OrderList orders={orders} />
          </div>
        </div>
      ) : (
        /* RENDER AGENT VIEWS */
        <div className="requests-wrapper">
          {/* Agent Dynamic Stats Widgets */}
          <div className="dashboard-grid">
            <div className="dashboard-card primary-card">
              <div className="icon-box">
                <TrendingUp size={22} />
              </div>
              <div>
                <span>Est. Revenue</span>
                <strong>Rs. {totalEarnings.toLocaleString("en-IN")}</strong>
              </div>
            </div>
            
            <div className="dashboard-card accent-card">
              <div className="icon-box">
                <Package size={22} />
              </div>
              <div>
                <span>Active Packages</span>
                <strong>{totalPackages}</strong>
              </div>
            </div>

            <div className="dashboard-card warning-card">
              <div className="icon-box">
                <Clock size={22} />
              </div>
              <div>
                <span>Pending Requests</span>
                <strong>{pendingRequests}</strong>
              </div>
            </div>

            <div className="dashboard-card primary-card" style={{ borderLeft: "4px solid var(--primary)" }}>
              <div className="icon-box">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <span>Total Requests Logged</span>
                <strong>{totalRequests}</strong>
              </div>
            </div>
          </div>

          <div className="agent-workspace">
            {/* Package Editor Side */}
            <div className="agent-sidebar">
              <div className="dashboard-panel">
                <h3>
                  <Plus size={20} /> {editingPackageId ? "Edit Travel Package" : "Create Travel Package"}
                </h3>
                <form className="booking-form" onSubmit={savePackage}>
                  <input
                    placeholder="Package Title (e.g. Alpine Getaway)"
                    value={packageForm.name}
                    onChange={(event) => setPackageForm({ ...packageForm, name: event.target.value })}
                    required
                  />
                  
                  <input
                    placeholder="Destination (e.g. Switzerland)"
                    value={packageForm.place}
                    onChange={(event) => setPackageForm({ ...packageForm, place: event.target.value })}
                    required
                  />

                  <select 
                    value={packageForm.type} 
                    onChange={(event) => setPackageForm({ ...packageForm, type: event.target.value })}
                  >
                    {packageTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>

                  <div className="two-col">
                    <input
                      type="number"
                      min="1"
                      placeholder="Duration (Days)"
                      value={packageForm.days}
                      onChange={(event) => setPackageForm({ ...packageForm, days: event.target.value })}
                      required
                    />
                    <input
                      type="number"
                      min="1"
                      placeholder="Price (per traveler)"
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
                    placeholder="Rating Score (1.0 - 5.0)"
                    value={packageForm.rating}
                    onChange={(event) => setPackageForm({ ...packageForm, rating: event.target.value })}
                  />
                  
                  <input
                    placeholder="Cover Image URL"
                    value={packageForm.image}
                    onChange={(event) => setPackageForm({ ...packageForm, image: event.target.value })}
                  />
                  
                  <textarea
                    placeholder="Detailed Description of the travels & stays..."
                    value={packageForm.description}
                    onChange={(event) => setPackageForm({ ...packageForm, description: event.target.value })}
                  />

                  <button className="primary" type="submit" style={{ width: "100%" }}>
                    <Plus size={18} /> {editingPackageId ? "Apply Changes" : "Publish Package"}
                  </button>
                </form>
              </div>
            </div>

            {/* Package Listing Side */}
            <div style={{ display: "grid", gap: "30px" }}>
              <div className="dashboard-panel">
                <h3>
                  <Package size={20} /> Managed Packages ({packages.length})
                </h3>
                <div className="table-list">
                  {packages.map((item) => (
                    <div className="row" key={item.id}>
                      <div className="row-info">
                        <strong>{item.name}</strong>
                        <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={14} /> {item.place}</span>
                          <span>|</span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><DollarSign size={14} /> Rs. {Number(item.price).toLocaleString("en-IN")}</span>
                        </span>
                      </div>

                      <div className="row-actions">
                        <button 
                          className="icon-btn" 
                          onClick={() => editPackage(item)} 
                          aria-label={`Edit ${item.name}`}
                          title="Edit package"
                        >
                          <Pencil size={15} />
                        </button>
                        <button 
                          className="icon-btn delete-btn" 
                          onClick={() => removePackage(item.id)} 
                          aria-label={`Delete ${item.name}`}
                          title="Delete package"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Requests List */}
              <div className="dashboard-panel">
                <h3>
                  <Calendar size={20} /> Client Bookings & Requests ({orders.length})
                </h3>
                <OrderList orders={orders} onStatus={updateOrderStatus} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Simple color indicator logic
function varColor(role) {
  return role === "agent" ? "var(--primary)" : "var(--accent)";
}

export default DashboardPage;
