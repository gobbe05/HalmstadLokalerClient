// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Auth/AuthContext";
import Home from "./components/pages/home/home";
import Login from "./components/pages/login/login";
import Layout from "./components/layout/layout";
import Register from "./components/pages/register/register";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LedigaLokaler from "./components/pages/lediga-lokaler/ledigalokaler";
import HyrUtLokal from "./components/pages/hyr-ut-lokal/hyrutlokal";
import ProtectedRoute from "./routes/ProtectedRoute";
import Bevakningar from "./components/pages/bevakningar/bevakningar";
import Konversation from "./components/pages/konversation/konversation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lokal from "./components/pages/lokal/lokal";
import MinSida from "./components/pages/min-sida/minsida";
import AllaKontor from "./components/pages/min-sida/alla-kontor/allakontor";
import { APIProvider } from "@vis.gl/react-google-maps";
import ScrollWrapper from "./components/layout/scrollwrapper";
import SparadeLokaler from "./components/pages/sparade-lokaler/sparadelokaler";
import Inkorg from "./components/pages/inkorg/inkorg";

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API} libraries={["places"]}>
          <Router>
            <ScrollWrapper>
              <ToastContainer position="top-left" theme="colored" transition={Bounce}/>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/lokal/:id" element={<Lokal />} />
                  <Route path="/hyr-ut-lokal" element={<ProtectedRoute />}>
                    <Route index element={<HyrUtLokal />} />
                  </Route>
                  <Route path="/lediga-lokaler">
                    <Route index element={<LedigaLokaler />} />
                  </Route>
                  <Route path="/sparade-lokaler" element={<ProtectedRoute />}>
                    <Route index element={<SparadeLokaler />}/>
                  </Route>
                  <Route path="/min-sida" element={<ProtectedRoute />}>
                    <Route index element={<MinSida />}/>
                    <Route path="/min-sida/alla-kontor" element={<AllaKontor />}/>
                  </Route>
                  <Route path="/bevakningar">
                    <Route index element={<Bevakningar />}/>
                  </Route>
                  <Route path="/inkorg" element={<ProtectedRoute />}>
                    <Route index element={<Inkorg />}/>
                  </Route>
                </Route>
              </Routes>
            </ScrollWrapper> 
          </Router>
        </APIProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;