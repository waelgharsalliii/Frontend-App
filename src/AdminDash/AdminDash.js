import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

export default function AdminDash() {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar></Sidebar>
        <Content />
      </div>
    </div>
  );
}
