import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Badge } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups"; 
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CampaignIcon from '@mui/icons-material/Campaign';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();

    const sidebarStyle = {
        backgroundColor: '#121212',
        color: '#e6e6e6',
        '& .MuiListItemButton-root': {
            marginBottom: '8px',
            borderRadius: '8px',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                backgroundColor: '#1e1e1e',
                transform: 'scale(1.02)',
                boxShadow: '0 0 10px #ff79c6'
            }
        },
        '& .MuiListItemText-primary': {
            color: '#ff79c6',
            fontFamily: 'Poppins, sans-serif'
        },
        '& .MuiListItemText-secondary': {
            color: '#bd93f9',
            fontFamily: 'Poppins, sans-serif'
        },
        '& .MuiListItemIcon-root': {
            color: '#ff79c6'
        },
        '& .MuiDivider-root': {
            backgroundColor: '#2a002e'
        },
        '& .MuiListSubheader-root': {
            backgroundColor: '#121212',
            color: '#ff5555',
            fontFamily: 'Poppins, sans-serif'
        }
    };

    return (
        <div style={sidebarStyle}>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <DashboardIcon color={location.pathname === ("/" || "/Admin/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" secondary="Project Overview" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/classes">
                    <ListItemIcon>
                        <Badge badgeContent="New" color="error">
                            <EmojiEventsIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Training Sessions" secondary="Schedule & Progress" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/subjects">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Project Tracks" secondary="Technical Domains" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/teachers">
                    <ListItemIcon>
                        <SportsMartialArtsIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Mentors" secondary="Senior Students" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/students">
                    <ListItemIcon>
                        <GroupsIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Mentees" secondary="Junior Students" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/notices">
                    <ListItemIcon>
                        <Badge badgeContent={3} color="warning">
                            <CampaignIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Announcements" secondary="Updates & News" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Admin/complains">
                    <ListItemIcon>
                        <FeedbackIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Feedback" secondary="Issues & Suggestions" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    Profile Settings
                </ListSubheader>
                <ListItemButton component={Link} to="/Admin/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" secondary="View & Edit Details" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItemButton>
            </React.Fragment>
        </div>
    )
}

export default SideBar
