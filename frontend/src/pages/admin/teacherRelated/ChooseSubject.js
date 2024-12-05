import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Avatar, Chip } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import { FaProjectDiagram, FaMedal, FaUserGraduate } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
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

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false)

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id
            dispatch(getTeacherFreeClassSubjects(classID));
        }
        else if (situation === "Teacher") {
            const { classID, teacherID } = params
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation]);

    if (loading) {
        return <Typography sx={{ color: '#f8f8f2' }}>Loading...</Typography>;
    } else if (response) {
        return (
            <StyledBox>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <FaProjectDiagram style={{ fontSize: '24px', color: '#ff79c6' }}/>
                    <Typography variant="h5" sx={{ color: '#f8f8f2' }}>
                        All Project Modules Have Mentors Assigned
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <PurpleButton 
                        variant="contained"
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                        startIcon={<FaProjectDiagram />}
                        sx={{
                            background: 'linear-gradient(45deg, #bd93f9 30%, #ff79c6 90%)',
                            color: '#f8f8f2'
                        }}
                    >
                        Add Project Modules
                    </PurpleButton>
                </Box>
            </StyledBox>
        );
    } else if (error) {
        console.log(error)
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true)
        dispatch(updateTeachSubject(teacherId, teachSubject))
        navigate("/Admin/teachers")
    }

    const subjectColumns = [
        { id: 'index', label: '#', minWidth: 50 },
        { id: 'name', label: 'Module Name', minWidth: 170 },
        { id: 'code', label: 'Module Code', minWidth: 100 },
        { id: 'actions', label: 'Actions', minWidth: 100 }
    ];

    const subjectRows = subjectsList && subjectsList.map((subject, index) => ({
        index: <Chip 
            size="small"
            label={index + 1}
            sx={{ bgcolor: '#bd93f9', color: '#f8f8f2' }}
        />,
        name: subject.subName,
        code: <Chip
            icon={<FaMedal style={{ color: '#f1fa8c' }}/>}
            label={subject.subCode}
            sx={{ 
                bgcolor: '#44475a',
                color: '#f8f8f2',
                borderColor: '#6272a4'
            }}
            variant="outlined"
        />,
        id: subject._id
    }));

    const SubjectButtonHaver = ({ row }) => {
        return (
            <PurpleButton 
                variant="contained"
                startIcon={<FaUserGraduate />}
                onClick={() => situation === "Norm" 
                    ? navigate("/Admin/teachers/addteacher/" + row.id)
                    : updateSubjectHandler(teacherID, row.id)
                }
                disabled={loader}
                sx={{
                    background: 'linear-gradient(45deg, #50fa7b 30%, #8be9fd 90%)',
                    color: '#282a36'
                }}
            >
                {loader ? (
                    <div className="load"></div>
                ) : (
                    situation === "Norm" ? 'Become Mentor' : 'Select Module'
                )}
            </PurpleButton>
        );
    };

    return (
        <PageContainer>
            <StyledBox>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ bgcolor: '#bd93f9' }}>
                        <GiTeacher />
                    </Avatar>
                    <Typography variant="h5" sx={{ color: '#f8f8f2' }}>
                        Choose Project Module to Mentor
                    </Typography>
                </Box>
                {Array.isArray(subjectsList) && subjectsList.length > 0 &&
                    <TableTemplate 
                        buttonHaver={SubjectButtonHaver} 
                        columns={subjectColumns} 
                        rows={subjectRows} 
                    />
                }
            </StyledBox>
        </PageContainer>
    );
};

export default ChooseSubject;