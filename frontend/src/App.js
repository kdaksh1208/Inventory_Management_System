import React, { useState } from "react";
import InventoryCard from "./InventoryCard";
import Dashboard from "./Dashboard";

// Simple spinner component (save as Spinner.js or inline here)
function Spinner() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      minHeight: "100vh"
    }}>
      <div style={{
        border: "8px solid #e4eafc",
        borderTop: "8px solid #71b7e6",
        borderRadius: "50%",
        width: 60,
        height: 60,
        animation: "spin 1s linear infinite"
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

const roles = [
  { label: "Manufacturer", icon: "🏭" },
  { label: "Wholesaler", icon: "🚚" },
  { label: "Retailer", icon: "🏬" },
  { label: "Customer", icon: "🛒" }
];

const features = [
  { label: "Inventory", icon: "📦" },
  { label: "Orders", icon: "📝" },
  { label: "Payments", icon: "💳" },
  { label: "Support", icon: "🧑‍💼" },
  { label: "Analytics", icon: "📊" },
  { label: "Profile", icon: "👤" },
  { label: "Returns", icon: "↩️" },
  { label: "Warranty", icon: "🛡️" },
  { label: "Reports", icon: "📃" }
];

const dashCardStyle = {
  background: "#fff",
  borderRadius: 13,
  padding: 30,
  textAlign: "center",
  color: "#2e466a",
  fontWeight: 600,
  fontSize: 20,
  boxShadow: "0 4px 20px rgba(80,130,200,.07)",
  minHeight: 120
};

function App() {
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (r) => {
    setRole(r.label.toLowerCase());
    setShowLogin(true);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    // Simulate backend login
    if (email && password && role) {
      setLoading(true); // Show spinner
      setTimeout(() => {
        setLoading(false);
        setIsLoggedIn(true);
      }, 1200); // Spinner for 1.2 seconds
    } else {
      setError("Fill all fields correctly.");
    }
  };

  if (loading) return <Spinner />;
  if (isLoggedIn) return <Dashboard role={role} onLogout={() => {
    setIsLoggedIn(false); setShowLogin(false); setRole(""); setEmail(""); setPassword(""); setError("");
  }} />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(110deg, #e8effc 0%, #e6f6ed 100%)",
      fontFamily: "Segoe UI, Arial, sans-serif",
      display: "flex"
    }}>
      {/* Left Panel: Info and Options */}
      <div style={{
        flex: 1.1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        background: "rgba(100,180,255,0.10)",
        padding: "50px 0"
      }}>
        <h1 style={{ color: "#345678", fontSize: "36px", fontWeight: 700, marginBottom: 20 }}>
          Inventory Management <br />for Modern Teams
        </h1>
        <p style={{ fontSize: 18, color: "#576A7E", maxWidth: 420 }}>
          Fast, secure, and beautiful tools for managing stock, orders, payments and more. Choose your role below.
        </p>
        <div style={{ margin: "30px 0 18px", display: "flex", gap: 22 }}>
          {roles.map((r) => (
            <button key={r.label}
              style={{
                background: "#fff",
                border: "1.5px solid #b6c4e0",
                borderRadius: 11,
                fontSize: 17,
                color: "#234e7e",
                padding: "16px 22px 14px 22px",
                minWidth: 140,
                boxShadow: "0 2px 14px rgba(120,160,200,0.07)",
                cursor: "pointer"
              }}
              onClick={() => handleRoleSelect(r)}
            >
              <span style={{ fontSize: 28, marginRight: 5 }}>{r.icon}</span>
              {r.label}
            </button>
          ))}
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 18, marginTop: 55
        }}>
          {features.map((f) => (
            <div key={f.label}
              style={{
                background: "#f8fafc", borderRadius: 10,
                padding: "11px 17px", textAlign: "center",
                boxShadow: "0 2px 7px rgba(180,200,220,0.09)",
                border: "1px solid #e4e7ee"
              }}>
              <span style={{ fontSize: 27 }}>{f.icon}</span>
              <div style={{ fontSize: 14, marginTop: 7, color: "#667" }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Panel: Login and Image */}
      <div style={{
        flex: 0.95,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(90deg, #d3f1fc 80%, #fefaec 100%)",
      }}>
        <div style={{
          background: "#fff",
          borderRadius: 25,
          boxShadow: "0 6px 25px rgba(60,120,200,0.08)",
          padding: "40px 30px",
          maxWidth: 330,
          minWidth: 300,
          width: "100%",
          minHeight: 340,
          display: "flex", flexDirection: "column", justifyContent: "center"
        }}>
          {/* show login after role choose */}
          {!showLogin ? (
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=260&q=80"
                alt="portal"
                style={{
                  borderRadius: 14,
                  marginBottom: 20,
                  height: "70px",
                  width: "95px",
                  objectFit: "cover",
                  boxShadow: "0 2px 13px rgba(100,170,210,0.17)",
                  opacity: 0,
                  animation: "fade-in 1.2s forwards"
                }}
              />
              <style>{`
                @keyframes fade-in { to { opacity: 1; } }
              `}</style>
              <div style={{ color: "#19a89d", fontWeight: 600, fontSize: 19, margin: "8px 0 7px" }}>
                Welcome!
              </div>
              <div style={{ fontSize: 15, color: "#234e7e", marginBottom: 8 }}>
                Select your role at left to login.
              </div>
            </div>
          ) : (
            <>
              <h2 style={{ color: "#345678", fontWeight: 600, marginBottom: 14, fontSize: 20 }}>
                Login as {role.charAt(0).toUpperCase() + role.slice(1)}
              </h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    fontSize: 15,
                    padding: "7px 10px",
                    border: "1.5px solid #b6c4e0",
                    borderRadius: "7px",
                    marginBottom: 13,
                    boxSizing: "border-box",
                    background: "#f7f9fc"
                  }}
                />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    fontSize: 15,
                    padding: "7px 10px",
                    border: "1.5px solid #b6c4e0",
                    borderRadius: "7px",
                    marginBottom: 17,
                    boxSizing: "border-box",
                    background: "#f7f9fc"
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(90deg, #71b7e6 0%, #57e6ab 100%)",
                    border: "none",
                    borderRadius: "7px",
                    color: "#fff",
                    fontWeight: 600,
                    width: "100%",
                    padding: "11px",
                    fontSize: "16px",
                    cursor: "pointer"
                  }}
                >
                  Login
                </button>
                {error && (
                  <div style={{ color: "#d33", fontSize: 14, marginTop: 7, textAlign: "center" }}>{error}</div>
                )}
              </form>
              <button
                style={{
                  background: "#ececec",
                  border: "none",
                  borderRadius: "5px",
                  color: "#334e68",
                  fontWeight: 500,
                  padding: "8px 13px",
                  fontSize: "13px",
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(80,140,180,0.04)",
                  marginTop: "10px",
                  width: "100%"
                }}
                onClick={() => { setShowLogin(false); setRole(""); setEmail(""); setPassword(""); setError(""); }}
              >
                Choose another role
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
