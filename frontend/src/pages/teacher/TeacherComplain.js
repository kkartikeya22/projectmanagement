import React from 'react'
import { Typography, Paper, Box, Badge } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CommentIcon from '@mui/icons-material/Comment';
import styled from 'styled-components';

const TeacherComplain = () => {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 2,
        color: '#ff79c6',
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(255, 121, 198, 0.3)'
      }}>
        <FeedbackIcon sx={{ 
          fontSize: 35, 
          color: '#ff79c6',
          filter: 'drop-shadow(0 0 5px rgba(255, 121, 198, 0.5))'
        }} />
        Mentor Feedback Portal
        <Badge badgeContent="Important" color="error" sx={{
          '& .MuiBadge-badge': {
            bgcolor: '#ff5555',
            color: '#f8f8f2',
            boxShadow: '0 0 10px rgba(255, 85, 85, 0.5)'
          }
        }}>
          <FeedbackIcon sx={{ 
            fontSize: 35, 
            color: '#ff79c6',
            filter: 'drop-shadow(0 0 5px rgba(255, 121, 198, 0.5))'
          }} />
        </Badge>
      </Typography>

      <StyledPaper>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          borderBottom: '2px solid #bd93f9',
          paddingBottom: '10px'
        }}>
          <CommentIcon sx={{ 
            color: '#bd93f9',
            fontSize: 28,
            filter: 'drop-shadow(0 0 5px rgba(189, 147, 249, 0.5))'
          }} />
          <Typography variant="h5" sx={{ 
            color: '#bd93f9',
            fontWeight: 'bold',
            textShadow: '0 0 8px rgba(189, 147, 249, 0.3)'
          }}>
            Share Your Concerns
          </Typography>
        </Box>

        <StyledContentBox>
          <Typography sx={{ 
            color: '#e6e6e6',
            lineHeight: 1.8,
            fontSize: '1.1rem',
            letterSpacing: '0.3px'
          }}>
            As a mentor, use this space to provide constructive feedback or raise concerns about your mentee's project progress. Your input helps us maintain a productive learning environment.
          </Typography>
        </StyledContentBox>
      </StyledPaper>
    </>
  )
}

export default TeacherComplain

const StyledPaper = styled(Paper)`
  padding: 25px;
  margin: 20px;
  background-color: #121212;
  box-shadow: 0 4px 20px rgba(189, 147, 249, 0.15);
  border: 1px solid rgba(255, 121, 198, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 25px rgba(189, 147, 249, 0.25);
    transform: translateY(-2px);
  }
`;

const StyledContentBox = styled(Box)`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #ff79c6;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #282a36;
    box-shadow: 0 0 15px rgba(255, 121, 198, 0.1);
  }
`;