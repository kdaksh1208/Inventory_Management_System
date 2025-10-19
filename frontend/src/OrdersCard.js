import React, { useEffect, useState } from "react";

function OrdersCard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading orders...</div>;
  return (
    <div style={{
      padding: 24, background: "#fff", borderRadius: 16,
      boxShadow: "0 2px 12px rgba(150,180,220,.07)", marginBottom: 24
    }}>
      <h3 style={{ color: "#355C7D", marginBottom: 14 }}>Orders</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f7fd" }}>
            <th>Order ID</th>
            <th>Product</th>
            <th>Ordered By</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(row => (
            <tr key={row.order_id}>
              <td>{row.order_id}</td>
              <td>{row.product_name}</td>
              <td>{row.ordered_by}</td>
              <td>{row.order_date}</td>
              <td>{row.delivery_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default OrdersCard;
