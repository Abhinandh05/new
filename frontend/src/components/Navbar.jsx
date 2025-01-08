import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user info from localStorage
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from localStorage
    navigate('/login'); // Use navigate to redirect to login page
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar className="max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #2196F3, #3F51B5)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.1) rotate(3deg)',
              transition: 'all 0.3s ease-in-out',
            },
          }}
        >
          Job<span style={{ color: '#F83002' }}>Portal</span>
        </Typography>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Render navigation buttons based on the user role */}
          {user && user.role === 'recruiter' ? (
            <>
              <Button color="inherit" component={Link} to="/admin/companies">
                Companies
              </Button>
              <Button color="inherit" component={Link} to="/admin/jobs">
                Jobs
              </Button>
            </>
          ) : user && user.role === 'student' ? (
            <>
              <Button color="inherit" component={Link} to="/user-dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/jobs">
                Jobs
              </Button>
              <Button color="inherit" component={Link} to="/browse">
                Browse
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/guest">
              Guest Dashboard
            </Button>
          )}
          {!user ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button variant="outlined" color="primary" component={Link} to="/login">
                Login
              </Button>
              <Button variant="contained" color="primary" component={Link} to="/signup">
                Signup
              </Button>
            </div>
          ) : (
            <>
              <Avatar
                src={user?.profile?.profilePhoto}
                alt={user?.fullname || 'User'}
                onClick={handleMenuOpen}
                sx={{ cursor: 'pointer', width: 40, height: 40 }}
              />
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    width: '250px',
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Typography variant="body1" fontWeight="bold">
                    {user?.fullname}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Typography variant="body2" color="textSecondary">
                    {user?.profile?.bio}
                  </Typography>
                </MenuItem>
                {user.role === 'student' && (
                  <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                    View Profile
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
