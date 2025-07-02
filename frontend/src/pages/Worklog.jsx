import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const WorkLog = ({ user }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get(`${API}/tickets`)
      .then(res => setTickets(res.data))
      .catch(() => alert('Failed to load tickets'));
  }, []);

  const assigned = tickets.filter(t => t.assigned_to === user.name);
  const commented = tickets.filter(t =>
    t.comments?.some(c => c.user_name === user.name)
  );
  const uploaded = tickets.filter(t => t.patch_file && t.assigned_to === user.name);

  return (
    <>

      <div className="page-content">
        <h2>👨‍💻 {user.name}'s Work Log</h2>

        <div style={{ marginBottom: '2rem' }}>
          <h4>📝 Comments Made</h4>
          <ul>
            {commented.map(t => (
              <li key={t.id}>Commented on: {t.title}</li>
            ))}
            {commented.length === 0 && <li>No comments yet.</li>}
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h4>🎯 Assigned Tickets</h4>
          <ul>
            {assigned.map(t => (
              <li key={t.id}>{t.title}</li>
            ))}
            {assigned.length === 0 && <li>No assigned tickets.</li>}
          </ul>
        </div>

        <div>
          <h4>📎 Uploaded Files</h4>
          <ul>
            {uploaded.map(t => (
              <li key={t.id}>Patch for: {t.title}</li>
            ))}
            {uploaded.length === 0 && <li>No file uploads yet.</li>}
          </ul>
        </div>
      </div>
    </>
  );
};

export default WorkLog;
