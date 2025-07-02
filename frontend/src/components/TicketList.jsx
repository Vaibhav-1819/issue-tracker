// src/components/TicketList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaExclamationCircle } from 'react-icons/fa';

const TicketList = ({ tickets, searchQuery }) => {
  const navigate = useNavigate();

  const getPriorityBadge = (priority) => {
    const map = {
      1: { text: 'High', color: 'priority-high', icon: <FaExclamationCircle /> },
      2: { text: 'Medium', color: 'priority-medium', icon: '⚠️' },
      3: { text: 'Low', color: 'priority-low', icon: '🧊' },
    };
    const { text, color, icon } = map[priority];
    return (
      <span className={`priority-badge ${color}`}>
        {icon} {text}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const lower = status.toLowerCase();
    const map = {
      open: 'status-open',
      closed: 'status-closed',
    };
    return <span className={`status-badge ${map[lower] || 'status-default'}`}>{status}</span>;
  };

  const filteredTickets = tickets.filter((ticket) => {
    const q = searchQuery?.toLowerCase() || '';
    return (
      ticket.title.toLowerCase().includes(q) ||
      ticket.status.toLowerCase().includes(q) ||
      ticket.assigned_to?.toLowerCase().includes(q) ||
      ticket.priority.toString() === q
    );
  });

  return (
    <div className="ticket-grid">
      {filteredTickets.length === 0 ? (
        <p className="empty-text">No tickets found.</p>
      ) : (
        filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="ticket-card"
            onClick={() => navigate(`/ticket/${ticket.id}`)}
          >
            <div className="ticket-header">
              <h4 className="ticket-title">{ticket.title}</h4>
              {getStatusBadge(ticket.status)}
            </div>

            <div className="ticket-meta">
              <FaUser className="icon" />
              <span><strong>Assigned:</strong> {ticket.assigned_to || 'None'}</span>
            </div>

            <div>{getPriorityBadge(ticket.priority)}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default TicketList;
