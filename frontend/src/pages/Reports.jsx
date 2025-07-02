import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { FaCalendarDay, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar'; // ✅ ← THIS IS MISSING

const API = 'http://localhost:5000/api';


const Reports = ({ user }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get(`${API}/tickets`)
      .then((res) => setTickets(res.data))
      .catch(() => alert('Failed to load tickets'));
  }, []);

  const today = dayjs().format('YYYY-MM-DD');

  const formatDate = (dateStr) =>
    dateStr ? dayjs(dateStr).format('YYYY-MM-DD') : null;

  const dailyCreated = tickets.filter(t =>
    formatDate(t.created_at) === today
  );

  const dailyClosed = tickets.filter(t =>
    t.status === 'Closed' &&
    formatDate(t.updated_at || t.created_at) === today
  );

  const monthlyGrouped = tickets.reduce((acc, t) => {
    const month = dayjs(t.created_at).format('YYYY-MM');
    if (!acc[month]) acc[month] = 0;
    acc[month]++;
    return acc;
  }, {});

  return (
    <>
      <div className="page-content">
        <h2 className="page-title">📊 Ticket Reports</h2>

        <div className="report-grid">
          {/* Daily Created */}
          <div className="report-card">
            <div className="card-header blue">
              <FaCalendarDay className="icon" />
              Daily Created Tickets
            </div>
            <ul>
              {dailyCreated.length > 0 ? (
                dailyCreated.map(t => (
                  <li key={t.id}>{t.title}</li>
                ))
              ) : (
                <li className="muted">No tickets created today</li>
              )}
            </ul>
          </div>

          {/* Daily Solved */}
          <div className="report-card">
            <div className="card-header green">
              <FaCheckCircle className="icon" />
              Daily Solved Tickets
            </div>
            <ul>
              {dailyClosed.length > 0 ? (
                dailyClosed.map(t => (
                  <li key={t.id}>{t.title}</li>
                ))
              ) : (
                <li className="muted">No tickets solved today</li>
              )}
            </ul>
          </div>

          {/* Monthly Summary */}
          <div className="report-card">
            <div className="card-header gray">
              <FaCalendarAlt className="icon" />
              Monthly Summary
            </div>
            <ul>
              {Object.entries(monthlyGrouped).length > 0 ? (
                Object.entries(monthlyGrouped).map(([month, count]) => (
                  <li key={month}><strong>{month}</strong>: {count} ticket(s)</li>
                ))
              ) : (
                <li className="muted">No data available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
