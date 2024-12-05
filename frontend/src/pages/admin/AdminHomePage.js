import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { FaUserGraduate, FaUsers, FaProjectDiagram, FaTrophy } from 'react-icons/fa';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <IconWrapper>
                                <FaUserGraduate size={40} color="#ff79c6"/>
                            </IconWrapper>
                            <Title>
                                Total Mentees
                            </Title>
                            <StatsContainer>
                                <Data start={0} end={numberOfStudents} duration={2.5} />
                                <Badge>IITK Students</Badge>
                            </StatsContainer>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <IconWrapper>
                                <FaProjectDiagram size={40} color="#bd93f9"/>
                            </IconWrapper>
                            <Title>
                                Active Projects
                            </Title>
                            <StatsContainer>
                                <Data start={0} end={numberOfClasses} duration={5} />
                                <Badge>In Progress</Badge>
                            </StatsContainer>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <IconWrapper>
                                <FaTrophy size={40} color="#ff5555"/>
                            </IconWrapper>
                            <Title>
                                Senior Mentors
                            </Title>
                            <StatsContainer>
                                <Data start={0} end={numberOfTeachers} duration={2.5} />
                                <Badge>Project Leaders</Badge>
                            </StatsContainer>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <IconWrapper>
                                <FaUsers size={40} color="#ff79c6"/>
                            </IconWrapper>
                            <Title>
                                Team Progress
                            </Title>
                            <StatsContainer>
                                <Data start={0} end={78} duration={2.5} suffix="%" />
                                <Badge>On Track</Badge>
                            </StatsContainer>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', background: '#1e1e1e', color: '#e6e6e6' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: relative;
  transition: transform 0.3s ease;
  background: #121212;
  border: 1px solid #2a002e;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(189, 147, 249, 0.2);
    border-color: #bd93f9;
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ff79c6;
  margin: 10px 0;
  font-family: 'Poppins', sans-serif;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  font-weight: bold;
  background: linear-gradient(45deg, #ff79c6, #bd93f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
  font-family: 'Poppins', sans-serif;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.span`
  font-size: 0.75rem;
  background: #1e1e1e;
  padding: 4px 12px;
  border-radius: 12px;
  color: #e6e6e6;
  font-weight: 500;
  border: 1px solid #ff79c6;
`;

const IconWrapper = styled.div`
  background: #1e1e1e;
  padding: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #2a002e;
`;

export default AdminHomePage