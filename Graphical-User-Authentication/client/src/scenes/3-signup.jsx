import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Navigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import gray from '../assets/gray.jpeg'
import js from '../assets/javascript.jpeg'
import node from '../assets/node.png'
import python from '../assets/python.png'
import react from '../assets/react.jpeg'
import {SignUp} from '../actions/authActions'


const ImageAuth = () => {
    const dispatch = useDispatch();
    const data = useParams()
    const [imagePassword, setImagePassword] = useState('')

    const [images, setImages] = useState([
        gray,
        gray,
        gray,
        gray,
        gray,
        node,
        js,
        gray,
        gray,
        python,
        react,
        gray,
        gray,
        gray,
        gray,
        gray,
    ]);

    // save reference for dragItem and dragOverItem
    const dragItem = React.useRef(null);
    const dragOverItem = React.useRef(null);

    // handle drag sorting
    const handleSort = () => {
        // duplicate items
        let _images = [...images];

        // remove and save the dragged item content
        const draggedItemContent = _images.splice(dragItem.current, 1)[0];

        // switch the position
        _images.splice(dragOverItem.current, 0, draggedItemContent);

        // reset the position ref
        dragItem.current = null;
        dragOverItem.current = null;

        // update the actual array
        setImages(_images);
    };

    useEffect(() => {
        const password = images
            .map((image) => getImageName(image))
            .join('');


        setImagePassword(password)
    }, [images]);

    const getImageName = (imageUrl) => {
        const parts = imageUrl.split('/');
        const imageName = parts[parts.length - 1].split('.')[0];
        return imageName;
    };



    const formSubmit = (e) => {
        e.preventDefault();
        if (imagePassword === '') {
            toast.error('You should arrange puzzel..!')
        } else if (imagePassword !== '') {
            toast.success('data entered..!')
            const newUser = {
                fullName : data.fullName,
                email: data.email,
                hashPass: data.password,
                colorPass: data.colorPwd,
                imagePass: imagePassword
            }
            dispatch(SignUp(newUser));
        }
    }
    const initialImages = [
        gray,
        gray,
        gray,
        gray,
        gray,
        node,
        js,
        gray,
        gray,
        python,
        react,
        gray,
        gray,
        gray,
        gray,
        gray,
    ];

    const DoNull = () => {
        setImages([...initialImages]);
    }

    return (
        <div className='background-image'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Container component="main" maxWidth="xs" style={{ borderStyle: 'solid', borderWidth: '1px', borderRadius: '1rem', padding: '1rem 2rem', paddingBottom: '4rem', backgroundColor: '#656565c8' }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: '2rem',
                            marginLeft: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{ color: 'white', textAlign: 'center' }}>
                            3 -Step
                        </Typography>
                        <Typography component="h3" variant="h6" style={{ color: 'white', textAlign: 'center' }}>
                            Change the puzzel and remember the pattern
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={formSubmit}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {images.map((data, index) => (
                                        <div
                                            key={index}
                                            draggable
                                            style={{
                                                border: '1px solid',
                                                padding: '0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'move',
                                                width: '1.5rem',
                                                height: '5rem',
                                                boxSizing: 'border-box',
                                                flexBasis: 'calc(25% - 8px)',
                                                flexGrow: 0
                                            }}
                                            onDragStart={(e) => (dragItem.current = index)}
                                            onDragEnter={(e) => (dragOverItem.current = index)}
                                            onDragEnd={handleSort}
                                        >
                                            <img src={data} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                style={{ marginLeft: '1.5rem', marginTop: '1rem', height: '2rem', width: '8rem' }}
                            >
                                Sign Up
                            </Button>
                            <Button
                                variant="contained"
                                onClick={DoNull}
                                style={{ marginLeft: '1rem', backgroundColor: 'red', marginTop: '1rem', height: '2rem', width: '8rem' }}
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

export default ImageAuth