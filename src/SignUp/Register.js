import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"






const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
 const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const navigate=useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3001/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fname,lname,birthdate,phone}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/Login");
      })
      .catch((error) => console.error(error));
  }





  return (
    <div className="Container">
      <div className="title">Registration</div>
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
          required
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
          required
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
          required
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
          required
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
          required
        />
        </div>

        <div className="input-box">
        <label className="details">Password</label>
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="text"
          placeholder="***********"
          id="password"
          name="password"
          required
        />
        </div>
        </div>
        <button type="submit" className="btn btn-info">Register</button>
      </form>
      <div className="Login">
      <div>Already have an account?</div>
      <button className="btn btn-primary">Login here</button>
      </div>
    </div>
  );
};

export default Register;
