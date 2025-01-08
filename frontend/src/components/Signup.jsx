import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
} from "@mui/material";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/v1/user/register",
                formData,
                { withCredentials: true } // For handling cookies
            );
            setSuccess(data.message); // Display success message
        } catch (err) {
            setError(err.response?.data?.message || "Error registering user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <Typography variant="h5" align="center" gutterBottom>
                    Create Account
                </Typography>

                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="primary">{success}</Typography>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        name="fullname"
                        label="Full Name"
                        fullWidth
                        margin="normal"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        name="phoneNumber"
                        label="Phone Number"
                        fullWidth
                        margin="normal"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Typography variant="body1" gutterBottom>
                        Select Account Type:
                    </Typography>
                    <RadioGroup
                        row
                        name="role"
                        value={formData.role}
                        onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                    >
                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                        <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                    </RadioGroup>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        style={styles.submitButton}
                    >
                        {loading ? <CircularProgress size={24} /> : "Create Account"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

// Styles for better structure and cleaner UI
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
    },
    formWrapper: {
        width: "100%",
        maxWidth: "400px",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    submitButton: {
        marginTop: "16px",
    },
};

export default Signup;
