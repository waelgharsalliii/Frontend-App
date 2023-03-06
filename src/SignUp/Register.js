import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      email == "" ||
      fname == "" ||
      lname == "" ||
      birthdate == "" ||
      password == "" ||
      phone == ""
    ) {
      toast.error("Please fill all required fields");
    } else {
      fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          fname,
          lname,
          birthdate,
          phone,
        }),
      })
        .then((data) => {
          toast.success("registered successfully", {
            duration: 3000,
          });
          setTimeout(() => navigate("/Login"), 5000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="Container">
      <div className="title">Registration</div>
      <Toaster position="top-center" reverseOrder={false} />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <label className="details">FirstName</label>
            <input
              value={fname}
              placeholder="firstname"
              id="firstname"
              type="text"
              name="firstname"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label className="details">LastName</label>
            <input
              value={lname}
              placeholder="lastname"
              id="lastname"
              type="text"
              name="lastname"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label className="details">Birthdate</label>
            <input
              value={birthdate}
              type="date"
              id="birthdate"
              name="birthdate"
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label className="details">Phone</label>
            <input
              value={phone}
              placeholder="phone"
              type="number"
              id="phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label className="details">Email</label>
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
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="***********"
              id="password"
              name="password"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-info">
          Register
        </button>
      </form>
      <div className="Login">
        <div>Already have an account?</div>
        <NavLink to="/Login">
          <button className="btn btn-primary">Login here</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
