import React, { useState } from "react";
import "../styles/Register.css";


const Reset = () => {


    const RetrievePassword=async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:3001/users/forgot-password`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
    }


    const [email,setEmail]=useState();

  return (
    <div className="Container">
      <div className="title">Email</div>
      <br />
      <form>
        <div className="user-details">
          <div className="input-box">
            <label className="details">
              Email<ion-icon name="mail-outline"></ion-icon>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@gmail.com"
              required
            />
          </div>
          </div>
          <button className="btn btn-success" onClick={RetrievePassword}>Retrieve Password</button>
          </form>
          </div>
  )
};

export default Reset;
