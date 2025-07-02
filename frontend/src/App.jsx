import React, { useState, useEffect } from 'react'; // ✅ FIXED
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import TicketDetail from './pages/TicketDetail';
import Reports from './pages/Reports';
import WorkLog from './pages/WorkLog';
import Tickets from './pages/Tickets';
import Layout from './components/Layout';

function App() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Routes>
      <Route
        element={
          <Layout
            user={user}
            onLogout={() => {
              localStorage.removeItem('user');
              setUser(null);
            }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        }
      >
        <Route path="/" element={<Dashboard user={user} searchQuery={searchQuery} />} />
        <Route path="/tickets" element={<Tickets user={user} searchQuery={searchQuery} />} />
        <Route path="/ticket/:id" element={<TicketDetail user={user} />} />
        <Route path="/reports" element={<Reports user={user} />} />
        <Route path="/worklog" element={<WorkLog user={user} />} />
      </Route>
    </Routes>
  );
}

export default App;
