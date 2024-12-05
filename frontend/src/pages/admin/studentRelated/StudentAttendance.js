import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl,
    Badge, Chip
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import PersonIcon from '@mui/icons-material/Person';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id
            dispatch(getUserDetails(stdID, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID, subjectID } = params
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName, status, date }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"))
    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("error")
        }
        else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
    }, [response, statestatus, error])

    const theme = {
        background: '#121212',
        text: {
            primary: '#ff79c6',
            secondary: '#bd93f9',
            alert: '#ff5555',
            body: '#e6e6e6'
        },
        button: {
            background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
            text: '#ffffff'
        },
        input: {
            background: '#1e1e1e',
            border: '#ff79c6'
        }
    }

    return (
        <>
            {loading
                ?
                <>
                    <div style={{ color: theme.text.body }}>Loading...</div>
                </>
                :
                <>
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            bgcolor: theme.background,
                            minHeight: '100vh'
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: 550,
                                px: 3,
                                py: '100px',
                                width: '100%',
                                bgcolor: theme.input.background,
                                borderRadius: 2,
                                boxShadow: '0 0 10px rgba(189, 147, 249, 0.3)'
                            }}
                        >
                            <Stack spacing={1} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Badge badgeContent={1} sx={{ '& .MuiBadge-badge': { bgcolor: theme.text.primary } }}>
                                        <PersonIcon sx={{ color: theme.text.primary }} />
                                    </Badge>
                                    <Typography variant="h4" sx={{ color: theme.text.primary }}>
                                        Mentee Name: {userDetails.name}
                                    </Typography>
                                </Box>
                                {currentUser.teachSubject &&
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <SportsSoccerIcon sx={{ color: theme.text.secondary }} />
                                        <Typography variant="h4" sx={{ color: theme.text.secondary }}>
                                            Training Module: {currentUser.teachSubject?.subName}
                                        </Typography>
                                    </Box>
                                }
                                <Chip 
                                    label="Progress Tracking" 
                                    sx={{ 
                                        bgcolor: theme.text.primary,
                                        color: theme.background,
                                        '& .MuiChip-icon': { color: theme.background }
                                    }} 
                                    icon={<EmojiEventsIcon />} 
                                />
                            </Stack>
                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    {
                                        situation === "Student" &&
                                        <FormControl fullWidth>
                                            <InputLabel 
                                                id="demo-simple-select-label"
                                                sx={{ color: theme.text.primary }}
                                            >
                                                Select Training Module
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={subjectName}
                                                label="Choose an option"
                                                onChange={changeHandler}
                                                required
                                                sx={{
                                                    color: theme.text.body,
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: theme.text.primary
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: theme.text.secondary
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: theme.text.secondary
                                                    }
                                                }}
                                            >
                                                {subjectsList ?
                                                    subjectsList.map((subject, index) => (
                                                        <MenuItem key={index} value={subject.subName}>
                                                            {subject.subName}
                                                        </MenuItem>
                                                    ))
                                                    :
                                                    <MenuItem value="Select Subject">
                                                        Add Training Modules First
                                                    </MenuItem>
                                                }
                                            </Select>
                                        </FormControl>
                                    }
                                    <FormControl fullWidth>
                                        <InputLabel 
                                            id="demo-simple-select-label"
                                            sx={{ color: theme.text.primary }}
                                        >
                                            Session Status
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="Choose an option"
                                            onChange={(event) => setStatus(event.target.value)}
                                            required
                                            sx={{
                                                color: theme.text.body,
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.text.primary
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.text.secondary
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: theme.text.secondary
                                                }
                                            }}
                                        >
                                            <MenuItem value="Present">
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CheckCircleIcon sx={{ color: '#4caf50' }} />
                                                    Completed
                                                </Box>
                                            </MenuItem>
                                            <MenuItem value="Absent">
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CancelIcon sx={{ color: theme.text.alert }} />
                                                    Missed
                                                </Box>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CalendarMonthIcon sx={{ color: theme.text.primary }} />
                                            <TextField
                                                label="Session Date"
                                                type="date"
                                                value={date}
                                                onChange={(event) => setDate(event.target.value)}
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                    sx: { color: theme.text.primary }
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: theme.text.body,
                                                        '& fieldset': {
                                                            borderColor: theme.text.primary
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: theme.text.secondary
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: theme.text.secondary
                                                        }
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </FormControl>
                                </Stack>

                                <PurpleButton
                                    fullWidth
                                    size="large"
                                    sx={{ 
                                        mt: 3,
                                        background: theme.button.background,
                                        color: theme.button.text,
                                        '&:hover': {
                                            background: theme.button.background,
                                            opacity: 0.9
                                        }
                                    }}
                                    variant="contained"
                                    type="submit"
                                    disabled={loader}
                                    startIcon={<EmojiEventsIcon />}
                                >
                                    {loader ? <CircularProgress size={24} sx={{ color: theme.button.text }} /> : "Update Progress"}
                                </PurpleButton>
                            </form>
                        </Box>
                    </Box>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </>
            }
        </>
    )
}

export default StudentAttendance