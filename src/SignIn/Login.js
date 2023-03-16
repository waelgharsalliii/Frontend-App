import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

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
    const Passregex = /^[a-zA-Z0-9]*$/;
    if (email === "" || password === "") {
      toast.error("Please fill all required fields");
      return;
    }
    if (!password.match(Passregex)) {
      toast.error("Password should only contain letters or numbers");
      return;
    }
    let userFound = null;
    const response = await fetch(`http://localhost:3001/users`);
    const data = await response.json();
    userFound = data.find((user) => user.email === email);
    if (userFound) {
      localStorage.setItem("Id", userFound._id);
      if (userFound.isAdmin === true) {
        navigate("/Admin");
        return;
      } else {
        const response = await fetch("http://localhost:3001/users/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", "true");
          const isLoggedIn = localStorage.getItem("isLoggedIn");
          if (isLoggedIn === "true") {
            toast("Login successfully !", {
              icon: "😁",
            });
          }
          setTimeout(() => navigate("/User"), 3000);
        } else if (!userFound.isActivated) {
          toast(
            "Login failed, please verify your email to verify your account !",
            {
              icon: "😢",
            }
          );
        } else if (userFound.isBanned) {
          toast("Login failed, your account is banned !", {
            icon: "😢",
          });
        } else {
          toast.error("Please check your password", {
            duration: 3000,
          });
        }
      }
    } else {
      toast.error("Please check your email", {
        duration: 3000,
      });
    }
  };

  const ResetPass = (e) => {
    e.preventDefault();
    navigate("/Reset");
  };

  

  return (
    <div>
      <NavBar></NavBar>
      <div className="Container">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="title">Login</div>
        <br />
        <form onSubmit={handleSubmit}>
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
                id="email"
                name="email"
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
              />
              <button
                type="button"
                className="btn btn-outline-secondary sec"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  top: "39%",
                  right: "30px",
                  transform: "translateY(-50%)",
                }}
              >
                {passwordVisible ? (
                  <i className="bi bi-eye-fill"></i>
                ) : (
                  <i className="bi bi-eye-slash-fill"></i>
                )}
              </button>
              <a
                style={{
                  position: "relative",
                  top: "20px",
                  textDecoration: "underline",
                }}
                href=""
                onClick={ResetPass}
              >
                Forgot password ?
              </a>
            </div>
          </div>
          <button type="submit" className="btn btn-info">
            Login
          </button>
          <GoogleOAuthProvider clientId="982763108071-o9663lpdsg3b1qjibp6pj1ib4lm0r7p3.apps.googleusercontent.com">
            <div className="WithGoogle">
            <GoogleLogin 
              onSuccess={async (credentialResponse) => {
                const detail=jwt_decode(credentialResponse.credential)
                const response = await fetch(`http://localhost:3001/users`);
                const data =await response.json();
                const UserObject=data.filter((user)=>{
                  return user.email===detail.email
                })
                localStorage.setItem("Id",UserObject[0]._id);
                if (UserObject[0].isAdmin) {
                  navigate("/Admin");
                }
                else {
                  navigate("/User");
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            </div>
          </GoogleOAuthProvider>
        </form>
        <div className="Login">
          <div style={{ textDecoration: "underline" }}>
            Don't have an account
          </div>
          <NavLink to="/Register">
            <button className="btn btn-primary">Register here</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
