import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex', bgcolor: '#121212', minHeight: '100vh' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute' 
                    sx={{
                        background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                        boxShadow: '0 3px 5px 2px rgba(189, 147, 249, .3)'
                    }}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SportsMartialArtsIcon sx={{ fontSize: 32, color: '#f8f8f2' }} />
                            <Typography
                                component="h1"
                                variant="h6"
                                color="#f8f8f2"
                                noWrap
                                sx={{ flexGrow: 1, fontFamily: 'Poppins' }}
                            >
                                Mentee Dashboard
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Badge badgeContent="IITK" color="warning" sx={{ mr: 2 }}>
                            <EmojiEventsIcon sx={{ color: '#f8f8f2' }} />
                        </Badge>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} 
                    sx={[
                        open ? styles.drawerStyled : styles.hideDrawer,
                        {
                            '& .MuiDrawer-paper': {
                                background: '#282a36',
                                borderRight: '1px solid #44475a'
                            }
                        }
                    ]}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer} sx={{ color: '#ff79c6' }}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider sx={{ bgcolor: '#44475a' }} />
                    <List component="nav">
                        <StudentSideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Box sx={{ p: 4 }}>
                        <Routes>
                            <Route path="/" element={<StudentHomePage />} />
                            <Route path='*' element={<Navigate to="/" />} />
                            <Route path="/Student/dashboard" element={<StudentHomePage />} />
                            <Route path="/Student/profile" element={<StudentProfile />} />
                            <Route path="/Student/subjects" element={<StudentSubjects />} />
                            <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                            <Route path="/Student/complain" element={<StudentComplain />} />
                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default StudentDashboard

const styles = {
    boxStyled: {
        backgroundColor: '#121212',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        color: '#f8f8f2',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}