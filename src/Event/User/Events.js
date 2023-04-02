import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../../components/Footer';
import Card from "react-bootstrap/Card";
import { format } from "date-fns";
import { Toaster, toast } from 'react-hot-toast';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


export default function Events() {

  const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [events,setEvents]=useState([]);


  useEffect(() => {
    fetch(`http://localhost:3001/events`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);


  useEffect(() => {
    const Id = localStorage.getItem("Id");
    fetch(`http://localhost:3001/users/${Id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
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
                <NavLink to="/payment"  className="nav-item nav-link">
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
   

      const handleEventClick = (arg) => {
        const event = arg.event._def.extendedProps;
        const EventTitle=arg.event._def.title;
        const Id = localStorage.getItem("Id");
        JoinHandler(event, Id,EventTitle);
      }
    
      const JoinHandler = async (event, Id,EventTitle) => {
        try {
          const response = await fetch(`http://localhost:3001/events/${event.organizer}/${event._id}/join/${Id}`, {
            method: "POST",
          });
          if (response.ok) {
            toast.success(`You have just joined the event ${EventTitle}`);
          } else {
            const errorResponse = await response.json();
            toast.error(errorResponse.message);
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while trying to join the event");
        }
      }

      const handleDateClick = (arg) => {
        const calendarApi = arg.view.calendar;
        const year = arg.date.getFullYear();
        calendarApi.gotoDate(`${year}-01-01`); // change the displayed year
      }

      
    
  return (
    <div>
      {NavBarUser}
      <Toaster position="top-center" reverseOrder={false} />
       <div style={{ display: "flex", justifyContent: "flex-end",position:"relative",bottom:"100px" }}>
        <NavLink
          to="/MyEvents"
          style={{
            color: "#0056d2",
            fontFamily: "Source Sans Pro",
            fontWeight: "700",
            fontSize: "1rem",
          }}
        >
          View my events
        </NavLink>
        <ion-icon
          name="arrow-forward-outline"
          style={{ color: "#0056d2", paddingTop: "3px" }}
        ></ion-icon>
      </div>
      {/*<Toaster position="top-center" reverseOrder={false} />
      <div className="welcome-message">
        <h1>
          We're thrilled to have you here. Here's
          a list of the events you can explore and join
        </h1>
      </div>
      {events && events.length > 0 ? (
        events.map((event) => (
          <div className="div1">
            <Card style={{ width: "18rem", marginRight: "10px" }}>
              <Card.Body>
                <Card.Title>Event Title: {event.title}</Card.Title>
                <Card.Text>Event Description: {event.description}</Card.Text>
                <Card.Text>Event Date: {format(new Date(event.date), "yyyy-MM-dd")}</Card.Text>
                <button
                  className="btn btn-secondary btn-icon-split"
                  style={{ marginTop: "5px" }}
                  onClick={(e) => JoinHandler(e, event)}
                >
                  <span className="icon text-white-50">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                  <span className="text">Join</span>
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
            <p className="lead text-gray-800 mb-5">No Events Found</p>
            <p className="text-gray-500 mb-0">
              It looks like you should get the hell out of here...
            </p>
            <NavLink to="/home">
              <a>&larr; Back to Home</a>
            </NavLink>
          </div>
        </div>
      )} */}
      <Fullcalendar 
      plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
      initialView='dayGridMonth'
      headerToolbar={{
        start: 'today prev,next', 
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay' 
      }}
      height={'90vh'}
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick} 
      />
      <Footer />
    </div>
  );
}
