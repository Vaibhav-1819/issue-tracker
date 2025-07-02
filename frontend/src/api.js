// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 📋 Ticket APIs
export const getTickets = () => API.get('/tickets');
export const getTicketById = (id) => API.get(`/tickets/${id}`);
export const createTicket = (data) => API.post('/tickets', data);

// 💬 Comments
export const addComment = (ticketId, comment) =>
  API.post(`/tickets/${ticketId}/comment`, comment);

// 📎 File Upload
export const uploadPatchFile = (ticketId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post(`/tickets/${ticketId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 📄 Export to PDF (opens in new tab — handled by frontend)
export const getPDFExportURL = (ticketId) =>
  `${API.defaults.baseURL}/tickets/${ticketId}/export`;
