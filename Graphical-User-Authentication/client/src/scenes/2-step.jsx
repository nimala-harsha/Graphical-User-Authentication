import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import red from '../assets/red.png'
import blue from '../assets/blue.png'
import green from '../assets/green.png'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import './index.css'
import axiosInstance from '../helpers';
import CryptoJS from 'crypto-js';

const ColorAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useParams()
    const [email, setEmail] = useState('');
    const [fullColorPassword, setFullColorPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const redFunction = () => {
        setFullColorPassword((prevPassword) => prevPassword + 'red');
    };

    const greenFunction = () => {
        setFullColorPassword((prevPassword) => prevPassword + 'green');
    };

    const blueFunction = () => {
        setFullColorPassword((prevPassword) => prevPassword + 'blue');
    };

    const formSubmit = (e) => {
        e.preventDefault();
        setEmail(data.email)
    }

    const hashColor = CryptoJS.SHA256(fullColorPassword).toString();

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
                if (res.data.payload.colorPass !== hashColor) {
                    toast.error("Color Password doesnot match..!",{
                        id: 'color1'
                    })
                    window.location.reload();
                } else if (res.data.payload.colorPass === hashColor) {
                    toast.success("2-step success..!", {
                        id: 'color2'
                    });
                    setIsSuccess(true);
                } else if (res.status === 400) {
                    toast.error('User not found..!', {
                        id: 'color3'
                    })
                    window.location.reload();
                }

            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [email]);

    const doNull = () => {
        window.location.reload();
    }
    if (isSuccess) {
        navigate(`/signIn3/${data.email}/${data.password}/${hashColor}`);
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
                        <Typography component="h1" variant="h5">
                            2 -Step
                        </Typography>
                        <Typography component="h3" variant="h5">
                            Color Authentication
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formSubmit}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '3rem', marginBottom: '3rem', marginLeft: '1.5rem' }}>
                                <img src={red} style={{ width: '3rem', height: '3rem', marginRight: '2rem', cursor: 'pointer' }} onClick={redFunction} />
                                <img src={blue} style={{ width: '3rem', height: '3rem', marginRight: '2rem', cursor: 'pointer' }} onClick={blueFunction} />
                                <img src={green} style={{ width: '3rem', height: '3rem', marginRight: '2rem', cursor: 'pointer' }} onClick={greenFunction} />
                            </div>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                type="password"
                                value={fullColorPassword}
                                disabled
                                InputProps={{
                                    style: {
                                        cursor: 'not-allowed',
                                        pointerEvents: 'none',
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                style={{ marginLeft: '1rem', marginTop: '1rem', height: '3rem', width: '10rem' }}
                            >
                                Next
                            </Button>
                            <Button
                                variant="contained"
                                onClick={doNull}
                                style={{ marginLeft: '1rem', backgroundColor: 'red', marginTop: '1rem', height: '3rem', width: '10rem' }}
                            >
                                Clear
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div>
    )
}

export default ColorAuth