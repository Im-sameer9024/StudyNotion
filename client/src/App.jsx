import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Navbar from "./components/comman/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./components/core/Auth/Signup";
import Login from "./components/core/Auth/Login";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <div className=" w-full h-full ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
