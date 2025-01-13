import React, { useState } from 'react';
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accountType: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.accountType) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/login',
        {
          email: formData.email,
          password: formData.password,
          role: formData.accountType, // Map accountType to role
        },
        { withCredentials: true }
      );

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert(response.data.message);
      
      // Redirect based on role
      if (response.data.user.role === 'recruiter') {
        window.location.href = '/admin/companies';
      } else if (response.data.user.role === 'student') {
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          padding: '40px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        {error && <Typography color="error" gutterBottom>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ddd' },
                '&:hover fieldset': { borderColor: '#4CAF50' },
                '&.Mui-focused fieldset': { borderColor: '#4CAF50' },
              },
            }}
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ddd' },
                '&:hover fieldset': { borderColor: '#4CAF50' },
                '&.Mui-focused fieldset': { borderColor: '#4CAF50' },
              },
            }}
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <Typography
            variant="body1"
            sx={{
              marginTop: '12px',
              marginBottom: '4px',
              fontWeight: 'bold',
              color: '#333',
              fontSize: '14px',
            }}
          >
            Select Account Type:
          </Typography>
          <RadioGroup
            aria-label="account-type"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            row
            sx={{ justifyContent: 'space-between', marginBottom: '12px' }}
          >
            <FormControlLabel
              value="student"
              control={<Radio sx={{ '&.Mui-checked': { color: '#4CAF50' } }} />}
              label="Student"
            />
            <FormControlLabel
              value="recruiter"
              control={<Radio sx={{ '&.Mui-checked': { color: '#4CAF50' } }} />}
              label="Recruiter"
            />
          </RadioGroup>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#45A049' },
              color: 'white',
              marginTop: '16px',
              padding: '10px 20px',
              width: '100%',
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{
            marginTop: '16px',
            textAlign: 'center',
            color: '#4CAF50',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={() => (window.location.href = '/signup')}
        >
          Don't have an account? Sign Up
        </Typography>
      </div>
    </div>
  );
};

export default Login;
