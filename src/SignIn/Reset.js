import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Reset = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const navigate=useNavigate();

  const handleChange = async (event) => {
    event.preventDefault();
    const Id = localStorage.getItem("Id");
    console.log(Id);
    console.log(oldPassword);
    await fetch(`http://localhost:3001/users/${Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then((response) => {
        if (response.ok) {
            toast.success("Password updated successfully"); 
            localStorage.removeItem('Id');
            response.json();
            setTimeout(() => navigate("/Login"), 3000);
        } 
        else {
            toast.error("Error");
        }
    })
      .catch((error) => console.error(error));
  };


  const CancelChange =(event) => {
    event.preventDefault();
    localStorage.removeItem('Id');
    navigate('/Login');
  }

  return (
    <div className="Container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="title">Reset Password</div>
      <br />
      <form onSubmit={handleChange}>
        <div className="user-details">
          <div className="input-box">
            <label className="details">Old Password</label>
            <input
              value={oldPassword}
              placeholder="Old Password"
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label className="details">New Password</label>
            <input
              value={newPassword}
              placeholder="New Password"
              type="password"
              onChange={(e) => setnewPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-warning">Change Password</button>
        <button className="btn btn-danger cancel" onClick={CancelChange}>Cancel</button>
      </form>
    </div>
  );
};

export default Reset;
