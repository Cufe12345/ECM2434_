import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import classes from './ForgotPassword.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/auth/users/reset_password/', { email });
            toast.success('Please check your email for the password reset link.');
        } catch (error) {
            console.error('Password reset request failed', error);
            toast.error('Error sending password reset email. Please try again.');
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.formBox}>
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        sx={{
                            marginBottom: '20px',
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: '8px',
                                padding: '10px 30px',
                                fontSize: '0.9rem',
                                width: 'fit-content',
                                backgroundColor: 'green',
                                '&:hover': {
                                  backgroundColor: '#045d04',
                                },
                            }}
                        >
                            Send Password Reset Link
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
