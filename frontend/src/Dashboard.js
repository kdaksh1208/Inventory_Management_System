import React from "react";
import InventoryCard from "./InventoryCard";
import AddProductForm from "./AddProductForm";
import OrdersCard from "./OrdersCard";
import PaymentsCard from "./PaymentsCard";
import UserProfile from "./UserProfile";


const features = [
  { label: "Orders", icon: "📝" },
  { label: "Payments", icon: "💳" },
  { label: "Support", icon: "🧑‍💼" },
  { label: "Analytics", icon: "📊" },
  { label: "Profile", icon: "👤" },
];

function Dashboard({ role, onLogout }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f8fd", padding: 35 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
        <h2 style={{ color: "#355C7D" }}>
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </h2>
        <button onClick={onLogout} style={{
          background: "#e26d5c", color: "white", border: "none", borderRadius: 7, padding: "8px 16px", fontWeight: 600, cursor: "pointer"
        }}>
          Log out
        </button>
      </div>
      {/* Inventory Table */}
      {role === "manufacturer" && <AddProductForm />}

      <InventoryCard />
      {(role === "retailer" || role === "customer") && <OrdersCard />}
      {(role === "retailer" || role === "wholesaler") && <PaymentsCard />}
      <UserProfile role={role} email={"example@email.com"} />


      {/* Other Features */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 32
      }}>
        {features.map(f => (
          <div key={f.label} style={{
            background: "#fff",
            borderRadius: 13,
            padding: 30,
            textAlign: "center",
            color: "#2e466a",
            fontWeight: 600,
            fontSize: 20,
            boxShadow: "0 4px 20px rgba(80,130,200,.07)",
            minHeight: 120
          }}>
            <div>{f.icon}</div>
            <div>{f.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
