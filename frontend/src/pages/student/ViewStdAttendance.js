import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp, EmojiEvents, School, Stars } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Paper, Table, TableBody, TableHead, Typography, Chip, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';

import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const getAttendanceBadge = (percentage) => {
        if (percentage >= 90) return <Tooltip title="Outstanding!"><EmojiEvents sx={{ color: '#ff79c6' }} /></Tooltip>;
        if (percentage >= 75) return <Tooltip title="Good Going!"><Stars sx={{ color: '#50fa7b' }} /></Tooltip>;
        return <Tooltip title="Needs Improvement"><School sx={{ color: '#ffb86c' }} /></Tooltip>;
    };

    const renderTableSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: '#f8f8f2', fontWeight: 'bold' }}>
                    Your Attendance Scorecard
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Course Name</StyledTableCell>
                            <StyledTableCell>Sessions Attended</StyledTableCell>
                            <StyledTableCell>Total Sessions</StyledTableCell>
                            <StyledTableCell>Performance</StyledTableCell>
                            <StyledTableCell align="center">View Details</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                        return (
                            <TableBody key={index}>
                                <StyledTableRow>
                                    <StyledTableCell>
                                        {subName}
                                        {getAttendanceBadge(subjectAttendancePercentage)}
                                    </StyledTableCell>
                                    <StyledTableCell>{present}</StyledTableCell>
                                    <StyledTableCell>{sessions}</StyledTableCell>
                                    <StyledTableCell>
                                        <Chip 
                                            label={`${subjectAttendancePercentage}%`}
                                            color={subjectAttendancePercentage >= 75 ? "success" : "warning"}
                                            variant="outlined"
                                            sx={{
                                                color: '#f8f8f2',
                                                borderColor: subjectAttendancePercentage >= 75 ? '#50fa7b' : '#ffb86c'
                                            }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button 
                                            variant="contained"
                                            onClick={() => handleOpen(subId)}
                                            sx={{ 
                                                borderRadius: '20px',
                                                bgcolor: '#ff79c6',
                                                '&:hover': {
                                                    bgcolor: '#ff92d0'
                                                }
                                            }}
                                        >
                                            {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                            Track Record
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Typography variant="h6" gutterBottom component="div" sx={{ color: '#f8f8f2' }}>
                                                    Detailed Performance Log
                                                </Typography>
                                                <Table size="small" aria-label="purchases">
                                                    <TableHead>
                                                        <StyledTableRow>
                                                            <StyledTableCell>Session Date</StyledTableCell>
                                                            <StyledTableCell align="right">Attendance</StyledTableCell>
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
                                                                            label={data.status}
                                                                            color={data.status === "Present" ? "success" : "error"}
                                                                            size="small"
                                                                            sx={{
                                                                                color: '#f8f8f2',
                                                                                bgcolor: data.status === "Present" ? '#50fa7b' : '#ff5555'
                                                                            }}
                                                                        />
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            )
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        )
                    }
                    )}
                </Table>
                <StyledBox>
                    <Typography variant="h6">
                        Overall Performance Score: 
                        <Chip 
                            label={`${overallAttendancePercentage.toFixed(2)}%`}
                            sx={{ 
                                ml: 1,
                                color: '#f8f8f2',
                                bgcolor: overallAttendancePercentage >= 75 ? '#50fa7b' : '#ffb86c'
                            }}
                        />
                        {getAttendanceBadge(overallAttendancePercentage)}
                    </Typography>
                </StyledBox>
            </>
        )
    }

    const renderChartSection = () => {
        return (
            <>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: '#f8f8f2', fontWeight: 'bold' }}>
                    Performance Analytics
                </Typography>
                <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
            </>
        )
    };

    return (
        <>
            {loading
                ? (
                    <div style={{ color: '#f8f8f2' }}>Loading your performance data...</div>
                )
                :
                <div>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ?
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <StyledBottomNav elevation={3}>
                                <BottomNavigation 
                                    value={selectedSection} 
                                    onChange={handleSectionChange} 
                                    showLabels 
                                    sx={{ bgcolor: '#282a36' }}
                                >
                                    <BottomNavigationAction
                                        label="Scorecard"
                                        value="table"
                                        icon={selectedSection === 'table' ? 
                                            <TableChartIcon sx={{ color: '#ff79c6' }} /> : 
                                            <TableChartOutlinedIcon sx={{ color: '#f8f8f2' }} />
                                        }
                                        sx={{ 
                                            color: selectedSection === 'table' ? '#ff79c6' : '#f8f8f2'
                                        }}
                                    />
                                    <BottomNavigationAction
                                        label="Analytics"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? 
                                            <InsertChartIcon sx={{ color: '#ff79c6' }} /> : 
                                            <InsertChartOutlinedIcon sx={{ color: '#f8f8f2' }} />
                                        }
                                        sx={{ 
                                            color: selectedSection === 'chart' ? '#ff79c6' : '#f8f8f2'
                                        }}
                                    />
                                </BottomNavigation>
                            </StyledBottomNav>
                        </>
                        :
                        <>
                            <Typography variant="h6" gutterBottom component="div" sx={{ color: '#f8f8f2', textAlign: 'center' }}>
                                No Performance Data Available Yet
                            </Typography>
                        </>
                    }
                </div>
            }
        </>
    )
}

export default ViewStdAttendance

const StyledBox = styled(Box)`
    margin-top: 16px;
    padding: 16px;
    background-color: #282a36;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f8f8f2;
`;

const StyledBottomNav = styled(Paper)`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #282a36;
    box-shadow: 0 3px 5px 2px rgba(189, 147, 249, .3);
`;