import React, { useState } from "react";
import LoginScreen from "./components/Login";
import RegisterScreen from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [page, setPage] = useState("login");

  const handleLogin = (email, password) => {
    console.log("Login with:", email, password);
    setPage("dashboard");
  };

  const handleRegister = (data) => {
    console.log("Registered user:", data);
    setPage("login");
  };

  return (
    <>
      {page === "login" && (
        <LoginScreen
          goToRegister={() => setPage("register")}
          handleLogin={handleLogin}
        />
      )}
      {page === "register" && (
        <RegisterScreen
          goToLogin={() => setPage("login")}
          handleRegister={handleRegister}
        />
      )}
      {page === "dashboard" && <Dashboard />}
    </>
  );
}

export default App;
