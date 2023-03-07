import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem('isLoggedIn', 'true');
      const isLoggedIn=localStorage.getItem("isLoggedIn")
      if (isLoggedIn==='true') {
        toast.success("Login successfully",{
          duration:8000
        })
      }
      setTimeout(()=> navigate("/Profile"),3000);
    } else {
      toast.error("Login failed",{
        duration:2000
      })
    }
  };

  return (
    <div className="Container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="title">Login</div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <label className="details">Email<ion-icon name="mail-outline"></ion-icon></label>
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***********"
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "40%",
                right: "30px",
                transform: "translateY(-10%)",
              }}
            >
              {passwordVisible ? (
                <i className="bi bi-eye-fill"></i>
              ) : (
                <i className="bi bi-eye-slash-fill"></i>
              )}
            </button>
              <a style={{position:"relative",top:"20px",textDecoration:"underline"}} href="">Forgot password ?</a>
          </div>
        </div>
        <button type="submit" className="btn btn-info">
          Login
        </button>
      </form>
      <div className="Login">
        <div style={{textDecoration:"underline"}}>Don't have an account</div>
        <NavLink to="/Register">
          <button className="btn btn-primary">Register here</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
