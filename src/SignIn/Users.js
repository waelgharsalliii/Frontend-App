import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import User from "./User";

const Users = () => {
  const [data, setData] = useState([]);


  


  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001/users`);
    const data = await response.json();
    setData(data.filter((user) => !user.isAdmin));
  };


  


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      { localStorage.getItem("Id") ? data.map((user, index) => (
        <User
        id={user._id}
          key={index}
          fname={user.fname}
          lname={user.lname}
          email={user.email}
          phone={user.phone}
          birthdate={user.birthdate}
        />
      )): (<div className="Loading">dear client you should sign in again next time</div>) }
    </div>
  );
};

export default Users;
