import { useState } from 'react';
import axios from '../api/axios';
import '../styles/Auth.css'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('api/auth/login', form);
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (  
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
