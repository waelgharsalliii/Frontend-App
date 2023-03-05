import React, { useState } from "react";
import "../styles/Register.css"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="Container">
      <div className="title">Login</div>
      <br />
      <form  onSubmit={handleSubmit}>
        <div className="user-details">
        <div className="input-box"> 
        <label className="details">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@gmail.com"
          id="email"
          name="email"
          required
        />
        </div>
        <div className="input-box"> 
        <label className="details">Password</label>
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="***********"
          id="password"
          name="password"
          required
        />
        </div>
        </div>
        <button type="submit" className="btn btn-info">Login</button>
      </form>
      <div className="Login">
      <div>Don't have an account</div>
      <button className="btn btn-primary">Register here</button>
      </div>
    </div>
  );
};

export default Login;
