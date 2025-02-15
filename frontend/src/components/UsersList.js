import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);  

  useEffect(() => {
    retrieveUsers();
  }, []);
  
  const retrieveUsers = () => {
    UserDataService.getAll()
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const removeAllUsers = () => {
    UserDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div className="list row">
      <div className="col-md-6">      
        <h4>Users List</h4>      

      <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.firstName + " " + user.lastName}
              </li>
            ))}
      </ul>
      
      <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllUsers}
      >
          Remove All
      </button>      

      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>Rut:</strong>
              </label>{" "}
              {currentUser.rut}
            </div>
            <div>
              <label>
                <strong>Dv:</strong>
              </label>{" "}
              {currentUser.dv}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentUser.email}
            </div>

            <Link
              to={"/users/" + currentUser.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />           
                <p>Please click on a User...</p>           
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
