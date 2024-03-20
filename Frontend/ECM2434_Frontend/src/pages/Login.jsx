import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../api/index';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./authPages.css";

const Login = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    ApiClient.api
      .login(username, password)
      .then((res) => {
        console.log(res);
        if(res.auth_token === undefined){
          toast.error('Login failed - Invalid credentials or non-verified email.');
          return;
        
        }
        setUser(res.auth_token);
        toast.success('Login successful');
        navigate('/');
      })
      .catch((error) => {
        toast.error(`Login failed - ${error.response.data.message ?? 'Contact support.'}`);
      });
  };

  return (
    <div className="page">
      <div className="containerBox">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': {
                padding: '14px 10px',
              }
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': {
                padding: '14px 10px',
              }
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: '8px',
                fontSize: '1rem',
                padding: '10px 90px',
                minWidth: '150px',
                backgroundColor: 'green',
                '&:hover': {
                  backgroundColor: '#045d04',
                },
              }}
            >
              Login
            </Button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <p>
              Don't have an account?{' '}
              <NavLink to="/register">Register</NavLink>
            </p>
            <p>
              Forgot your password?{' '}
              <NavLink to="/forgot-password">Change Password</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
