import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {  Button } from "@mui/material";

const Job = () => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/job/get", {
          withCredentials: true,
        });
        if (response.data.success) {
          setJobs(response.data.jobs);
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (err) {
        setError("Failed to fetch jobs.");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-5 rounded-md bg-white border border-gray-100 flex flex-wrap gap-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : jobs && jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            key={job._id}
            className="my-4 p-5 rounded-lg shadow-md bg-white w-[300px] transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {daysAgoFunction(job?.createdAt) === 0
                  ? "Today"
                  : `${daysAgoFunction(job?.createdAt)} days ago`}
              </p>
              <Button variant="outlined" size="small">
                <Bookmark />
              </Button>
            </div>

            <div className="flex items-center gap-2 my-2">
              
              <div>
                <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
              </div>
            </div>

            <div>
              <h1 className="font-bold text-lg my-2">{job?.title}</h1>
              <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-blue-700 font-bold">{job?.position} Positions</Badge>
              <Badge className="text-[#F83002] font-bold">{job?.jobType}</Badge>
              <Badge className="text-[#7209b7] font-bold">{job?.salary} LPA</Badge>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Button variant="outlined">
                <Link to={`/description/${job._id}`} className="no-underline text-inherit">
                  Details
                </Link>
              </Button>

              <Button
                variant="contained"
                color="primary"
                className="bg-[#7209b7] hover:bg-[#5a1d97] transition-colors"
              >
                Save For Later
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>No jobs posted yet.</p>
      )}
    </div>
  );
};

export default Job;
