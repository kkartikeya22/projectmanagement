import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Badge,
  Tooltip,
} from '@mui/material';
import { SportsMartialArts, EmojiEvents, Groups } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <Badge badgeContent="IITK" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff79c6', color: '#f8f8f2' } }}>
                    <SportsMartialArts sx={{ color: '#f8f8f2' }} fontSize="large" />
                  </Badge>
                </Box>
                <StyledTypography>
                  Program Admin
                </StyledTypography>
                <StyledText>
                  Manage and oversee the mentorship program at IIT Kanpur.
                </StyledText>
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Student")}>
                <Box mb={2}>
                  <Tooltip title="Mentee">
                    <Badge badgeContent="2023" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff79c6', color: '#f8f8f2' } }}>
                      <Groups sx={{ color: '#f8f8f2' }} fontSize="large" />
                    </Badge>
                  </Tooltip>
                </Box>
                <StyledTypography>
                  Mentee
                </StyledTypography>
                <StyledText>
                  Track your project milestones and connect with your IITK mentor.
                </StyledText>
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler("Teacher")}>
                <Box mb={2}>
                  <Badge badgeContent="Senior" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff79c6', color: '#f8f8f2' } }}>
                    <EmojiEvents sx={{ color: '#f8f8f2' }} fontSize="large" />
                  </Badge>
                </Box>
                <StyledTypography>
                  Mentor
                </StyledTypography>
                <StyledText>
                  Guide and support your mentees through their project journey at IITK.
                </StyledText>
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#f8f8f2', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background-color: #282a36;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #282a36;
  border: 1px solid #44475a;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #44475a;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
  font-weight: bold;
  color: #bd93f9;
`;

const StyledText = styled.p`
  color: #6272a4;
`;