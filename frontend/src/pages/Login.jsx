import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
  ];

  const handleLogin = () => {
    const user = users.find(u => u.email === email);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
    } else {
      alert('Invalid email');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">🔐 Login</h2>
        <input
          type="email"
          placeholder="Enter email (e.g. alice@example.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
