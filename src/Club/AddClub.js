import React, { useState } from "react";
import Sidebar from "../AdminDash/Sidebar";
import styled from "styled-components";



const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 80vh;
  width: 20vw;
  background: #f0e3f0;
  box-shadow:0 8px 32px 0
`;

export default function AddClub() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !logo) {
      alert("Please fill in all fields");
      return;
    }
  };
  return (
    <div id="page-top">
      <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <MainContainer>
        <form className="add-club-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter club name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              placeholder="Enter club description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="logoUrl">Logo URL:</label>
            <input
              type="text"
              id="logoUrl"
              placeholder="Enter club logo URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Club
          </button>
        </form>
        </MainContainer>
        </div>
        </div>
      </div>
    </div>
  );
}
