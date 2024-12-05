import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Typography, Chip } from '@mui/material';
import Popup from '../../../components/Popup';
import CampaignIcon from '@mui/icons-material/Campaign';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styled from 'styled-components';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice"

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl())
    } else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <StyledContainer>
        <form className="registerForm" onSubmit={submitHandler}>
          <Typography variant="h4" align="center" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: '#ff79c6' }}>
            <CampaignIcon sx={{ color: '#ff79c6' }} />
            Team Announcement
          </Typography>
          
          <InputContainer>
            <StyledLabel>
              <TitleIcon sx={{ color: '#ff79c6' }} fontSize="small" />
              Title
            </StyledLabel>
            <StyledInput type="text" placeholder="Enter announcement title..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required />
          </InputContainer>

          <InputContainer>
            <StyledLabel>
              <DescriptionIcon sx={{ color: '#ff79c6' }} fontSize="small" />
              Details
            </StyledLabel>
            <StyledInput type="text" placeholder="Enter announcement details..."
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              required />
          </InputContainer>

          <InputContainer>
            <StyledLabel>
              <CalendarTodayIcon sx={{ color: '#ff79c6' }} fontSize="small" />
              Date
            </StyledLabel>
            <StyledInput type="date" placeholder="Enter announcement date..."
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required />
          </InputContainer>

          <StyledButton type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} sx={{ color: '#ff79c6' }} />
            ) : (
              <Chip icon={<CampaignIcon sx={{ color: '#ffffff' }} />} 
                    label="Post Announcement" 
                    sx={{
                      background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                      color: '#ffffff',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 0 15px #ff79c6'
                      }
                    }} />
            )}
          </StyledButton>
        </form>
      </StyledContainer>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  padding-top: 6rem; /* Added extra padding at the top */
  background-color: #121212;
  min-height: 100vh;
`;

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #ff79c6;
  font-family: 'Poppins', sans-serif;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #ff79c6;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #1e1e1e;
  color: #e6e6e6;
  transition: all 0.3s ease-in-out;
  font-family: 'Poppins', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #bd93f9;
    box-shadow: 0 0 10px #bd93f9;
  }
  
  &::placeholder {
    color: #666666;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &:hover:not(:disabled) {
    transform: scale(1.02);
  }
`;