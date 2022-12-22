import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Car from "./pages/car/Car";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Error from "./components/Error/Error";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/car/:id" element={<Car />} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </div> 
  );
};

export default App;
