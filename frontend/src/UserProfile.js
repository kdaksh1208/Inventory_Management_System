import React, { useState, useEffect } from "react";

function UserProfile({ role, email }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateMsg, setUpdateMsg] = useState("");

  useEffect(() => {
    // Fetch user details from backend based on email
    fetch(`http://127.0.0.1:5000/api/users?email=${email}`)
      .then(res => res.json())
      .then(data => {
        setUser(data[0] || null);
        setLoading(false);
      });
  }, [email]);

  if (loading) return <div>Loading profile...</div>;

  if (!user) return <div>User not found</div>;

  // Simple Update Handler (Expand as needed)
  const handleUpdate = e => {
    e.preventDefault();
    setUpdateMsg("Profile updated (simulate API call)");
  };

  return (
    <form onSubmit={handleUpdate} style={{ padding: 24, background: "#fff", borderRadius: 16, marginBottom: 24 }}>
      <h3 style={{ color: "#355C7D", marginBottom: 14 }}>User Profile</h3>
      <label>Name:</label>
      <input type="text" defaultValue={user.name} style={inputStyle} />
      <label>Email:</label>
      <input type="email" value={user.email} disabled style={inputStyle} />
      <label>Role:</label>
      <input type="text" value={role} disabled style={inputStyle} />
      <button type="submit" style={btnStyle}>Update Profile</button>
      {updateMsg && <div style={{ color: "green", marginTop: 8 }}>{updateMsg}</div>}
    </form>
  );
}

const inputStyle = {
  width: "100%",
  fontSize: 15,
  padding: 8,
  marginBottom: 10,
  borderRadius: 5,
  border: "1px solid #b6c4e0",
  boxSizing: "border-box"
};

const btnStyle = {
  background: "linear-gradient(90deg, #71b7e6 0%, #57e6ab 100%)",
  border: "none",
  borderRadius: 7,
  color: "#fff",
  fontWeight: 600,
  padding: 10,
  fontSize: 16,
  cursor: "pointer"
};

export default UserProfile;
