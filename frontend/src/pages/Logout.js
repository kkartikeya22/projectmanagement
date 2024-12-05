import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import { Box, Typography, Button, Badge, Paper, Avatar } from '@mui/material';
import { ExitToApp, Cancel, SportsMartialArts, EmojiEvents } from '@mui/icons-material';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: '#44475a' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                    <Badge badgeContent={<EmojiEvents sx={{ color: '#ff79c6' }} />} overlap="circular">
                        <Avatar sx={{ bgcolor: '#6272a4', width: 60, height: 60 }}>
                            <SportsMartialArts fontSize="large" sx={{ color: '#f8f8f2' }} />
                        </Avatar>
                    </Badge>
                </Box>
                
                <Typography variant="h5" align="center" sx={{ mb: 1, fontWeight: 'bold', color: '#f8f8f2' }}>
                    {currentUser.name}
                </Typography>

                <Typography variant="body1" align="center" sx={{ mb: 4, color: '#bd93f9' }}>
                    Ready to end your project session?
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<ExitToApp />}
                        onClick={handleLogout}
                        sx={{ 
                            py: 1.5,
                            bgcolor: '#ff5555',
                            '&:hover': { bgcolor: '#ff3333' }
                        }}
                    >
                        Exit Project Space
                    </Button>
                    
                    <Button
                        variant="contained"
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        sx={{ 
                            py: 1.5,
                            bgcolor: '#6272a4',
                            '&:hover': { bgcolor: '#50fa7b' }
                        }}
                    >
                        Continue Session
                    </Button>
                </Box>
            </Paper>
        </LogoutContainer>
    );
};

export default Logout;

const LogoutContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
    background-color: #282a36;
`;
