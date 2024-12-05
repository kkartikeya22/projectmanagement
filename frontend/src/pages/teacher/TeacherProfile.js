import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Badge, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { School, Email, Sports, Subject, Person } from '@mui/icons-material';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <>
      <ProfileCard>
        <ProfileCardContent>
          <AvatarWrapper>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar sx={{ width: 100, height: 100, bgcolor: '#ff79c6' }}>
                {currentUser.name.charAt(0)}
              </Avatar>
            </StyledBadge>
          </AvatarWrapper>
          <RoleText>Mentor</RoleText>
          <ProfileText>
            <Person sx={{ mr: 1, color: '#ff79c6' }} />
            {currentUser.name}
          </ProfileText>
          <ProfileText>
            <Email sx={{ mr: 1, color: '#ff79c6' }} />
            {currentUser.email}
          </ProfileText>
          <ProfileText>
            <Sports sx={{ mr: 1, color: '#ff79c6' }} />
            Mentoring Group: {teachSclass.sclassName}
          </ProfileText>
          <ProfileText>
            <Subject sx={{ mr: 1, color: '#ff79c6' }} />
            Focus Area: {teachSubject.subName}
          </ProfileText>
          <ProfileText>
            <School sx={{ mr: 1, color: '#ff79c6' }} />
            IIT Kanpur
          </ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </>
  )
}

export default TeacherProfile

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
  background-color: #282a36;
  box-shadow: 0 4px 8px rgba(189, 147, 249, 0.3);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(189, 147, 249, 0.4);
  }
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #f8f8f2;
`;

const RoleText = styled(Typography)`
  margin: 16px 0;
  font-size: 1.4rem;
  font-weight: bold;
  color: #ff79c6;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AvatarWrapper = styled.div`
  margin-bottom: 16px;
`;

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    background-color: #50fa7b;
    color: #50fa7b;
    box-shadow: 0 0 0 2px #282a36;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: ripple 1.2s infinite ease-in-out;
      border: 1px solid currentColor;
      content: '""';
    }
  }
  @keyframes ripple {
    0% {
      transform: scale(.8);
      opacity: 1;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }
`;