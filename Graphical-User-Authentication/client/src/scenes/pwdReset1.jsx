import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useParams, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import './index.css'
import CryptoJS from 'crypto-js';


const PwdReset1 = () => {
    const navigate = useNavigate();
    const data = useParams()
    const [password, setPassword] = useState('');
    const [confirmePassword, setConfirmePassword] = useState('');
    const [OTP, setOTP] = useState('');

    const userAuth = (e) => {
        e.preventDefault()

        if (password === '') {
            toast.error("password required..!", {
                id: 'pwdreq'
            })
        }else if (confirmePassword === '') {
            toast.error(" Confirme password required..!", {
                id: 'pwdreq'
            })
        } else if(OTP === ''){
            toast.error('OTP required..!', {
                id: 'otp'
            })
        }
        else if(confirmePassword !== password){
            toast.error(" Password doesnot match ..!", {
                id: 'match'
            })
        } else if (confirmePassword === password && OTP !== '') {
            toast.success('Data saved..!')
            const hashPass = CryptoJS.SHA256(password).toString();
            navigate(`/pwdReset2/${data.token}/${hashPass}/${OTP}`);
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
                            Password Reset
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={userAuth}>
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Confirmepassword"
                                label="Confirme Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                onChange={(e) => setConfirmePassword(e.target.value)}
                                value={confirmePassword}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="OTP"
                                label="OTP"
                                type="text"
                                id="OTP"
                                onChange={(e) => setOTP(e.target.value)}
                                value={OTP}
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

export default PwdReset1