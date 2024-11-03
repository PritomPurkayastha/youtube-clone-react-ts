import "./App.css";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/layout/Sidebar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WatchPage from "./pages/watchPage";
import SearchPage from "./pages/searchPage";

function App() {
  return (
    <Router basename="/youtube-clone-react-ts">
      <div className="h-screen bg-[#0f0f0f] text-white flex flex-col max-w-[100vw]">
        <Header/>
        <div className='grid grid-cols-[auto_1fr] flex-grow-1 overflow-auto relative'>
          <Sidebar/>
            <div className='overflow-x-hidden pb-4'>
              <div className='sticky top-0 bg-[#0f0f0f] z-10 pb-4'>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/youtube-clone-react-ts" element={<HomePage />} />
                  <Route path="/watch" element={<WatchPage />} />
                  <Route path="/results" element={<SearchPage />} />
                </Routes>
              </div>
            </div>
        </div>
      </div>
    </Router>
  );
}
   
export default App;
