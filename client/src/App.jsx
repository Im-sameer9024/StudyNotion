import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Navbar from "./components/comman/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Signup from "./components/core/Auth/Signup";
import Login from "./components/core/Auth/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./components/core/Auth/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/AboutPage/About";
import Contact from "./pages/ContactPage/Contact";
import Error from "./pages/Error";
import MyProfile from "./pages/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";

const App = () => {
  return (
    <div className=" w-full h-full ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

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

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
