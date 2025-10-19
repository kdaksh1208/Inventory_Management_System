import React, { useEffect, useState } from "react";

function PaymentsCard() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Assuming you have payment API ready, else mock sample below
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/payments")
      .then(res => res.json())
      .then(data => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => {
        setPayments([]); // fallback empty
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading payments...</div>;

  return (
    <div style={{
      padding: 24, background: "#fff", borderRadius: 12,
      boxShadow: "0 3px 14px rgba(100,120,180,.07)", marginBottom: 24
    }}>
      <h3 style={{ color: "#355C7D", marginBottom: 14 }}>Payments</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f7fd" }}>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: "center", padding: 14 }}>No payments found</td></tr>
          ) : (
            payments.map(p => (
              <tr key={p.payment_id}>
                <td>{p.payment_id}</td>
                <td>{p.order_id}</td>
                <td>{p.amount}</td>
                <td>{p.status}</td>
                <td>{p.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsCard;
