import React from "react";
import { LogOut, ShieldCheck, User, Mail, Lock, PlusCircle } from "lucide-react";

function LoginPage({
  session,
  profile,
  authMode,
  setAuthMode,
  authForm,
  setAuthForm,
  handleAuth,
  signOut,
  openPage,
}) {
  return (
    <section className="section auth-grid animate-fade-in-up" id="login">
      <div className="auth-info">
        <span className="eyebrow">Access Hub</span>
        <h2>Wanderly Portal</h2>
        <p>
          Securely login or create an account. Customer portals let you book trips and trace order states; agent consoles allow package publishes and booking approvals.
        </p>

        {session && (
          <button className="secondary" onClick={signOut} style={{ width: "fit-content", marginTop: "15px" }}>
            <LogOut size={16} /> Terminate Session (Sign Out)
          </button>
        )}
      </div>

      {!session ? (
        <form className="panel" onSubmit={handleAuth} style={{ gap: "18px" }}>
          {/* Tab selections */}
          <div className="tabs">
            <button 
              type="button" 
              className={authMode === "signin" ? "active" : ""} 
              onClick={() => setAuthMode("signin")}
            >
              Sign In
            </button>
            <button 
              type="button" 
              className={authMode === "signup" ? "active" : ""} 
              onClick={() => setAuthMode("signup")}
            >
              Register / Sign Up
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}>Choose Role</label>
            <div className="role-row">
              <button
                type="button"
                className={authForm.role === "customer" ? "active" : ""}
                onClick={() => setAuthForm({ ...authForm, role: "customer" })}
              >
                <User size={16} /> Customer
              </button>

              <button
                type="button"
                className={authForm.role === "agent" ? "active" : ""}
                onClick={() => setAuthForm({ ...authForm, role: "agent" })}
              >
                <ShieldCheck size={16} /> Portal Agent
              </button>
            </div>
          </div>

          {authMode === "signup" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}>Display Name</label>
              <input
                placeholder="e.g. John Doe"
                value={authForm.name}
                onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })}
                required
              />
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}>Email Address</label>
            <input
              type="email"
              placeholder="e.g. john@wanderly.com"
              value={authForm.email}
              onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)" }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={authForm.password}
              onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
              required
            />
          </div>

          <button className="primary" type="submit" style={{ width: "100%", marginTop: "10px" }}>
            {authMode === "signup" ? (
              <>
                <PlusCircle size={18} /> Create Account
              </>
            ) : (
              "Authorize Access & Sign In"
            )}
          </button>
        </form>
      ) : (
        /* Render Signed In Info Card */
        <div className="panel signed-in">
          <User size={40} />
          <strong>{profile?.name || session.user.email}</strong>
          <span>Logged In as {profile?.role === "agent" ? "Verified Agent" : "Customer"}</span>
          
          <button className="primary" onClick={() => openPage("/dashboard")} style={{ width: "100%", marginTop: "15px" }}>
            Open Portal Dashboard
          </button>
        </div>
      )}
    </section>
  );
}

export default LoginPage;
