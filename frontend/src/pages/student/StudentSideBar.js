import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Badge } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton 
                    component={Link} 
                    to="/"
                    sx={{
                        backgroundColor: location.pathname === ("/" || "/Student/dashboard") ? '#ff79c6' : 'transparent',
                        color: location.pathname === ("/" || "/Student/dashboard") ? '#282a36' : '#f8f8f2',
                        '&:hover': {
                            backgroundColor: '#ff79c6',
                            color: '#282a36',
                        }
                    }}
                >
                    <ListItemIcon>
                        <HomeIcon sx={{ color: location.pathname === ("/" || "/Student/dashboard") ? '#282a36' : '#f8f8f2' }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Student/subjects"
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Student/subjects") ? '#ff79c6' : 'transparent',
                        color: location.pathname.startsWith("/Student/subjects") ? '#282a36' : '#f8f8f2',
                        '&:hover': {
                            backgroundColor: '#ff79c6',
                            color: '#282a36',
                        }
                    }}
                >
                    <ListItemIcon>
                        <Badge badgeContent="New" color="error">
                            <SportsMartialArtsIcon sx={{ color: location.pathname.startsWith("/Student/subjects") ? '#282a36' : '#f8f8f2' }} />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Project Tracks" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Student/attendance"
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Student/attendance") ? '#ff79c6' : 'transparent',
                        color: location.pathname.startsWith("/Student/attendance") ? '#282a36' : '#f8f8f2',
                        '&:hover': {
                            backgroundColor: '#ff79c6',
                            color: '#282a36',
                        }
                    }}
                >
                    <ListItemIcon>
                        <Badge badgeContent="IITK" color="primary">
                            <EmojiEventsIcon sx={{ color: location.pathname.startsWith("/Student/attendance") ? '#282a36' : '#f8f8f2' }} />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Milestones" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Student/complain"
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Student/complain") ? '#ff79c6' : 'transparent',
                        color: location.pathname.startsWith("/Student/complain") ? '#282a36' : '#f8f8f2',
                        '&:hover': {
                            backgroundColor: '#ff79c6',
                            color: '#282a36',
                        }
                    }}
                >
                    <ListItemIcon>
                        <AssignmentIcon sx={{ color: location.pathname.startsWith("/Student/complain") ? '#282a36' : '#f8f8f2' }} />
                    </ListItemIcon>
                    <ListItemText primary="Feedback" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1, bgcolor: '#6272a4' }} />
            <React.Fragment>
                <ListSubheader 
                    component="div" 
                    inset
                    sx={{
                        bgcolor: 'transparent',
                        color: '#bd93f9'
                    }}
                >
                    Mentee Profile
                </ListSubheader>
                <ListItemButton 
                    component={Link} 
                    to="/Student/profile"
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Student/profile") ? '#ff79c6' : 'transparent',
                        color: location.pathname.startsWith("/Student/profile") ? '#282a36' : '#f8f8f2',
                        '&:hover': {
                            backgroundColor: '#ff79c6',
                            color: '#282a36',
                        }
                    }}
                >
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon sx={{ color: location.pathname.startsWith("/Student/profile") ? '#282a36' : '#f8f8f2' }} />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/logout"
                    sx={{
                        backgroundColor: location.pathname.startsWith("/logout") ? '#ff79c6' : 'transparent',
                        color: location.pathname.startsWith("/logout") ? '#282a36' : '#f8f8f2',
                        '&:hover': {
                            backgroundColor: '#ff79c6',
                            color: '#282a36',
                        }
                    }}
                >
                    <ListItemIcon>
                        <ExitToAppIcon sx={{ color: location.pathname.startsWith("/logout") ? '#282a36' : '#f8f8f2' }} />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default StudentSideBar