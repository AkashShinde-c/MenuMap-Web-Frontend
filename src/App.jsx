import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MapView from "./pages/MapView";
import Navbar from "./components/Navbar";
import Tutorial from "./pages/Tutorial";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  
  return (
     <div className="App">
     <Navbar></Navbar>
     <Routes>
      {/* <Route element={<PrivateRoutes/>}>
      </Route> */}
      <Route path="/" element={<MapView/>}/>
      <Route path="/get-started" element={<Tutorial/>}/>
     </Routes>
     </div>
    
  );
}

export default App;