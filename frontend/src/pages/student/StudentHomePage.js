import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, Badge } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={4}>
                        <StyledPaper>
                            <Badge badgeContent="IITK" color="warning">
                                <SportsMartialArtsIcon sx={{ fontSize: 40, color: '#ff79c6' }} />
                            </Badge>
                            <Title>
                                Project Tracks
                            </Title>
                            <Data start={0} end={numberOfSubjects} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <StyledPaper>
                            <Badge badgeContent="New" color="error">
                                <EmojiEventsIcon sx={{ fontSize: 40, color: '#ff79c6' }} />
                            </Badge>
                            <Title>
                                Milestones
                            </Title>
                            <Data start={0} end={15} duration={4} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ 
                            p: 2, 
                            display: 'flex', 
                            flexDirection: 'column',
                            background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                            color: '#f8f8f2',
                            boxShadow: '0 3px 5px 2px rgba(189, 147, 249, .3)'
                        }}>
                            <SeeNotice />
                        </Paper>
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
  box-shadow: 0 3px 5px 2px rgba(189, 147, 249, .3);
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 10px #ff79c6;
  }
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #ff79c6;
  font-family: 'Poppins', sans-serif;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: #bd93f9;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
`;

export default StudentHomePage