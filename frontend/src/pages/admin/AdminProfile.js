import { useSelector } from 'react-redux';
import { Box, Typography, Avatar, Chip, Container } from '@mui/material';
import { FaTrophy, FaUserGraduate } from 'react-icons/fa';
import { GiTeamUpgrade } from 'react-icons/gi';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <Container sx={{ bgcolor: '#121212', minHeight: '100vh', py: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FaUserGraduate style={{ fontSize: '32px', color: '#ff79c6' }}/>
                    <Typography variant="h4" sx={{ color: '#ff79c6', fontFamily: 'Poppins' }}>
                        Project Lead Profile
                    </Typography>
                </Box>

                <Avatar 
                    sx={{ 
                        width: 120, 
                        height: 120,
                        background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                        fontSize: '3rem',
                        boxShadow: '0 0 15px #ff79c6'
                    }}
                >
                    {currentUser.name[0]}
                </Avatar>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#bd93f9', fontFamily: 'Poppins' }}>
                        {currentUser.name}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            icon={<FaTrophy style={{ color: '#ff5555' }}/>}
                            label="Senior Year Mentor"
                            sx={{
                                color: '#ff79c6',
                                borderColor: '#ff79c6',
                                '&:hover': {
                                    background: 'rgba(255, 121, 198, 0.1)',
                                    boxShadow: '0 0 10px #ff79c6'
                                }
                            }}
                            variant="outlined"
                        />
                        <Chip
                            icon={<GiTeamUpgrade style={{ color: '#bd93f9' }}/>}
                            label="Project Lead"
                            sx={{
                                color: '#bd93f9',
                                borderColor: '#bd93f9',
                                '&:hover': {
                                    background: 'rgba(189, 147, 249, 0.1)',
                                    boxShadow: '0 0 10px #bd93f9'
                                }
                            }}
                            variant="outlined"
                        />
                    </Box>

                    <Box sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignItems: 'center',
                        bgcolor: '#1e1e1e',
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid #ff79c6',
                        boxShadow: '0 0 10px rgba(255, 121, 198, 0.2)'
                    }}>
                        <Typography variant="body1" sx={{ color: '#e6e6e6' }}>
                            <strong style={{ color: '#ff79c6' }}>Email:</strong> {currentUser.email}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#e6e6e6' }}>
                            <strong style={{ color: '#ff79c6' }}>Department:</strong> {currentUser.schoolName}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default AdminProfile