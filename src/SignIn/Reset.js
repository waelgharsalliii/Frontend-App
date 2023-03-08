import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Reset = () => {
  const [old, setOld] = useState("");
  const [newP, setnewP] = useState("");
  const navigate=useNavigate();

  const handleChange = async (event) => {
    event.preventDefault();
    const Id = localStorage.getItem("Id");
    console.log(Id);
    fetch(`http://localhost:3001/users/${Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ old, newP }),
    })
      .then((response) => {
        if (response.ok) {
            toast.success("Password updated successfully"); 
            localStorage.removeItem('Id');
            response.json();
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
              value={old}
              placeholder="Old Password"
              type="password"
              onChange={(e) => setOld(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label className="details">New Password</label>
            <input
              value={newP}
              placeholder="New Password"
              type="password"
              onChange={(e) => setnewP(e.target.value)}
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
