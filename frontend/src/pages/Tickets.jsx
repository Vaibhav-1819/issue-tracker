// src/pages/Tickets.jsx
import React, { useEffect, useState } from 'react';
import TicketList from '../components/TicketList';
import { getTickets } from '../api';

const Tickets = ({ user, searchQuery }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getTickets();
        setTickets(res.data);
        console.log('Fetched tickets:', res.data);
      } catch (err) {
        alert('Failed to fetch tickets');
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="page-content">
      <div className="dashboard-header">
        <h2>📋 All Created Tickets</h2>
        <p className="user-info">
          Logged in as: <strong>{user?.name}</strong>
        </p>
      </div>

      <TicketList tickets={tickets} searchQuery={searchQuery} />
    </div>
  );
};

export default Tickets;
