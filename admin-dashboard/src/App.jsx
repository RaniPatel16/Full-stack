import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Forbidden from './pages/Forbidden';
import AdminOrderManagement from './pages/AdminOrderManagement';
import AgentManagement from './pages/AgentManagement';
import SmartLogistics from './pages/SmartLogistics';
import Profile from './pages/Profile';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forbidden" element={<Forbidden />} />
          
          {/* Admin Routes */}
          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrderManagement />} />
            <Route path="/admin/agents" element={<AgentManagement />} />
            <Route path="/logistics" element={<SmartLogistics />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

