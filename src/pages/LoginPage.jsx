import React from "react";
import { LogOut, ShieldCheck, User } from "lucide-react";

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
    <section className="section auth-grid" id="login">
      <div>
        <span className="eyebrow">Account</span>
        <h2>Sign in or create an account.</h2>
        <p>Choose customer for booking packages or agent for managing packages and requests.</p>

        {session && (
          <button className="secondary" onClick={signOut}>
            <LogOut size={18} /> Sign out
          </button>
        )}
      </div>

      {!session ? (
        <form className="panel" onSubmit={handleAuth}>
          <div className="tabs">
            <button type="button" className={authMode === "signin" ? "active" : ""} onClick={() => setAuthMode("signin")}>
              Sign in
            </button>
            <button type="button" className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>
              Sign up
            </button>
          </div>

          <div className="role-row">
            <button
              type="button"
              className={authForm.role === "customer" ? "active" : ""}
              onClick={() => setAuthForm({ ...authForm, role: "customer" })}
            >
              <User size={17} /> Customer
            </button>

            <button
              type="button"
              className={authForm.role === "agent" ? "active" : ""}
              onClick={() => setAuthForm({ ...authForm, role: "agent" })}
            >
              <ShieldCheck size={17} /> Agent
            </button>
          </div>

          {authMode === "signup" && (
            <input
              placeholder="Full name"
              value={authForm.name}
              onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={authForm.email}
            onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={authForm.password}
            onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
            required
          />

          <button className="primary" type="submit">
            {authMode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>
      ) : (
        <div className="panel signed-in">
          <User size={34} />
          <strong>{profile?.name || session.user.email}</strong>
          <span>{profile?.role === "agent" ? "Agent" : "Customer"}</span>
          {profile?.role === "agent" ? (
            <button className="primary" onClick={() => openPage("/agent")}>Open agent dashboard</button>
          ) : (
            <button className="primary" onClick={() => openPage("/orders")}>View my orders</button>
          )}
        </div>
      )}
    </section>
  );
}

export default LoginPage;
