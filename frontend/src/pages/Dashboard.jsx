import React from 'react';
import TicketForm from '../components/TicketForm';

const Dashboard = ({ user }) => {
  return (
    <div className="page-content">
      <div className="dashboard-header">
        <h2>🎫 Issue Tracker Dashboard</h2>
        <p className="user-info">
          Logged in as: <strong>{user.name}</strong>
        </p>
      </div>

      {/* ✅ Ticket Creation Only */}
      <div className="form-panel">
        <TicketForm onCreated={() => {}} user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
