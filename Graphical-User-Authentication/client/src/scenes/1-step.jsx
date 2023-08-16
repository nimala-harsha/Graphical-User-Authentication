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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import './index.css'
import axiosInstance from '../helpers';
import CryptoJS from 'crypto-js';

const UserNameAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [testEmail, setTestEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const userAuth = (e) => {
        e.preventDefault()
        setEmail(testEmail)
    }
    const hashPass = CryptoJS.SHA256(password).toString();
    useEffect(() => {
        async function getUser() {
            try {

                if (!email) {
                    return;
                }
                const form = {
                    email
                };
                const res = await axiosInstance.post('/auth/getUser', form);
                if (!res) {
                    toast.error("User not found..!", {
                        id: 'notfound'
                    });
                } else if (res.data.payload.hashPass !== hashPass) {
                    toast.error("Password does not match..!", {
                        id: 'pwderror'
                    });
                    window.location.reload();
                } else if (res.data.payload.hashPass === hashPass) {
                    toast.success("1-step success..!", {
                        id: 'pwdsuccess'
                    });
                    setIsSuccess(true);
                } else if (res.status === 400) {
                    toast.error('User not found..!', {
                        id: '400error'
                    })
                }


            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [email]);

    if (isSuccess) {
        navigate(`/signIn2/${email}/${hashPass}`);
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
                            Sign in
                        </Typography>
                        <Typography component="h3" variant="h5" style={{ color: 'white' }}>
                            1 -step Authentication
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={userAuth}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setTestEmail(e.target.value)}
                                value={testEmail}

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
                                <Grid item xs={12} sm={5}>
                                    <Link to='/pwdRequest' className="footerLink">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Link to='/signUp1' className="footerLink">
                                        Sign Up?
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