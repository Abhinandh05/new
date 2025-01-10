import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input } from '@mui/material';


const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    logo: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/company/get/${id}`, { withCredentials: true });
        setCompany(response.data.company);
        setFormData({
          ...response.data.company,
          logo: null
        });
      } catch (error) {
        alert("Error fetching company details", error);
      }
    };
    fetchCompanyDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('website', formData.website);
    data.append('location', formData.location);
    if (formData.logo) {
      data.append('logo', formData.logo);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/company/update/${id}`,
        data,
        { withCredentials: true }
      );
      alert(response.data.message);
      setLoading(false);
    } catch (error) {
      console.error("Error updating company details", error);
      setLoading(false);
      toast.error("Failed to update company details.");
    }
  };

  if (!company) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto p-8 space-y-6 bg-gray-50 rounded-xl shadow-lg transform transition-all animate__animated animate__zoomIn">
      <Button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gradient-to-r from-gray-500 to-gray-700 text-white py-2 px-6 rounded-lg hover:opacity-80 transition-all transform hover:scale-105 duration-300"
      >
        Back
      </Button>
      <h2 className="text-3xl font-semibold text-center text-black mb-6 animate__animated animate__zoomIn animate__delay-1s">Update Company Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6 animate__animated animate__fadeInLeft animate__delay-2s">
        <div>
          <label htmlFor="name" className="text-lg text-black">Company Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-b-2 border-black rounded-lg p-3 focus:ring-2 focus:ring-gray-500 transition-all duration-300 transform focus:scale-105 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="text-lg text-black">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-b-2 border-black rounded-lg p-3 focus:ring-2 focus:ring-gray-500 transition-all duration-300 transform focus:scale-105 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="website" className="text-lg text-black">Website</label>
          <Input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-b-2 border-black rounded-lg p-3 focus:ring-2 focus:ring-gray-500 transition-all duration-300 transform focus:scale-105 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="text-lg text-black">Location</label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-2 block w-full border-b-2 border-black rounded-lg p-3 focus:ring-2 focus:ring-gray-500 transition-all duration-300 transform focus:scale-105 focus:border-blue-500"
          />
        </div>

        {/* <div>
          <Label htmlFor="logo" className="text-lg text-black">Logo</Label>
          <Input
            id="logo"
            name="logo"
            type="file"
            onChange={handleFileChange}
            className="mt-2 block w-full border-b-2 border-black rounded-lg p-3 focus:ring-2 focus:ring-gray-500 transition-all duration-300 transform focus:scale-105 focus:border-blue-500"
          />
        </div> */}

        <div className="mt-6">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white py-3 rounded-lg hover:bg-gradient-to-l transition-all transform hover:scale-105 focus:ring-2 focus:ring-gray-500"
          >
            {loading ? <Loader size={20} className="mr-2" /> : null}
            {loading ? 'Updating...' : 'Update Company'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;
