import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
alert

const ViewApplicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobName, setJobName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const shortlistingStatus = ["Accepted", "Pending", "Rejected"];

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/application/${id}/applicants`,
          { withCredentials: true }
        );
        setApplicants(response.data.job.applications || []);
        setJobName(response.data.job.name || "Unknown Job");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applicants.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [id]);

  const handleMenuOpen = (event, applicantId) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplicant(applicantId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApplicant(null);
  };

  const statusHandler = async (status) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/application/status/${selectedApplicant}/update`,
        { status },
        { withCredentials: true }
      );
     alert(response.data.message);
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === selectedApplicant
            ? { ...applicant, status: status.toLowerCase() }
            : applicant
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      handleMenuClose();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Applicants for {jobName}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.length > 0 ? (
              applicants.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>{application.applicant?.name || "N/A"}</TableCell>
                  <TableCell>{application.applicant?.email || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, application._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No applicants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {shortlistingStatus.map((status, index) => (
          <MenuItem key={index} onClick={() => statusHandler(status)}>
            {status}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ViewApplicants;
