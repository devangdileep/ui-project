import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PackagesPage from "./pages/PackagesPage.jsx";
import RequestPage from "./pages/RequestPage.jsx";
import MyOrdersPage from "./pages/MyOrdersPage.jsx";
import AgentPage from "./pages/AgentPage.jsx";
import { demoPackages } from "./data";
import { isSupabaseReady, supabase } from "./lib/supabase";

const emptyPackage = {
  name: "",
  place: "",
  type: "Mountains",
  days: 3,
  price: 9999,
  rating: 4.7,
  image: "",
  description: "",
};

const emptyRequest = {
  package_id: "",
  travel_date: "",
  people: 1,
  phone: "",
  note: "",
};

function App() {
  const [packages, setPackages] = useState(demoPackages);
  const [orders, setOrders] = useState([]);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const [authMode, setAuthMode] = useState("signin");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [request, setRequest] = useState(emptyRequest);
  const [packageForm, setPackageForm] = useState(emptyPackage);
  const [editingPackageId, setEditingPackageId] = useState(null);

  const isAgent = profile?.role === "agent";

  useEffect(() => {
    loadPackages();

    if (!isSupabaseReady) {
      setLoading(false);
      return;
    }

    getUserSession();

    const { data } = supabase.auth.onAuthStateChange(handleUserChange);

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && profile) {
      loadOrders(profile.role);
    }
  }, [session?.user?.id, profile?.role]);

  const visiblePackages = useMemo(() => {
    return packages.filter((item) => {
      const packageText = `${item.name} ${item.place} ${item.type}`.toLowerCase();
      const searchText = query.toLowerCase();
      const correctCategory = filter === "All" || item.type === filter;

      return correctCategory && packageText.includes(searchText);
    });
  }, [packages, query, filter]);

  async function getUserSession() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);

    if (data.session) {
      loadProfile(data.session);
    }

    setLoading(false);
  }

  function handleUserChange(_event, currentSession) {
    setSession(currentSession);

    if (currentSession) {
      loadProfile(currentSession);
    } else {
      setProfile(null);
      setOrders([]);
    }
  }

  async function loadProfile(currentSession) {
    const user = currentSession.user;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setProfile(data);
      return;
    }

    const newProfile = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.email,
      role: user.user_metadata?.role === "agent" ? "agent" : "customer",
    };

    const { data: createdProfile } = await supabase
      .from("profiles")
      .upsert(newProfile)
      .select()
      .single();

    setProfile(createdProfile || newProfile);
  }

  async function loadPackages() {
    if (!isSupabaseReady) {
      setPackages(demoPackages);
      return;
    }

    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setPackages(data?.length ? data : demoPackages);
    }
  }

  async function loadOrders(role = profile?.role) {
    if (!isSupabaseReady || !session) return;

    let orderQuery = supabase
      .from("orders")
      .select("*, packages(name, place, price)")
      .order("created_at", { ascending: false });

    if (role !== "agent") {
      orderQuery = orderQuery.eq("customer_id", session.user.id);
    }

    const { data, error } = await orderQuery;

    if (error) {
      setMessage(error.message);
    } else {
      setOrders(data || []);
    }
  }

  async function handleAuth(event) {
    event.preventDefault();
    setMessage("");

    if (!isSupabaseReady) {
      setMessage("Add your Supabase URL and anon key in .env.local first.");
      return;
    }

    const loginDetails = {
      email: authForm.email,
      password: authForm.password,
    };

    let result;

    if (authMode === "signup") {
      result = await supabase.auth.signUp({
        ...loginDetails,
        options: {
          data: {
            name: authForm.name || authForm.email,
            role: authForm.role,
          },
        },
      });
    } else {
      result = await supabase.auth.signInWithPassword(loginDetails);
    }

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(authMode === "signup" ? "Account created. Please sign in." : "Signed in successfully.");
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setMessage("Signed out.");
  }

  function choosePackage(item) {
    setRequest({ ...request, package_id: item.id });
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  }

  async function createOrder(event) {
    event.preventDefault();

    if (!session || isAgent) {
      setMessage("Please sign in as a customer to request a package.");
      return;
    }

    if (!isSupabaseReady) {
      setMessage("Connect Supabase before sending real package requests.");
      return;
    }

    const selectedPackage = packages.find((item) => item.id === request.package_id);

    if (!selectedPackage) {
      setMessage("Select a package first.");
      return;
    }

    const { error } = await supabase.from("orders").insert({
      package_id: selectedPackage.id,
      customer_id: session.user.id,
      customer_name: profile?.name || session.user.email,
      customer_email: session.user.email,
      phone: request.phone,
      travel_date: request.travel_date,
      people: Number(request.people),
      note: request.note,
      status: "pending",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setRequest(emptyRequest);
    setMessage("Request sent. A travel agent can now accept or decline it.");
    loadOrders("customer");
  }

  function editPackage(item) {
    setEditingPackageId(item.id);
    setPackageForm({
      name: item.name,
      place: item.place,
      type: item.type,
      days: item.days,
      price: item.price,
      rating: item.rating,
      image: item.image || "",
      description: item.description || "",
    });

    document.getElementById("agent")?.scrollIntoView({ behavior: "smooth" });
  }

  async function savePackage(event) {
    event.preventDefault();

    if (!isAgent) {
      setMessage("Only travel agents can manage packages.");
      return;
    }

    const packageData = {
      ...packageForm,
      days: Number(packageForm.days),
      price: Number(packageForm.price),
      rating: Number(packageForm.rating),
    };

    let result;

    if (editingPackageId) {
      result = await supabase.from("packages").update(packageData).eq("id", editingPackageId);
    } else {
      result = await supabase.from("packages").insert(packageData);
    }

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setPackageForm(emptyPackage);
    setEditingPackageId(null);
    setMessage(editingPackageId ? "Package updated." : "Package added.");
    loadPackages();
  }

  async function removePackage(id) {
    if (!window.confirm("Delete this package?")) return;

    const { error } = await supabase.from("packages").delete().eq("id", id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Package removed.");
      loadPackages();
    }
  }

  async function updateOrderStatus(id, status) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(`Request ${status}.`);
      loadOrders("agent");
    }
  }

  if (loading) {
    return <div className="center-screen">Loading travel portal...</div>;
  }

  return (
    <div>
      <Navbar />

      <main>
        <HomePage
          isSupabaseReady={isSupabaseReady}
          session={session}
          profile={profile}
          packages={packages}
          orders={orders}
          isAgent={isAgent}
        />

        <LoginPage
          session={session}
          profile={profile}
          authMode={authMode}
          setAuthMode={setAuthMode}
          authForm={authForm}
          setAuthForm={setAuthForm}
          handleAuth={handleAuth}
          signOut={signOut}
        />

        {message && <p className="message">{message}</p>}

        <PackagesPage
          query={query}
          setQuery={setQuery}
          filter={filter}
          setFilter={setFilter}
          visiblePackages={visiblePackages}
          isAgent={isAgent}
          choosePackage={choosePackage}
          editPackage={editPackage}
        />

        <RequestPage
          packages={packages}
          request={request}
          setRequest={setRequest}
          createOrder={createOrder}
        />

        {session && !isAgent && <MyOrdersPage orders={orders} />}

        <AgentPage
          isAgent={isAgent}
          packages={packages}
          orders={orders}
          packageForm={packageForm}
          setPackageForm={setPackageForm}
          editingPackageId={editingPackageId}
          savePackage={savePackage}
          editPackage={editPackage}
          removePackage={removePackage}
          updateOrderStatus={updateOrderStatus}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
