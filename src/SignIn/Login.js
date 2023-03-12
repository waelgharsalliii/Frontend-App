import React, {  useState } from "react";
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
    const Passregex=/^[a-zA-Z0-9]*$/;
    if (
      email === "" ||
      password === "" 
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      toast.error("Email should end with @gmail.com");
      return;
    }
    if (!password.match(Passregex)) {
      toast.error("Password should only contain letters or numbers");
      return;
    }
    let userFound = null;
    const response = await fetch(`http://localhost:3001/users`);
    const data = await response.json();
    console.log(data);
    userFound = data.find((user) => user.email === email);
    if (userFound) {
      localStorage.setItem("Id",userFound._id);
      if (userFound.isAdmin == true) {
        navigate("/users");  
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
          setTimeout(() => navigate("/Profile"), 3000);
        } else {
          toast("Login failed !", {
            icon: "😢",
          });
        }
      }
    }
    else {
      toast.error("Please check your email or password",{
        duration:3000
      })
    }
  };

  const ResetPass =(e)=> {
    e.preventDefault();
    navigate("/Reset");
  }



  


  return (
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
                top: "45%",
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
        <ion-icon name="log-out-outline"></ion-icon>
        <button className="google"><ion-icon name="logo-google"></ion-icon></button>
      </form>
      <div className="Login">
        <div style={{ textDecoration: "underline" }}>Don't have an account</div>
        <NavLink to="/Register">
          <button className="btn btn-primary">Register here</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
