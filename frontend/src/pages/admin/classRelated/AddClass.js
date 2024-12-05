import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import styled from "styled-components";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id
    const address = "Sclass"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id)
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack sx={{
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <SportsSoccerIcon sx={{ fontSize: 60, color: '#ff79c6', mb: 2 }} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff79c6', mb: 1, fontFamily: "'Poppins', sans-serif" }}>
                            Project Squad
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#bd93f9', mb: 3, fontFamily: "'Poppins', sans-serif" }}>
                            Create your mentoring team at IITK
                        </Typography>
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                label="Name your project squad"
                                variant="outlined"
                                value={sclassName}
                                onChange={(event) => {
                                    setSclassName(event.target.value);
                                }}
                                required
                                InputProps={{
                                    endAdornment: <EmojiEventsIcon sx={{ color: '#bd93f9' }} />,
                                    sx: {
                                        color: '#e6e6e6',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#ff79c6'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#bd93f9'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#bd93f9'
                                        }
                                    }
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: '#ff79c6',
                                        '&.Mui-focused': {
                                            color: '#bd93f9'
                                        }
                                    }
                                }}
                            />
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 3,
                                    background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                                    color: '#ffffff',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #ff79c6 60%, #bd93f9 90%)',
                                        boxShadow: '0 0 10px rgba(189, 147, 249, 0.5)'
                                    }
                                }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Create Squad"}
                            </BlueButton>
                            <Button 
                                variant="outlined" 
                                onClick={() => navigate(-1)}
                                sx={{
                                    color: '#ff79c6',
                                    borderColor: '#ff79c6',
                                    '&:hover': {
                                        backgroundColor: '#ff79c6',
                                        color: '#121212',
                                        borderColor: '#ff79c6'
                                    }
                                }}
                            >
                                Go Back
                            </Button>
                        </Stack>
                    </form>
                </StyledBox>
            </StyledContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddClass

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
  background: #121212;
  min-height: 100vh;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: #1e1e1e;
  box-shadow: 0 0 15px rgba(255, 121, 198, 0.3);
  border-radius: 12px;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(189, 147, 249, 0.4);
  }
`;