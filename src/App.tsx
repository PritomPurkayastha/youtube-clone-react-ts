import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/layout/Sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="h-screen bg-[#0f0f0f] text-white flex flex-col max-w-[100vw]">
      <Header/>
      <div className='grid grid-cols-[auto_1fr] flex-grow-1 overflow-auto relative'>
        <Sidebar/>
        <Router>
          <div className='overflow-x-hidden pb-4'>
            <div className='sticky top-0 bg-[#0f0f0f] z-10 pb-4'>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/watch" element={<HomePage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </div>
  );
}
   
export default App;
