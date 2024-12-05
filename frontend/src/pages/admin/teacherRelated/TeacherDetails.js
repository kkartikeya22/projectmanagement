import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Box, Avatar, Chip } from '@mui/material';
import { FaUserGraduate, FaUsers, FaProjectDiagram, FaTrophy } from 'react-icons/fa';
import { PurpleButton } from '../../../components/buttonStyles';
import styled from 'styled-components';

const PageContainer = styled.div`
    background-color: #121212;
    min-height: 100vh;
    padding: 20px;
    color: #f8f8f2;
    font-family: 'Poppins', sans-serif;
`;

const StyledBox = styled(Box)`
    background-color: #282a36;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(189, 147, 249, 0.2);
`;

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <PageContainer>
            {loading ? (
                <Typography sx={{ color: '#f8f8f2' }}>Loading...</Typography>
            ) : (
                <StyledBox>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, justifyContent: 'center' }}>
                        <FaUserGraduate style={{ fontSize: '32px', color: '#ff79c6' }}/>
                        <Typography variant="h4" sx={{ color: '#f8f8f2' }}>
                            Senior Mentor Profile
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#bd93f9', width: 56, height: 56 }}>
                                {teacherDetails?.name?.[0]}
                            </Avatar>
                            <Typography variant="h5" sx={{ color: '#f8f8f2' }}>
                                {teacherDetails?.name}
                            </Typography>
                            <Chip 
                                icon={<FaTrophy style={{ color: '#f1fa8c' }}/>}
                                label="Senior Mentor"
                                sx={{ 
                                    bgcolor: '#44475a',
                                    color: '#f8f8f2',
                                    borderColor: '#6272a4'
                                }}
                                variant="outlined"
                            />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FaUsers style={{ color: '#bd93f9' }}/>
                            <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
                                Project Group: {teacherDetails?.teachSclass?.sclassName}
                            </Typography>
                        </Box>

                        {isSubjectNamePresent ? (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <FaProjectDiagram style={{ color: '#ff79c6' }}/>
                                    <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
                                        Project Module: {teacherDetails?.teachSubject?.subName}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <FaTrophy style={{ color: '#f1fa8c' }}/>
                                    <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
                                        Total Milestones: {teacherDetails?.teachSubject?.sessions}
                                    </Typography>
                                </Box>
                            </>
                        ) : (
                            <PurpleButton 
                                variant="contained" 
                                onClick={handleAddSubject}
                                startIcon={<FaProjectDiagram />}
                                sx={{
                                    background: 'linear-gradient(45deg, #bd93f9 30%, #ff79c6 90%)',
                                    color: '#f8f8f2'
                                }}
                            >
                                Assign Project Module
                            </PurpleButton>
                        )}
                    </Box>
                </StyledBox>
            )}
        </PageContainer>
    );
};

export default TeacherDetails;