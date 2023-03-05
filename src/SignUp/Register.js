import React, { useState } from "react";
import "../styles/Register.css"
import axios from "axios";




const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
 const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email:email,
      password:password,
      fname:fname,
      lname:lname,
      birthdate:birthdate,
      phone:phone
    };
    try {
      await axios.post("http://localhost:3001/users/signup", userData);
      console.log('User created successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };



  const passChangeHandler = (event) => {
    setPass(event.target.value);
  };



  const fnameChangeHandler = (event) => {
    setFname(event.target.value);
  };


  const lnameChangeHandler = (event) => {
    setLname(event.target.value);
  };

  
  const birthdateChangeHandler = (event) => {
    setBirthdate(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };



  return (
    <div className="auth-form-container">
      <form className="formInput" onSubmit={handleSubmit}>
        <label htmlFor="fname">FirstName</label>
        <input
          value={fname}
          placeholder="firstname"
          id="firstname"
          type="text"
          name="firstname"
          onChange={(e) => setFname(e.target.value)}
        />

        <label htmlFor="Lname">LastName</label>
        <input
          value={lname}
          placeholder="lastname"
          id="lastname"
          type="text"
          name="lastname"
          onChange={(e) => setLname(e.target.value)}
        />

        <label htmlFor="birthdate">Birthdate</label>
        <input
          value={birthdate}
          type="date"
          id="birthdate"
          name="birthdate"
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <label htmlFor="phone">Phone</label>
        <input
          value={phone}
          placeholder="phone"
          type="number"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="text"
          placeholder="***********"
          id="password"
          name="password"
        />
        <button type={"submit"}>Registre</button>
      </form>
      <button className="btn btn-primary">Already have an account? Login here .</button>
    </div>
  );
};

export default Register;
