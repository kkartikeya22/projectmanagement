import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography, Chip, Avatar } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import FeedbackIcon from '@mui/icons-material/Feedback';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import styled from 'styled-components';

const PageContainer = styled.div`
    background-color: #121212;
    min-height: 100vh;
    padding: 20px;
    color: #f8f8f2;
    font-family: 'Poppins', sans-serif;
`;

const StyledBox = styled(Box)`
    background-color: #282a36;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(189, 147, 249, 0.2);
`;

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch()

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

    return (
        <>
            <PageContainer>
                <StyledBox
                    sx={{
                        maxWidth: 550,
                        mx: 'auto',
                        mt: 4
                    }}
                >
                    <div>
                        <Stack spacing={1} sx={{ mb: 3 }} alignItems="center">
                            <FeedbackIcon sx={{ fontSize: 40, color: '#ff79c6', mb: 1 }} />
                            <Typography variant="h4" sx={{ fontWeight: 600, color: '#ff79c6', fontFamily: 'Poppins' }}>
                                Share Your Feedback
                            </Typography>
                            <Chip
                                icon={<EmojiEventsIcon sx={{ color: '#bd93f9' }} />}
                                label="Mentee Zone"
                                sx={{
                                    mt: 1,
                                    color: '#bd93f9',
                                    borderColor: '#bd93f9',
                                    '&:hover': {
                                        background: 'rgba(189, 147, 249, 0.1)'
                                    }
                                }}
                                variant="outlined"
                            />
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                        sx: { color: '#ff79c6' }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '& fieldset': {
                                                borderColor: '#ff79c6',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#bd93f9',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#f8f8f2'
                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Share your thoughts with your mentor"
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => {
                                        setComplaint(event.target.value);
                                    }}
                                    required
                                    multiline
                                    maxRows={4}
                                    InputLabelProps={{
                                        sx: { color: '#ff79c6' }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '10px',
                                            '& fieldset': {
                                                borderColor: '#ff79c6',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#bd93f9',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#f8f8f2'
                                        }
                                    }}
                                    placeholder="Your feedback helps us improve the mentorship experience!"
                                />
                            </Stack>
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ 
                                    mt: 3,
                                    borderRadius: '10px',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    backgroundColor: '#ff79c6',
                                    '&:hover': {
                                        backgroundColor: '#bd93f9'
                                    }
                                }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Feedback"}
                            </BlueButton>
                        </form>
                    </div>
                </StyledBox>
            </PageContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;