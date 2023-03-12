import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const User = (props) => {
  const navigate = useNavigate();


  const DeleteHandler = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/users/${props.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    window.location.reload();
    toast.success("User deleted successfully",{
      duration:3000
    });
  };

  const CancelHandler = (e) => {
    e.preventDefault();
    navigate("/Login");
    localStorage.removeItem("Id");
  };

  const UpdateHandler = (e) => {
    e.preventDefault();
    navigate("/Profile");
  };

  const BanHandler = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/users/ban/${props.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      toast.success(`User with email address ${props.email} has been banned`,{
        duration:2000
      })
  };


  const UnBanHandler=async (e)=> {
    e.preventDefault();
    await fetch(`http://localhost:3001/users/unban/${props.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    toast.success(`User with email address ${props.email} has been unbanned`,{
      duration:2000
    })
  }

  return (
    <div className="table-container">
      <Toaster position="top-center" reverseOrder={false} />
      <table>
        <thead>
          <tr>
            <th className="details">FirstName</th>
            <th className="details">LastName</th>
            <th className="details">Email</th>
            <th className="details">Phone</th>
            <th className="details">birthdate</th>
            <th className="details">Delete</th>
            <th className="details">Update</th>
            <th className="details">Ban</th>
            <th className="details">Unban</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.fname}</td>
            <td>{props.lname}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>{props.birthdate}</td>
            <td>
              <button className="trash" onClick={DeleteHandler}>
                <ion-icon name="trash"></ion-icon>
              </button>
            </td>
            <td>
              <button className="refresh">
                <ion-icon name="refresh"></ion-icon>
              </button>
            </td>
            <td>
              <button className="ban" onClick={BanHandler}>
              <ion-icon name="ban-outline"></ion-icon>
              </button>
            </td>
            <td>
              <button className="unban" onClick={UnBanHandler}><ion-icon name="checkmark-circle-outline"></ion-icon></button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button className="btn btn-danger" onClick={CancelHandler}>
        Cancel
      </button>
    </div>
  );
};

export default User;
