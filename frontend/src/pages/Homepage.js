import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Badge, Tooltip } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';
import { SportsMartialArts, EmojiEvents, Groups } from '@mui/icons-material';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <Badge badgeContent="IITK" color="primary">
                            <StyledTitle>
                                Welcome to
                                <br />
                                Project Mentorship
                                <br />
                                Platform
                            </StyledTitle>
                        </Badge>
                        <StyledText>
                            <Tooltip title="Project Goals">
                                <SportsMartialArts sx={{ mr: 1, color: '#1976d2' }} />
                            </Tooltip>
                            Track project milestones, organize team tasks, and connect with your mentors.
                            Monitor progress, assess performance, and receive guidance.
                            Stay updated on project goals and collaborate effectively.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <Badge color="primary" variant="dot">
                                    <LightPurpleButton variant="contained" fullWidth
                                        startIcon={<EmojiEvents />}>
                                        Join Your Squad
                                    </LightPurpleButton>
                                </Badge>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                                <Button variant="outlined" fullWidth
                                    startIcon={<Groups />}
                                    sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                                >
                                    Try Demo Access
                                </Button>
                            </StyledLink>
                            <StyledText>
                                New to the platform?{' '}
                                <Link to="/Adminregister" style={{color:"#550080"}}>
                                    Register as Mentor
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
  background: linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%);
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #1976d2;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  color: #424242;
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
