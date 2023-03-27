import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div>
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Catchapp</div>
            </a>

            <hr className="sidebar-divider my-0" />

            <NavLink className="nav-item active" to="/Dash">
                <a className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </NavLink>

           
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <NavLink to="/Login">
                        <a className="collapse-item">Login</a>
                        </NavLink>
                        <NavLink to="/Reset">
                        <a className="collapse-item">Forgot Password</a>
                        </NavLink>
                        </div>
                </div>
            </li>

            
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Clubs</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <NavLink to="/AddClub">
                        <a className="collapse-item">Add a club</a>
                        </NavLink>
                        <NavLink to="/Clubs">
                        <a className="collapse-item">View All Clubs</a>
                        </NavLink>
                    </div>
                </div>
            </li>

            
            <li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Events</span></a>
            </li>

            
            <hr className="sidebar-divider d-none d-md-block" />

        </ul>
        </div>
  )
}
