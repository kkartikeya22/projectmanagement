import React, { useEffect, useState } from 'react'
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper, Chip, Avatar } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { FaTrophy, FaMedal, FaProjectDiagram, FaUsers, FaUserGraduate } from 'react-icons/fa';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #121212;
  min-height: 100vh;
  color: #f8f8f2;
  font-family: 'Poppins', sans-serif;
`;

const StyledBox = styled(Box)`
  background-color: #282a36;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(189, 147, 249, 0.2);
`;

const ViewSubject = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error)
  }

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { 
      id: 'rollNum', 
      label: 'Roll No.', 
      minWidth: 100,
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#f8f8f2' }}>
          <FaUserGraduate style={{ color: '#ff79c6' }}/>
          <Typography>{value}</Typography>
        </Box>
      )
    },
    { 
      id: 'name', 
      label: 'Mentee Name', 
      minWidth: 170,
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#f8f8f2' }}>
          <Avatar sx={{ width: 24, height: 24, bgcolor: '#bd93f9' }}>{value[0]}</Avatar>
          <Typography>{value}</Typography>
        </Box>
      )
    }
  ]

  const studentRows = sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  })

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
          sx={{
            background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
            color: '#f8f8f2'
          }}
        >
          View Progress
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
          }
          sx={{
            background: 'linear-gradient(45deg, #bd93f9 30%, #ff79c6 90%)',
            color: '#f8f8f2'
          }}
        >
          Track Milestones
        </PurpleButton>
      </>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
          sx={{
            background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
            color: '#f8f8f2'
          }}
        >
          View Progress
        </BlueButton>
        <PurpleButton 
          variant="contained"
          onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
          sx={{
            background: 'linear-gradient(45deg, #bd93f9 30%, #ff79c6 90%)',
            color: '#f8f8f2'
          }}
        >
          Award Points
        </PurpleButton>
      </>
    );
  };

  const SubjectStudentsSection = () => {
    return (
      <>
        {getresponse ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton
                variant="contained"
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                sx={{
                  background: 'linear-gradient(45deg, #50fa7b 30%, #8be9fd 90%)',
                  color: '#282a36'
                }}
              >
                Add Mentees
              </GreenButton>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, bgcolor: '#282a36', p: 2, borderRadius: '10px' }}>
              <FaUsers style={{ fontSize: '24px', color: '#ff79c6' }}/>
              <Typography variant="h5" sx={{ color: '#f8f8f2' }}>
                Mentees List
              </Typography>
            </Box>

            {selectedSection === 'attendance' &&
              <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
            }
            {selectedSection === 'marks' &&
              <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
            }

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: '#282a36' }} elevation={3}>
              <BottomNavigation 
                value={selectedSection} 
                onChange={handleSectionChange} 
                showLabels
                sx={{ bgcolor: '#282a36' }}
              >
                <BottomNavigationAction
                  label="Milestones"
                  value="attendance"
                  icon={selectedSection === 'attendance' ? 
                    <TableChartIcon sx={{ color: '#ff79c6' }}/> : 
                    <TableChartOutlinedIcon sx={{ color: '#6272a4' }}/>
                  }
                  sx={{ color: selectedSection === 'attendance' ? '#ff79c6' : '#6272a4' }}
                />
                <BottomNavigationAction
                  label="Points"
                  value="marks"
                  icon={selectedSection === 'marks' ? 
                    <InsertChartIcon sx={{ color: '#ff79c6' }}/> : 
                    <InsertChartOutlinedIcon sx={{ color: '#6272a4' }}/>
                  }
                  sx={{ color: selectedSection === 'marks' ? '#ff79c6' : '#6272a4' }}
                />
              </BottomNavigation>
            </Paper>
          </>
        )}
      </>
    )
  }

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, justifyContent: 'center', bgcolor: '#282a36', p: 2, borderRadius: '10px' }}>
          <FaProjectDiagram style={{ fontSize: '32px', color: '#ff79c6' }}/>
          <Typography variant="h4" sx={{ color: '#f8f8f2' }}>
            Project Module Details
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#282a36', p: 3, borderRadius: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaProjectDiagram style={{ color: '#ff79c6' }}/>
            <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
              Module Name: {subjectDetails && subjectDetails.subName}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaMedal style={{ color: '#ffb86c' }}/>
            <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
              Module Code: {subjectDetails && subjectDetails.subCode}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaTrophy style={{ color: '#f1fa8c' }}/>
            <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
              Total Milestones: {subjectDetails && subjectDetails.sessions}
            </Typography>
          </Box>

          <Chip
            icon={<FaUsers style={{ color: '#ff79c6' }}/>}
            label={`${numberOfStudents} Mentees Enrolled`}
            sx={{ 
              width: 'fit-content',
              bgcolor: '#44475a',
              color: '#f8f8f2'
            }}
          />

          <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
            Project Group: {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
          </Typography>

          {subjectDetails && subjectDetails.teacher ?
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FaUserGraduate style={{ color: '#ff79c6' }}/>
              <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
                Mentor: {subjectDetails.teacher.name}
              </Typography>
            </Box>
            :
            <GreenButton 
              variant="contained"
              onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
              sx={{
                background: 'linear-gradient(45deg, #50fa7b 30%, #8be9fd 90%)',
                color: '#282a36'
              }}
            >
              Assign Mentor
            </GreenButton>
          }
        </Box>
      </>
    );
  }

  return (
    <PageContainer>
      {subloading ?
        <div style={{ color: '#f8f8f2' }}>Loading...</div>
        :
        <>
          <Box sx={{ width: '100%', typography: 'body1' }} >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: '#6272a4' }}>
                <TabList 
                  onChange={handleChange} 
                  sx={{ 
                    position: 'fixed', 
                    width: '100%', 
                    bgcolor: '#282a36', 
                    zIndex: 1,
                    '& .MuiTab-root': {
                      color: '#6272a4',
                      '&.Mui-selected': {
                        color: '#ff79c6'
                      }
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#ff79c6'
                    }
                  }}
                >
                  <Tab label="Module Details" value="1" />
                  <Tab label="Mentees" value="2" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <SubjectDetailsSection />
                </TabPanel>
                <TabPanel value="2">
                  <SubjectStudentsSection />
                </TabPanel>
              </Container>
            </TabContext>
          </Box>
        </>
      }
    </PageContainer>
  )
}

export default ViewSubject