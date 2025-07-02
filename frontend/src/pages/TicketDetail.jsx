import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPaperclip, FaFileExport, FaCommentDots, FaHistory } from 'react-icons/fa';

const API = 'http://localhost:5000/api';

const TicketDetail = ({ user }) => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [file, setFile] = useState(null);

  const fetchTicket = async () => {
    try {
      const res = await axios.get(`${API}/tickets`);
      const match = res.data.find((t) => t.id === parseInt(id));
      setTicket(match);
    } catch (err) {
      alert('Failed to fetch ticket');
    }
  };

  const submitComment = async () => {
    if (!commentText.trim()) return;
    await axios.post(`${API}/tickets/${id}/comment`, {
      user_name: user.name,
      text: commentText,
    });
    setCommentText('');
    fetchTicket();
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await axios.post(`${API}/tickets/${id}/upload`, formData);
    alert('File uploaded');
    setFile(null);
    fetchTicket();
  };

  const exportPDF = () => {
    window.open(`${API}/tickets/${id}/export`, '_blank');
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  if (!ticket) {
    return <div className="page-content">Loading ticket...</div>;
  }

  return (
    <div className="page-content">
      {/* Ticket Summary */}
      <div className="ticket-summary-card">
        <h2>🎫 Ticket #{ticket.id}: {ticket.title}</h2>
        <div className="ticket-tags">
          <span className={`badge priority-${ticket.priority}`}>
            Priority {ticket.priority}
          </span>
          <span className={`badge status-${ticket.status.toLowerCase()}`}>
            {ticket.status}
          </span>
        </div>
        <p><strong>Assigned To:</strong> {ticket.assigned_to || 'None'}</p>
      </div>

      <div className="row-3col gap-2">
        {/* Comments */}
        <div className="card-section">
          <h4><FaCommentDots className="icon" /> Comments</h4>
          {ticket.comments?.length > 0 ? (
            <ul className="comment-list">
              {ticket.comments.map((c, i) => (
                <li key={i}><strong>{c.user_name}</strong>: {c.text}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">No comments yet.</p>
          )}
          <textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="btn" onClick={submitComment}>➕ Add Comment</button>
        </div>

        {/* File Upload */}
        <div className="card-section">
          <h4><FaPaperclip className="icon" /> Upload Patch File</h4>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button className="btn btn-secondary" onClick={uploadFile}>
            📎 Upload File
          </button>
        </div>

        {/* Activity */}
        <div className="card-section">
          <h4><FaHistory className="icon" /> Activity History</h4>
          <ul className="comment-list">
            {ticket.comments?.map((c, i) => (
              <li key={i}>🗣️ <strong>{c.user_name}</strong>: {c.text}</li>
            ))}
            {ticket.patch_file && (
              <li>📎 File uploaded: <em>{ticket.patch_file.split('/').pop()}</em></li>
            )}
            <li>📌 Current Status: <strong>{ticket.status}</strong></li>
          </ul>
        </div>
      </div>

      <div className="btn-right mt-3">
        <button className="btn btn-export" onClick={exportPDF}>
          <FaFileExport className="icon" /> Export to PDF
        </button>
      </div>
    </div>
  );
};

export default TicketDetail;
