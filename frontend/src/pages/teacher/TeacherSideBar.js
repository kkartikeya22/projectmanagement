import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Badge } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FeedbackIcon from '@mui/icons-material/Feedback';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import { useSelector } from 'react-redux';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass

    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <StyledListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <Badge color="secondary" variant="dot">
                            <SportsMartialArtsIcon sx={{ color: location.pathname === ("/" || "/Teacher/dashboard") ? '#ff79c6' : '#f8f8f2' }} />
                        </Badge>
                    </ListItemIcon>
                    <StyledListItemText primary="Dashboard" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Teacher/class">
                    <ListItemIcon>
                        <Badge badgeContent={sclassName.sclassName} sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff79c6', color: '#f8f8f2' } }}>
                            <GroupsIcon sx={{ color: location.pathname.startsWith("/Teacher/class") ? '#ff79c6' : '#f8f8f2' }} />
                        </Badge>
                    </ListItemIcon>
                    <StyledListItemText primary="Mentee Squad" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/Teacher/complain">
                    <ListItemIcon>
                        <Badge color="error" variant="dot">
                            <FeedbackIcon sx={{ color: location.pathname.startsWith("/Teacher/complain") ? '#ff79c6' : '#f8f8f2' }} />
                        </Badge>
                    </ListItemIcon>
                    <StyledListItemText primary="Feedback" />
                </StyledListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1, backgroundColor: '#44475a' }} />
            <React.Fragment>
                <StyledListSubheader component="div" inset>
                    Mentor Profile
                </StyledListSubheader>
                <StyledListItemButton component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <Badge color="success" variant="dot">
                            <AccountCircleOutlinedIcon sx={{ color: location.pathname.startsWith("/Teacher/profile") ? '#ff79c6' : '#f8f8f2' }} />
                        </Badge>
                    </ListItemIcon>
                    <StyledListItemText primary="My Profile" />
                </StyledListItemButton>
                <StyledListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon sx={{ color: location.pathname.startsWith("/logout") ? '#ff79c6' : '#f8f8f2' }} />
                    </ListItemIcon>
                    <StyledListItemText primary="Sign Out" />
                </StyledListItemButton>
            </React.Fragment>
        </>
    )
}

const StyledListItemButton = styled(ListItemButton)`
    &:hover {
        background-color: #44475a;
    }
`;

const StyledListItemText = styled(ListItemText)`
    & .MuiListItemText-primary {
        color: #f8f8f2;
    }
`;

const StyledListSubheader = styled(ListSubheader)`
    background-color: transparent;
    color: #bd93f9;
`;

export default TeacherSideBar