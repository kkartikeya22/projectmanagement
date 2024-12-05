import React, { useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, Badge, Typography } from '@mui/material';
import { Settings, Logout, School, EmojiEvents } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const { currentRole, currentUser } = useSelector(state => state.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={currentRole === 'mentor' ? 'Senior Mentor' : 'IITK Student'}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <EmojiEvents 
                                    sx={{ 
                                        width: 15, 
                                        height: 15, 
                                        color: '#ff5555',
                                        filter: 'drop-shadow(0 0 4px rgba(255, 85, 85, 0.5))'
                                    }} 
                                />
                            }
                        >
                            <Avatar sx={{ 
                                width: 32, 
                                height: 32,
                                bgcolor: '#121212',
                                border: '2px solid',
                                borderColor: '#ff79c6',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    borderColor: '#bd93f9',
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 0 12px rgba(189, 147, 249, 0.3)'
                                }
                            }}>
                                {String(currentUser.name).charAt(0)}
                            </Avatar>
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 8,
                    sx: styles.styledPaper,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <School 
                                sx={{ 
                                    width: 12, 
                                    height: 12,
                                    color: '#ff79c6',
                                    filter: 'drop-shadow(0 0 4px rgba(255, 121, 198, 0.5))'
                                }} 
                            />
                        }
                    >
                        <Avatar sx={{ 
                            bgcolor: '#121212',
                            border: '1px solid #ff79c6',
                            boxShadow: '0 0 8px rgba(255, 121, 198, 0.2)'
                        }} />
                    </Badge>
                    <Link to={`/${currentRole}/profile`} style={{ 
                        textDecoration: 'none', 
                        color: '#e6e6e6',
                        marginLeft: '8px'
                    }}>
                        <Typography variant="body1" sx={{ 
                            fontWeight: 500,
                            fontFamily: 'Poppins, sans-serif',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                color: '#bd93f9',
                                textShadow: '0 0 8px rgba(189, 147, 249, 0.3)'
                            }
                        }}>
                            {currentRole === 'mentor' ? 'Senior Mentor' : 'IITK Student'}
                        </Typography>
                    </Link>
                </MenuItem>
                <Divider sx={{ borderColor: 'rgba(255, 121, 198, 0.12)' }} />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" sx={{ 
                            color: '#ff79c6',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                color: '#bd93f9'
                            }
                        }} />
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ 
                        color: '#e6e6e6',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': { 
                            color: '#bd93f9',
                            textShadow: '0 0 8px rgba(189, 147, 249, 0.3)'
                        }
                    }}>
                        Settings
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ 
                            color: '#ff5555',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                color: '#ff3333'
                            }
                        }} />
                    </ListItemIcon>
                    <Link to="/logout" style={{ 
                        textDecoration: 'none'
                    }}>
                        <Typography variant="body1" sx={{ 
                            color: '#ff5555',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': { 
                                color: '#ff3333',
                                textShadow: '0 0 8px rgba(255, 85, 85, 0.4)'
                            }
                        }}>
                            Logout
                        </Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );
}

export default AccountMenu

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 12px rgba(255, 121, 198, 0.2))',
        mt: 1.5,
        borderRadius: 2,
        bgcolor: '#121212',
        border: '1px solid rgba(255, 121, 198, 0.15)',
        backdropFilter: 'blur(8px)',
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '& .MuiMenuItem-root': {
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                background: 'linear-gradient(135deg, rgba(255, 121, 198, 0.08) 0%, rgba(189, 147, 249, 0.08) 100%)'
            }
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: '#121212',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
            borderLeft: '1px solid rgba(255, 121, 198, 0.15)',
            borderTop: '1px solid rgba(255, 121, 198, 0.15)',
        },
    }
}