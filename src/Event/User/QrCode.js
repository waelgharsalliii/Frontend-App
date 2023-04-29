import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import { AiFillCopy, AiOutlineDownload } from "react-icons/ai";
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

export default function QrCode() {
    const [user, setUser] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate=useNavigate();

  
  


  const ValidatePaymentHandler=async (e)=> {
    e.preventDefault();
    const paymentId=localStorage.getItem("paymentId");
    const Id=localStorage.getItem("Id");
    const ClubId=localStorage.getItem("ClubId");
    const response = await fetch(
        `http://localhost:3001/api/${ClubId}/${Id}/payment/${paymentId}`,
        { method: "POST" }
      );
    if (response.ok) {
        toast.success("Thank you for your payment.");
        setTimeout(() => navigate("/MyClubs"), 3000);
    }  
  } 

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
    localStorage.removeItem("ClubId");
    localStorage.removeItem("paymentId");
  };
  const [qr, setqr] = useState("");
  const [url, seturl] = useState("");
  const QrCodeDownload = async () => {
    const canvas = await (
      await html2canvas(document.getElementById("canvas"))
    ).toDataURL();

    if (canvas) {
      setqr(canvas);
      const a = document.createElement("a");
      a.download = "QrCode.png";
      a.href = canvas;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const QrCodeCopy = () => {
    navigator.clipboard.writeText(qr);
  };
  return (
    <div>
      
    <Toaster position="top-center" reverseOrder={false} />
    <div className="welcome-message" >
      <h4>
        Write Your name to generate your QR Code then click validate to join the event.
      </h4>
      <h4>
        Be sure to save your code!
      </h4>
    </div>
    
    
  
    <div className="container mx-auto w-[320px]" >
      <div class="mb-4">
        <p className="text-2xl">Generate QrCode For The Event</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm  mb-1">Write your name in your ticket</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={(e) => seturl(e.target.value)}
        />
      </div>

      <div id="canvas" className="border relative">
        <QRCodeCanvas
          value={url}
          size={300}
          bgColor={"#ffffff"}
          fgColor={"#0a75ad"}
          level={"H"}
          includeMargin={false}
          imageSettings={{
            src: "/1.png",
            x: undefined,
            y: undefined,
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>
      <div className="flex w-[300px] mt-1 p-1 space-x-2 items-center justify-center">
        <button
          onClick={() => QrCodeDownload()}
          class="flex items-center justify-between bg-transparent hover:bg-[#0a75ad] text-[#0a75ad] font-semibold hover:text-white py-2 px-4 border border-[#0a75ad] hover:border-transparent rounded"
        >
          <AiOutlineDownload />
          Download
        </button>

        <button
          onClick={() => QrCodeCopy()}
          class="flex items-center  justify-between bg-transparent hover:bg-[#0a75ad] text-[#0a75ad] font-semibold hover:text-white py-2 px-4 border border-[#0a75ad] hover:border-transparent rounded"
        >
          <AiFillCopy />
          Copy
        </button>
      </div>

    </div>
    <button  className="btn btn-warning btn-icon-split" style={{position:"relative",left:"500px"}} onClick={ValidatePaymentHandler}>
      <span className="icon text-white-50">
        <i className="fas fa-exclamation-triangle"></i>
      </span>
      <span className="text">Validate Payment</span>
    </button>
    </div>
  );









  


}

