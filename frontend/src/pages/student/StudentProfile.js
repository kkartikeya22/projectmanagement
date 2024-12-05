import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper, Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <SportsMartialArtsIcon sx={{ color: '#ff79c6', fontSize: 30 }} />
                  }
                >
                  <Avatar alt="Mentee Avatar" sx={{ width: 150, height: 150, border: '3px solid #ff79c6' }}>
                    {String(currentUser.name).charAt(0)}
                  </Avatar>
                </Badge>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <Typography variant="h5" component="h2" textAlign="center" sx={{ color: '#f8f8f2' }}>
                  {currentUser.name}
                </Typography>
                <Badge badgeContent="IITK" color="warning">
                  <EmojiEventsIcon sx={{ color: '#ff79c6' }} />
                </Badge>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center" sx={{ color: '#f8f8f2' }}>
                  Mentee ID: {currentUser.rollNum}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <SchoolIcon sx={{ color: '#ff79c6' }} />
                <Typography variant="subtitle1" component="p" textAlign="center" sx={{ color: '#f8f8f2' }}>
                  Project Track: {sclassName.sclassName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <SportsMartialArtsIcon sx={{ color: '#ff79c6' }} />
                <Typography variant="subtitle1" component="p" textAlign="center" sx={{ color: '#f8f8f2' }}>
                  Department: {studentSchool.schoolName}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
        <StyledCard>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <EmojiEventsIcon sx={{ color: '#ff79c6' }} />
              <Typography variant="h6" sx={{ color: '#f8f8f2' }}>
                Personal Details
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p" sx={{ color: '#f8f8f2' }}>
                  <strong>Batch:</strong> Y21
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p" sx={{ color: '#f8f8f2' }}>
                  <strong>Program:</strong> BTech
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon sx={{ color: '#ff79c6' }} />
                  <Typography variant="subtitle1" component="p" sx={{ color: '#f8f8f2' }}>
                    <strong>Email:</strong> mentee@iitk.ac.in
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon sx={{ color: '#ff79c6' }} />
                  <Typography variant="subtitle1" component="p" sx={{ color: '#f8f8f2' }}>
                    <strong>Phone:</strong> +91 9876543210
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon sx={{ color: '#ff79c6' }} />
                  <Typography variant="subtitle1" component="p" sx={{ color: '#f8f8f2' }}>
                    <strong>Hall:</strong> Hall 2, IITK
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <ContactPhoneIcon sx={{ color: '#ff79c6' }} />
                  <Typography variant="subtitle1" component="p" sx={{ color: '#f8f8f2' }}>
                    <strong>Emergency:</strong> +91 9876543210
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Container>
    </>
  )
}

export default StudentProfile

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  background-color: #282a36;
  box-shadow: 0 3px 5px 2px rgba(189, 147, 249, .3);
`;

const StyledCard = styled(Card)`
  background-color: #282a36;
  box-shadow: 0 3px 5px 2px rgba(189, 147, 249, .3);
`;