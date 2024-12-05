import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography, Avatar, Chip, Paper } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, School, EmojiEvents, Assessment, PersonPin, Stars, SportsSoccer } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <>
            {loading
                ?
                <>
                    <div>Loading...</div>
                </>
                :
                <Paper elevation={3} sx={{ p: 3, m: 2, borderRadius: 2, bgcolor: '#282a36' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar sx={{ bgcolor: '#ff79c6', mr: 2 }}>
                            <PersonPin />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f8f8f2' }}>
                                {userDetails.name}
                                <Chip 
                                    icon={<Stars sx={{ color: '#f8f8f2' }} />} 
                                    label="Mentee" 
                                    size="small"
                                    sx={{ ml: 1, bgcolor: '#ff79c6', color: '#f8f8f2' }}
                                />
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#6272a4' }}>
                                Roll Number: {userDetails.rollNum}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        <Chip icon={<School sx={{ color: '#f8f8f2' }} />} label={`Class: ${sclassName.sclassName}`} sx={{ bgcolor: '#44475a', color: '#f8f8f2' }} />
                        <Chip icon={<EmojiEvents sx={{ color: '#f8f8f2' }} />} label={`IITK ${studentSchool.schoolName}`} sx={{ bgcolor: '#44475a', color: '#f8f8f2' }} />
                    </Box>

                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: '#bd93f9' }}>
                        <Assessment sx={{ mr: 1 }} /> Performance Tracking
                    </Typography>

                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
                        &&
                        <>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                if (subName === teachSubject) {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                    return (
                                        <Table key={index}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Project Module</StyledTableCell>
                                                    <StyledTableCell>Completed Tasks</StyledTableCell>
                                                    <StyledTableCell>Total Tasks</StyledTableCell>
                                                    <StyledTableCell>Completion Rate</StyledTableCell>
                                                    <StyledTableCell align="center">Details</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>

                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell>{subName}</StyledTableCell>
                                                    <StyledTableCell>{present}</StyledTableCell>
                                                    <StyledTableCell>{sessions}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <Chip 
                                                            label={`${subjectAttendancePercentage}%`}
                                                            sx={{ 
                                                                bgcolor: subjectAttendancePercentage >= 75 ? '#50fa7b' : '#ffb86c',
                                                                color: '#282a36'
                                                            }}
                                                        />
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Button 
                                                            variant="contained" 
                                                            sx={{ bgcolor: '#ff79c6', '&:hover': { bgcolor: '#ff92d0' } }}
                                                            onClick={() => handleOpen(subId)}
                                                        >
                                                            {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                            Task History
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow>
                                                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                        <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Typography variant="h6" gutterBottom component="div" sx={{ color: '#bd93f9' }}>
                                                                    Task Completion Details
                                                                </Typography>
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead>
                                                                        <StyledTableRow>
                                                                            <StyledTableCell>Date</StyledTableCell>
                                                                            <StyledTableCell align="right">Status</StyledTableCell>
                                                                        </StyledTableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {allData.map((data, index) => {
                                                                            const date = new Date(data.date);
                                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                            return (
                                                                                <StyledTableRow key={index}>
                                                                                    <StyledTableCell component="th" scope="row">
                                                                                        {dateString}
                                                                                    </StyledTableCell>
                                                                                    <StyledTableCell align="right">
                                                                                        <Chip 
                                                                                            size="small"
                                                                                            label={data.status}
                                                                                            sx={{ 
                                                                                                bgcolor: data.status === "Present" ? '#50fa7b' : '#ff5555',
                                                                                                color: '#282a36'
                                                                                            }}
                                                                                        />
                                                                                    </StyledTableCell>
                                                                                </StyledTableRow>
                                                                            );
                                                                        })}
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                }
                                else {
                                    return null
                                }
                            })}
                            <Box sx={{ mt: 3, mb: 3, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
                                    Overall Progress: {overallAttendancePercentage.toFixed(2)}%
                                    <Chip 
                                        icon={<SportsSoccer sx={{ color: '#282a36' }} />}
                                        label={overallAttendancePercentage >= 75 ? "On Track!" : "Needs Focus!"}
                                        sx={{ 
                                            ml: 2,
                                            bgcolor: overallAttendancePercentage >= 75 ? '#50fa7b' : '#ffb86c',
                                            color: '#282a36'
                                        }}
                                    />
                                </Typography>
                                <CustomPieChart data={chartData} />
                            </Box>
                        </>
                    }

                    <Button
                        variant="contained"
                        sx={{ mb: 4, bgcolor: '#ff79c6', '&:hover': { bgcolor: '#ff92d0' } }}
                        startIcon={<Assessment />}
                        onClick={() =>
                            navigate(
                                `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                            )
                        }
                    >
                        Update Progress
                    </Button>

                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: '#bd93f9' }}>
                        <EmojiEvents sx={{ mr: 1 }} /> Achievement Scores
                    </Typography>

                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 &&
                        <>
                            {subjectMarks.map((result, index) => {
                                if (result.subName.subName === teachSubject) {
                                    return (
                                        <Table key={index}>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Project Module</StyledTableCell>
                                                    <StyledTableCell>Score</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <Chip 
                                                            label={`${result.marksObtained}/100`}
                                                            sx={{
                                                                bgcolor: result.marksObtained >= 60 ? '#50fa7b' : '#ffb86c',
                                                                color: '#282a36'
                                                            }}
                                                        />
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    )
                                }
                                else if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return null
                            })}
                        </>
                    }
                    <Button
                        variant="contained"
                        sx={{ 
                            mt: 2,
                            bgcolor: '#bd93f9', 
                            '&:hover': { bgcolor: '#c7a3fc' },
                            color: '#f8f8f2'
                        }}
                        startIcon={<Stars />}
                        onClick={() =>
                            navigate(
                                `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                            )}
                    >
                        Update Score
                    </Button>
                </Paper>
            }
        </>
    )
}

export default TeacherViewStudent