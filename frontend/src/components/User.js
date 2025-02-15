import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import UserDataService from "../services/UserService";

const User = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialUserState = {
    id: null,
    firstName: "",
    lastName: "",
    dv: "",
    rut: null,
    birthDate: "",
    email: "",
    password: "", 
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getUser(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });    
  };

  const updateUser = () => {    
    UserDataService.update(currentUser.id, currentUser)
      .then(response => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then(response => {
        console.log(response.data);
        navigate("/users");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
              <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={currentUser.firstName}
                    onChange={handleInputChange}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={currentUser.lastName}
                    onChange={handleInputChange}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    variant="outlined"
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={currentUser.email}
                    onChange={handleInputChange}
                    name="email"
                    fullWidth              
                  />  
              </div>
              <div className="form-group">
                  <label htmlFor="dv">DV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dv"
                    required
                    value={currentUser.dv}
                    onChange={handleInputChange}
                    name="dv"
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="rut">Rut</label>
                  <input
                    type="text"
                    className="form-control"
                    id="rut"
                    required
                    value={currentUser.rut}
                    onChange={handleInputChange}
                    name="rut"
                  />
              </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteUser}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUser}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;
