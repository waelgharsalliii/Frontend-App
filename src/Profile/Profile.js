import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "../styles/Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { format } from "date-fns";





const Profile = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  

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
      setFname(user.fname);
      setLname(user.lname);
      setPhone(user.phone);
      setBirthdate(format(new Date(user.birthdate), "yyyy-MM-dd"));
    }
  }, [user]);



  const LogoutHandler=()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem("Id");
    navigate('/login');
  }





  const UpdateUser = async (event) => {
    event.preventDefault();
    const Nameregex = /^[A-Z][a-z]*$/;
    if (
      fname === "" ||
      lname === "" ||
      birthdate === "" ||
      phone === ""
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!lname.match(Nameregex) || !fname.match(Nameregex)) {
      toast.error("lname or fname must start with a capital letter and should only contain letters");
      return;
    }
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
            phone,
            birthdate
          }),
        });
        toast('User successfully updated !', {
          icon: '👏',
        });
        localStorage.removeItem('Id');
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = async (event) => {
    event.preventDefault();
    const Id = localStorage.getItem("Id");
    console.log(Id);
    console.log(oldPassword);
    await fetch(`http://localhost:3001/users/${Id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then((response) => {
        if (response.ok) {
            toast.success("Password updated successfully"); 
            localStorage.removeItem('Id');
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            response.json();
        } 
        else {
            toast.error("Error");
        }
    })
      .catch((error) => console.error(error));
  };


  const CancelChange =(event) => {
    event.preventDefault();
    localStorage.removeItem('Id');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    navigate('/Login');
  }

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
          <div className="Container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="title">Reset Password</div>
      <br />
      <form onSubmit={handleChange}>
        <div className="user-details">
          <div className="input-box">
            <label className="details">Old Password</label>
            <input
              value={oldPassword}
              placeholder="*************"
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label className="details">New Password</label>
            <input
              value={newPassword}
              placeholder="************"
              type="password"
              onChange={(e) => setnewPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-warning">Change Password</button>
        <button className="btn btn-danger cancel" onClick={CancelChange}>Cancel</button>
      </form>
    </div>
        </div>
      ) : (
        <p className="Loading">dear client you should sign in again next time</p>
      )}
    </div>
  );
};

export default Profile;
