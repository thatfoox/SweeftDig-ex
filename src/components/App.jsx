import React, { useState } from "react";
import { BrowserRouter as Router, Routes,Route, } from 'react-router-dom';
import UsersList from "./UsersList";
import UserDetails from "./UserDetails"
import "./App.css";

function App() {
  return (
 
  <Router>
    <Routes>
      <Route exact path="/" element={<UsersList/>} />
      <Route exact path="/user/:id" element={<UserDetails/>} />
    </Routes>
  </Router>


  );
}

export default App;
