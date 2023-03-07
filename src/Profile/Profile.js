import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "../styles/Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";




const Profile = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  

  useEffect(() => {
    const token = localStorage.getItem("token");
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
          .then((data) => {
            setUser(data);
          }
            )
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);



  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFname(user.fname);
      setLname(user.lname);
      setPass(user.password);
      setPhone(user.phone);
      setBirthdate(new Date(user.birthdate))
    }
  }, [user]);



  const LogoutHandler=()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  }





  const UpdateUser = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const userId = decoded.userId;
        await fetch(`http://localhost:3001/users/update/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            lname,
            email,
            password,
            phone,
            birthdate
          }),
        });
        console.log(email);
        toast('Good Job!', {
          icon: '👏',
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {user ? (
        <div className="Container">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="title">Profile</div>
          <h2 className="detail">You can update the details</h2>
          <div className="user-details">
            <div className="input-box">
              <label>First Name</label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Last Name</label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Birthdate</label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
          </div>
          <br />
          <button className="btn btn-info" onClick={UpdateUser}>
            Edit Profile
          </button>
          <NavLink to="/Login">
          <button className="btn btn-danger"  style={{position:"relative",left:"200px"}}   onClick={LogoutHandler}>Logout</button>
          </NavLink>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
