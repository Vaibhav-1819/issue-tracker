import React, { useState } from 'react';
import { createTicket } from '../api';

const TicketForm = ({ onCreated, user }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(3);
  const [assignedTo, setAssignedTo] = useState(user.id);

  const developers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket({
        title,
        priority,
        assigned_to: assignedTo
      });
      setTitle('');
      setPriority(3);
      setAssignedTo(user.id);
      onCreated();
    } catch (err) {
      alert('Error creating ticket');
    }
  };

  return (
    <div className="ticket-form-wrapper">
      <h3 className="ticket-form-title">🎫 Create New Ticket</h3>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief issue title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            <option value={1}>🔥 High</option>
            <option value={2}>⚠️ Medium</option>
            <option value={3}>🧊 Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assignee">Assign Developer</label>
          <select
            id="assignee"
            value={assignedTo}
            onChange={(e) => setAssignedTo(Number(e.target.value))}
          >
            {developers.map(dev => (
              <option key={dev.id} value={dev.id}>
                {dev.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          ✅ Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
