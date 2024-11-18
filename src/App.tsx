// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth/AuthContext";
import Home from "./components/pages/home/home";
import Login from "./components/pages/login/login";
import Layout from "./components/layout/layout";
import Register from "./components/pages/register/register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LedigaLokaler from "./components/pages/lediga-lokaler/ledigalokaler";
import HyrUtLokal from "./components/pages/hyr-ut-lokal/hyrutlokal";
import ProtectedRoute from "./routes/ProtectedRoute";
import Bevakningar from "./components/pages/bevakningar/bevakningar";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/hyr-ut-lokal" element={<ProtectedRoute />}>
              <Route index element={<HyrUtLokal />} />
            </Route>
            <Route path="/lediga-lokaler">
              <Route index element={<LedigaLokaler />} />
            </Route>
            <Route path="/bevakningar">
              <Route index element={<Bevakningar />}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;