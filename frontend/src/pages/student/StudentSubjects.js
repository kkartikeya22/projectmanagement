import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography, Badge } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'
import styled from 'styled-components';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {

    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <StyledPaper>
                <Typography variant="h4" align="center" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, color: '#f8f8f2' }}>
                    <SportsMartialArtsIcon sx={{ fontSize: 35, color: '#ff79c6' }} />
                    Project Progress
                    <Badge badgeContent="IITK" color="warning">
                        <EmojiEventsIcon sx={{ fontSize: 35, color: '#ff79c6' }} />
                    </Badge>
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Project Track</StyledTableCell>
                            <StyledTableCell>Progress Score</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </StyledPaper>
        );
    };

    const renderChartSection = () => {
        return (
            <StyledPaper>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </StyledPaper>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <Container>
                <StyledPaper>
                    <Typography variant="h4" align="center" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, color: '#f8f8f2' }}>
                        <SportsMartialArtsIcon sx={{ fontSize: 35, color: '#ff79c6' }} />
                        Project Details
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ color: '#f8f8f2' }}>
                        You are currently in Batch {sclassDetails && sclassDetails.sclassName}
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#f8f8f2' }}>
                        Available Project Tracks:
                        <Badge badgeContent="New" color="error">
                            <EmojiEventsIcon sx={{ color: '#ff79c6' }} />
                        </Badge>
                    </Typography>
                    {subjectsList &&
                        subjectsList.map((subject, index) => (
                            <div key={index}>
                                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#f8f8f2' }}>
                                    <SportsMartialArtsIcon sx={{ fontSize: 20, color: '#ff79c6' }} />
                                    {subject.subName} ({subject.subCode})
                                </Typography>
                            </div>
                        ))}
                </StyledPaper>
            </Container>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <StyledBottomNav sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels sx={{ bgcolor: '#282a36' }}>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon sx={{ color: '#ff79c6' }} /> : <TableChartOutlinedIcon sx={{ color: '#f8f8f2' }} />}
                                        sx={{ color: selectedSection === 'table' ? '#ff79c6' : '#f8f8f2' }}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon sx={{ color: '#ff79c6' }} /> : <InsertChartOutlinedIcon sx={{ color: '#f8f8f2' }} />}
                                        sx={{ color: selectedSection === 'chart' ? '#ff79c6' : '#f8f8f2' }}
                                    />
                                </BottomNavigation>
                            </StyledBottomNav>
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </>
    );
};

export default StudentSubjects;

const StyledPaper = styled(Paper)`
    padding: 20px;
    margin-bottom: 20px;
    background-color: #282a36;
    box-shadow: 0 3px 5px 2px rgba(189, 147, 249, .3);
`;

const StyledBottomNav = styled(Paper)`
    background-color: #282a36;
    box-shadow: 0 3px 5px 2px rgba(189, 147, 249, .3);
`;