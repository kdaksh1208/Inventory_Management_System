import React, { useState } from "react";

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: productName,
          company_name: companyName,
          device_type: deviceType,
          base_price: basePrice
        }),
      });
      if (res.status === 201) {
        setSuccess("Product added successfully!");
        setProductName(""); setCompanyName(""); setDeviceType(""); setBasePrice("");
      } else {
        setError("Failed to add product.");
      }
    } catch {
      setError("Server error.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 2px 12px rgba(150,180,220,.08)", padding: "24px", marginBottom: "24px"}}
    >
      <h3 style={{ color: "#355C7D", marginBottom: 14 }}>Add New Product</h3>
      <input type="text" value={productName} required placeholder="Product Name" onChange={e => setProductName(e.target.value)} style={inputStyle} />
      <input type="text" value={companyName} required placeholder="Company Name" onChange={e => setCompanyName(e.target.value)} style={inputStyle} />
      <input type="text" value={deviceType} required placeholder="Device Type" onChange={e => setDeviceType(e.target.value)} style={inputStyle} />
      <input type="number" value={basePrice} required placeholder="Base Price" onChange={e => setBasePrice(e.target.value)} style={inputStyle} />
      <button type="submit" style={btnStyle}>Add Product</button>
      {success && <div style={{ color: "green", marginTop: 8 }}>{success}</div>}
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
}

const inputStyle = {
  width: "100%",
  fontSize: "15px",
  padding: "9px 12px",
  border: "1.3px solid #b6c4e0",
  borderRadius: "7px",
  marginBottom: "12px",
  boxSizing: "border-box",
  background: "#f5f9fa"
};

const btnStyle = {
  width: "100%",
  background: "linear-gradient(90deg, #71b7e6 0%, #57e6ab 100%)",
  border: "none",
  borderRadius: "7px",
  color: "#fff",
  fontWeight: 600,
  padding: "11px",
  fontSize: "16px",
  cursor: "pointer",
  marginBottom: "8px"
};

export default AddProductForm;
