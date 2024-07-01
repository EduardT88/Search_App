import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import WorkerStrip from "./components/WorkerStrip";
import WorkerInfo from "./components/WorkerInfo";
import Footer from "./components/Footer";
import Page404 from "./pages/Page404";
import { ContextProvider } from "./context/Context";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="app-container">
          <Header />
          <WorkerStrip />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/favorites/employee" element={<WorkerInfo />} />
            <Route path="/employee" element={<WorkerInfo />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Footer />
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
