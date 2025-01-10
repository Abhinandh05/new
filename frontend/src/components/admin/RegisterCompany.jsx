import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, Snackbar, Alert } from "@mui/material";

const RegisterCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            showSnackbar("Company name cannot be empty.", "error");
            navigate("/admin/companies")
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/company/register",
                { companyName },
                { withCredentials: true }
            );

            if (response.data.success) {
                showSnackbar(response.data.message || "Registration completed successfully!", "success");
                setCompanyName(""); // Clear input
                navigate("/admin/companies"); // Navigate after successful registration
            } else {
                showSnackbar(response.data.message || "Failed to register the company.", "error");
            }
        } catch (error) {
            showSnackbar(
                error.response?.data?.message ||
                "An error occurred while registering the company.",
                "error"
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <div className="my-10">
                <h1 className="font-bold text-2xl">Your Company Name</h1>
                <p className="text-gray-500">
                    What would you like to give your company name? You can change this later.
                </p>
            </div>

            <label htmlFor="companyName" className="block font-medium mb-2">
                Company Name
            </label>
            <Input
                id="companyName"
                type="text"
                className="my-2 w-full"
                placeholder="JobHunt, Microsoft, etc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
            />

            <div className="flex items-center gap-2 my-10">
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/admin/companies")}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={registerNewCompany}
                >
                    Continue
                </Button>
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default RegisterCompany;
