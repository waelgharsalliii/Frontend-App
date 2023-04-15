import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer";
import "../../styles/Register.css";
import Card from "react-bootstrap/Card";
import { toast, Toaster } from "react-hot-toast";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const FetchClubs = async () => {
    const response = await fetch(`http://localhost:3001/clubs`);
    const data = await response.json();
    if (data) {
      setClubs(data);
    }
  };

  useEffect(() => {
    const Id = localStorage.getItem("Id");
    fetch(`http://localhost:3001/users/${Id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
    if (!clubs || clubs.length === 0) {
      FetchClubs();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFname(user.fname);
      setLname(user.lname);
      setProfilePic(user.profilePic);
    }
  }, [user]);

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("Id");
  };

  const PaymentHandler = async (e, club) => {
    e.preventDefault();
    const Id = localStorage.getItem("Id");
    const response = await fetch(
      `http://localhost:3001/api/${club._id}/${Id}/payment`,
      { method: "POST" }
    );
    const data = await response.json();
    const paymentId = data.result.link.substring(
      data.result.link.lastIndexOf("/") + 1
    );
    localStorage.setItem("paymentId", paymentId);
    localStorage.setItem("ClubId", club._id);
    if (response.ok) {
      window.location.href = data.result.link;
    }
  };

  const NavBarUser = (
    <div className="container-xxl position-relative p-0">
      <nav
        id="navbar"
        className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0"
      >
        <div className="navbar-brand">
          <img src="img/logo.png" alt="logo" className="navbar-logo" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <NavLink to="/home" className="nav-item nav-link active">
              Home
            </NavLink>
            <a href="" className="nav-item nav-link">
              About
            </a>
            <NavLink to="/EventsList" className="nav-item nav-link">
              Events
            </NavLink>
            <NavLink to="/payment" className="nav-item nav-link">
              Clubs
            </NavLink>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <img
                  src={`img/${profilePic}`}
                  alt="Image"
                  height="35"
                  width="35"
                  style={{
                    borderRadius: "50%",
                    border: "2px solid #ccc",
                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
                    padding: "2px",
                  }}
                />{" "}
                {fname} {lname}
              </a>
              <div className="dropdown-menu m-0">
                <NavLink to="/Profile" className="dropdown-item">
                  Edit Profile
                </NavLink>
                <NavLink
                  to="/Login"
                  className="dropdown-item"
                  onClick={LogoutHandler}
                >
                  Logout
                </NavLink>
                <a href="" className="dropdown-item">
                  About
                </a>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn text-secondary ms-3"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </nav>
      <div className="container-xxl py-5 bg-primary hero-header mb-5">
        <div className="container my-5 py-5 px-lg-5">
          <div className="row g-5 py-5">
            <div className="col-lg-6 text-center text-lg-start">
              {/* <h1 className="text-white mb-4 animated zoomIn">
                        All in one SEO tool need to grow your business rapidly
                      </h1>
                      <p className="text-white pb-3 animated zoomIn">
                        Tempor rebum no at dolore lorem clita rebum rebum ipsum rebum
                        stet dolor sed justo kasd. Ut dolor sed magna dolor sea diam.
                        Sit diam sit justo amet ipsum vero ipsum clita lorem
                      </p> */}
            </div>
            <div className="col-lg-6 text-center text-lg-start">
              <img className="img-fluid" src="" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="searchModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div
            className="modal-content"
            style={{ backgroundColor: "rgba(29, 29, 39, 0.7)" }}
          >
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn bg-white btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex align-items-center justify-content-center">
              <div className="input-group" style={{ maxWidth: "600px" }}>
                <input
                  type="text"
                  className="form-control bg-transparent border-light p-3"
                  placeholder="Type search keyword"
                />
                <button className="btn btn-light px-4">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {" "}
      {NavBarUser}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NavLink
          to="/MyClubs"
          style={{
            color: "#0056d2",
            fontFamily: "Source Sans Pro",
            fontWeight: "700",
            fontSize: "1rem",
          }}
        >
          View my clubs
        </NavLink>
        <ion-icon
          name="arrow-forward-outline"
          style={{ color: "#0056d2", paddingTop: "3px" }}
        ></ion-icon>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="welcome-message">
        <h1>
          Welcome to our club community! We're thrilled to have you here. Here's
          a list of the clubs you can explore and join
        </h1>
      </div>
      {clubs && clubs.length > 0 ? (
        clubs.map((club) => (
          <div className="div1">
            <Card style={{ width: "18rem", marginRight: "10px" }}>
              <Card.Img
                variant="top"
                src={process.env.PUBLIC_URL + `/img/${club.logo}`}
              />
              <Card.Body>
                <Card.Title>Club Name: {club.name}</Card.Title>
                <Card.Text>Club Description: {club.description}</Card.Text>
                <Card.Text>Club Address: {club.address}</Card.Text>
                <button
                  className="btn btn-secondary btn-icon-split"
                  style={{ marginTop: "5px" }}
                  onClick={(e) => PaymentHandler(e, club)}
                  disabled={user.clubs.includes(club._id) ? true : false}
                >
                  <span className="icon text-white-50">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                  <span className="text">
                    {" "}
                    {user.clubs.includes(club._id) ? "Already Joined" : "Join"}
                  </span>
                </button>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <div className="container-fluid">
          <div className="text-center" style={{ marginTop: "90px" }}>
            <div className="error mx-auto" data-text="404">
              404
            </div>
            <p className="lead text-gray-800 mb-5">No Clubs Found</p>
            <p className="text-gray-500 mb-0">
              It looks like you should get the hell out of here...
            </p>
            <NavLink to="/home">
              <a>&larr; Back to Home</a>
            </NavLink>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
