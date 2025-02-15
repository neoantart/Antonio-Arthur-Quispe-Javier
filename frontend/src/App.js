import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/AddUser";
import User from "./components/User";
import UsersList from "./components/UsersList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/users" className="navbar-brand">
          Tecnova Users Admin
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<UsersList/>} />
          <Route path="/users" element={<UsersList/>} />
          <Route path="/add" element={<AddUser/>} />
          <Route path="/users/:id" element={<User/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
