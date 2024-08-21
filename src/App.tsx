import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import Categories from "./pages/HomePage/Categories";
import Sidebar from "./components/layout/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="h-screen bg-[#0f0f0f] text-white flex flex-col max-w-[100vw] px-4">
      <Header />
      <div className="grid grid-cols-[auto_1fr] flex-grow-1 overflow-auto relative">
        <div
          className={`overflow-x-hidden px-8 pb-4 w-full ${
            isSidebarOpen ? "opacity-40" : ""
          }`}
        >
          <div className="sticky top-0 bg-[#0f0f0f] z-10 pb-4">
            <HomePage />
          </div>
        </div>
        <Sidebar className={`z-20 ${isSidebarOpen ? "" : "hidden"}`} />
      </div>
    </div>
  );
}

export default App;
// grid-cols-[auto,1fr]
// grid-cols-[auto, 1fr]
