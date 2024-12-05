import { Container, Grid, Paper, Badge, Tooltip } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimerIcon from '@mui/icons-material/Timer';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <Badge badgeContent="IITK" color="warning">
                                <GroupsIcon sx={{ fontSize: 40, color: '#ff79c6' }} />
                            </Badge>
                            <Title>
                                Mentee Squad
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <Tooltip title="Project Milestones">
                                <SportsMartialArtsIcon sx={{ fontSize: 40, color: '#ff79c6' }} />
                            </Tooltip>
                            <Title>
                                Project Goals
                            </Title>
                            <Data start={0} end={numberOfSessions} duration={5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <Badge badgeContent="Progress" color="success">
                                <AssignmentIcon sx={{ fontSize: 40, color: '#ff79c6' }} />
                            </Badge>
                            <Title>
                                Milestones Achieved
                            </Title>
                            <Data start={0} end={24} duration={4} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <Tooltip title="Mentoring Hours">
                                <TimerIcon sx={{ fontSize: 40, color: '#ff79c6' }} />
                            </Tooltip>
                            <Title>
                                Mentoring Time
                            </Title>
                            <Data start={0} end={30} duration={4} suffix="hrs"/>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledNoticePaper>
                            <SeeNotice />
                        </StyledNoticePaper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #282a36;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(189, 147, 249, 0.3);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(189, 147, 249, 0.4);
  }
`;

const StyledNoticePaper = styled(Paper)`
  padding: 16px;
  background-color: #282a36;
  box-shadow: 0 4px 8px rgba(189, 147, 249, 0.3);
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #f8f8f2;
  margin: 10px 0;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: #ff79c6;
  font-weight: bold;
`;

export default TeacherHomePage