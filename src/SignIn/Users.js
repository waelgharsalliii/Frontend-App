import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import User from "./User";

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/users`);
      const data = await response.json();
      console.log(data);
      setData(data.filter((user) => !user.isAdmin));
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((user, index) => (
        <User
        id={user._id}
          key={index}
          fname={user.fname}
          lname={user.lname}
          email={user.email}
          phone={user.phone}
          birthdate={user.birthdate}
        />
      ))}
    </div>
  );
};

export default Users;
