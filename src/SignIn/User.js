import React from "react";
import "../styles/Register.css";

const User = (props) => {
  return (
    <div className="Container">
      <div className="input-box">
        <label className="details">FirstName</label>
        <p>{props.fname}</p>
        <label className="details">LastName</label>
        <p>{props.lname}</p>
        <label className="details">Email</label>
        <p>{props.email}</p>
        <label className="details">Phone</label>
        <p>{props.phone}</p>
        <label className="details">birthdate</label>
        <p>{props.birthdate}</p>
      </div>
    </div>
  );
};

export default User;
