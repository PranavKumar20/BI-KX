import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ApiKeyPage from "./pages/ApiKeyPage";
import { AuthProvider } from "./context/AuthContext"; 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/apikey" element={<ApiKeyPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
