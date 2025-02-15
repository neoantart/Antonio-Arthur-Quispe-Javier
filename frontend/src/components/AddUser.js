import React, { useState } from "react";
import UserDataService from "../services/UserService";

const AddUser = () => {
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

  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
     const { name, value } = event.target;
     setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
        firstName: user.firstName,
        lastName: user.lastName,
        dv: user.dv,
        rut: user.rut,
        birthDate: user.birthDate,
        email: user.email,
        password: user.password
    };

    UserDataService.create(data)
      .then(response => {
        setUser({
            firstName: response.firstName,
            lastName: response.lastName,
            dv: response.dv,
            rut: response.rut,
            birthDate: response.birthDate,
            email: response.email
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>User saved successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
              value={user.firstName}
              onChange={handleInputChange}
              name="firstName"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              required
              value={user.lastName}
              onChange={handleInputChange}
              name="lastName"
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
              value={user.email}
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
              value={user.dv}
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
              value={user.rut}
              onChange={handleInputChange}
              name="rut"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={user.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
