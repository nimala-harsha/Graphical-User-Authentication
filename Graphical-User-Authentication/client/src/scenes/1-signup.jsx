import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getUser } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import './index.css'
import CryptoJS from 'crypto-js';

const UserNameAuth = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userAuth = (e) => {
        e.preventDefault()

        if (fullName === '') {
            toast.error("Name required..!", {
                id: 'namereq'
            })
        }
        else if (email === '') {
            toast.error("email required..!", {
                id: 'emailreq'
            })
        } else if (password === '') {
            toast.error("password required..!", {
                id: 'pwdreq'
            })
        } else if (email == '' && password === '') {
            toast.error("email and password required..!", {
                id: 'required'
            })
        } else if (email !== '' && password !== '' && fullName !== '') {
            toast.success('data entered..!')
            const hashPass = CryptoJS.SHA256(password).toString();
            navigate(`/signUp2/${email}/${hashPass}/${fullName}`);
        }
    }

    return (
        <div className='background-image'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Container component="main" maxWidth="xs" style={{ borderStyle: 'solid', borderWidth: '1px', borderRadius: '1rem', padding: '1rem 2rem', paddingBottom: '4rem', backgroundColor: '#656565c8' }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{ color: 'white' }}>
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={userAuth}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Next
                            </Button>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Link to='/signIn1' className="footerLink">
                                        Sign In?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div>
    )
}

export default UserNameAuth