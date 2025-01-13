import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';

const PostJobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: '',
    companyId: '',
  });
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/company/get', { withCredentials: true });
        if (response.data.success) {
          setCompanies(response.data.companies);
        }
      } catch (err) {
        setError('Failed to fetch companies.');
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/job/post', formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        setSuccess(response.data.message);
        setError('');
        setFormData({
          title: '',
          description: '',
          requirements: '',
          salary: '',
          location: '',
          jobType: '',
          experience: '',
          position: '',
          companyId: '',
        });
        alert('Job posted successfully!');
        navigate('/admin/jobs');
      } else {
        setError('Failed to post job, please try again.');
      }
    } catch (err) {
      setError('Failed to post job, please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button variant="outlined" onClick={() => navigate('/admin/jobs')}>
        Back
      </Button>
      <Typography variant="h4" component="h2">
        Post a New Job
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success.main">{success}</Typography>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Job Type"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Experience Level"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="companyId-label">Company</InputLabel>
          <Select
            labelId="companyId-label"
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            required
          >
            {companies.map((company) => (
              <MenuItem key={company._id} value={company._id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Post Job'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PostJobForm;
