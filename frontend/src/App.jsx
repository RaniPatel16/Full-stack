import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import PincodeDetail from './pages/PincodeDetail';
import About from './pages/About';
import { Landmark, LayoutDashboard, Search, Info } from 'lucide-react';

function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-blue-900 shadow-xl border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-700 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center transform transition hover:scale-105">
              <Landmark className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">India Postal Services</h1>
              <p className="text-[11px] tracking-widest text-blue-200 uppercase font-bold mt-0.5">Department of Data Analytics</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-2">
            <Link to="/dashboard" className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${isActive('/dashboard') || isActive('/') ? 'bg-blue-700 text-white shadow-md' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}>
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to="/explore" className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${isActive('/explore') ? 'bg-blue-700 text-white shadow-md' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}>
              <Search className="h-4 w-4" />
              Explore PINs
            </Link>
            <Link to="/about" className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${isActive('/about') ? 'bg-blue-700 text-white shadow-md' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}>
              <Info className="h-4 w-4" />
              About Portal
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navigation />

        <div className="bg-blue-700 border-b border-blue-800 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center text-[11px] text-white font-bold uppercase tracking-wider relative z-10">
            <span>Official Portal of India Postal Index Numbers</span>
            <span className="mx-3 text-blue-300">|</span>
            <span className="text-white drop-shadow-sm">Gov.In Verified</span>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/pincode/:pincode" element={<PincodeDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <footer className="bg-blue-900 text-white py-12 mt-auto border-t border-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-blue-200">
            <p className="font-bold uppercase tracking-widest text-blue-300 mb-2">PinTracker Enterprise</p>
            <p>Designed for administrative & public exploration purposes.</p>
            <p className="mt-6 text-xs text-blue-300">&copy; {new Date().getFullYear()} India Postal Services Platform. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
