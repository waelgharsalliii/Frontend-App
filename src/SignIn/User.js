import React from "react";
import "../styles/Register.css";

const User = (props) => {


    const DeleteHandler=async (e)=> {
        e.preventDefault();
        console.log(props.id);
        await fetch(`http://localhost:3001/users/${props.id}`, {
            method: "DELETE",headers: {
                'Content-Type': 'application/json'
              }
          });
    }

  return (
    <div className="table-container">
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
          </tr>
        </thead>
        <tbody>
            <tr>
          <td>{props.fname}</td>
          <td>{props.lname}</td>
          <td>{props.email}</td>
          <td>{props.phone}</td>
          <td>{props.birthdate}</td>
          <td><button className="trash" onClick={DeleteHandler}><ion-icon name="trash"></ion-icon></button></td>
          <td><button className="refresh"><ion-icon name="refresh"></ion-icon></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default User;
