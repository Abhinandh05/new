import React from 'react';

const Jobs = () => {
  const jobs = [
    {
      logo: 'https://via.placeholder.com/50', // Replace with actual logo URL
      companyName: 'Tech Innovators',
      jobTitle: 'Software Engineer Intern',
      annualIncome: '$20,000',
      category: 'Technology',
    },
    {
      logo: 'https://via.placeholder.com/50', // Replace with actual logo URL
      companyName: 'Creative Studios',
      jobTitle: 'Graphic Designer Intern',
      annualIncome: '$15,000',
      category: 'Design',
    },
    {
      logo: 'https://via.placeholder.com/50', // Replace with actual logo URL
      companyName: 'Business Corp',
      jobTitle: 'Marketing Analyst Intern',
      annualIncome: '$18,000',
      category: 'Marketing',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {jobs.map((job, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            width: '300px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={job.logo}
            alt={`${job.companyName} logo`}
            style={{ width: '50px', height: '50px', marginBottom: '10px' }}
          />
          <h3 style={{ margin: '10px 0' }}>{job.companyName}</h3>
          <p><strong>Job Title:</strong> {job.jobTitle}</p>
          <p><strong>Annual Income:</strong> {job.annualIncome}</p>
          <p><strong>Category:</strong> {job.category}</p>
          <button
            style={{
              backgroundColor: '#007BFF',
              color: '#fff',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => alert(`Applying for ${job.jobTitle} at ${job.companyName}`)}
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
