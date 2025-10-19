import React, { useEffect, useState } from "react";
function InventoryCard() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/stock")
      .then(res => res.json())
      .then(data => {
        setStock(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading inventory...</div>;
  return (
    <div style={{
      padding: 24, background: "#fff", borderRadius: 16,
      boxShadow: "0 2px 12px rgba(150,180,220,.07)", marginBottom: 24
    }}>
      <h3 style={{ color: "#355C7D", marginBottom: 14 }}>Inventory</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f7fd" }}>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price/Unit</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {stock.map(row => (
            <tr key={row.stock_id}>
              <td>{row.product_name}</td>
              <td>{row.quantity}</td>
              <td>{row.price_per_unit}</td>
              <td>{row.place_location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default InventoryCard;
