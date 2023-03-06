import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "../styles/Register.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decoded = jwt_decode(token);
        console.log(decoded);
        const userId = decoded.userId;
        console.log(userId);
        fetch(`http://localhost:3001/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => setUser(data))
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div>
      {user ? (
        <div className="Container">
          <div className="title">Edit Profile</div>
          <div className="user-details">
          <div className="input-box">
          <label>First Name</label>
          <input type="text"  value={user.fname} />
          </div>
          <div className="input-box">
          <label>Last Name</label>
          <input type="text"  value={user.lname} />
          </div>
          <div className="input-box">
          <label>Email</label>
          <input type="text"  value={user.email} />
            </div>
            <div className="input-box">
          <label>Password</label>
          <input type="password"  value={user.password}  />
            </div>
            <div className="input-box">
          <label>Phone</label>
          <input type="text"  value={user.phone} />
            </div>
            <div className="input-box">
          <label>Birthdate</label>
          <input type="date"  value={user.birthdate} />
            </div>
          </div>
          <br />
          <button className="btn btn-info">Edit Profile</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
