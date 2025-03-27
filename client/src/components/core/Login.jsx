import React, { useState } from 'react'

const Login = () => {

     const [role, setRole] = useState("student"); // Default role
     const [isLoading, setIsLoading] = useState(false);

     const handleRoleChange = (selectedRole) => {
       setIsLoading(true);
       // Simulate API call or processing
       setTimeout(() => {
         setRole(selectedRole);
         setIsLoading(false);
         console.log("Role changed to:", selectedRole);
         // You can add additional logic here (API calls, etc.)
       }, 300);
     };

  return (
    <div className="w-full">
      <div className="w-11/12 flex justify-between items-center mx-auto">
        {/* form section  */}
        <div>
          <h3>Welcome Back</h3>
          <p>Discover your passions,</p>

          {/* Toggle Container */}
          <div className="relative flex items-center bg-gray-200 rounded-full p-1">
            {/* Student Option */}
            <button
              onClick={() => handleRoleChange("student")}
              disabled={isLoading}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                role === "student"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              Student
            </button>

            {/* Instructor Option */}
            <button
              onClick={() => handleRoleChange("instructor")}
              disabled={isLoading}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                role === "instructor"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              Instructor
            </button>
          </div>
        </div>

        {/* image section  */}
        <div></div>
      </div>
    </div>
  );
}

export default Login
