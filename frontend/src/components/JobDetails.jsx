import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState("");
    const [isApplied, setIsApplied] = useState(false);

    // Load the applied status from localStorage when the component mounts
    useEffect(() => {
        const storedApplicationStatus = localStorage.getItem(`isApplied-${id}`);
        setIsApplied(storedApplicationStatus === "true");
    }, [id]);

    // Fetch job details from the API
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/job/get/${id}`,
                    { withCredentials: true }
                );
                if (response.data.success) {
                    setJob(response.data.job);
                    setIsApplied(
                        response.data.job.isApplied || localStorage.getItem(`isApplied-${id}`) === "true"
                    );
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch job details.");
                alert("Error fetching job details. Please try again.");
            }
        };

        fetchJobDetails();
    }, [id]);

    const applyJobHandler = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/application/apply/${id}`,
                { withCredentials: true }
            );
            if (response.data.success) {
                setIsApplied(true);
                localStorage.setItem(`isApplied-${id}`, "true");
                alert("You have successfully applied for this job!");
            } else {
                alert("Failed to apply for the job.");
            }
        } catch (err) {
            console.error(err);
            alert("Error applying for the job.");
        }
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!job) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-5 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-500">{job.description}</p>
            <p>
                <strong>Requirements:</strong> {job.requirements.join(", ")}
            </p>
            <p>
                <strong>Salary:</strong> {job.salary} LPA
            </p>
            <p>
                <strong>Location:</strong> {job.location}
            </p>
            <p>
                <strong>Job Type:</strong> {job.jobType}
            </p>
            <p>
                <strong>Experience Level:</strong> {job.experienceLevel} years
            </p>
            <p>
                <strong>Position:</strong> {job.position}
            </p>

            {/* Apply Button */}
            <Button
                onClick={!isApplied ? applyJobHandler : null}
                disabled={isApplied}
                style={{
                    backgroundColor: isApplied ? "#d1d5db" : "#6A38C2",
                    color: "#fff",
                    cursor: isApplied ? "not-allowed" : "pointer",
                }}
                variant="contained"
            >
                {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
        </div>
    );
};

export default JobDetails;
