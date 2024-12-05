import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { FaTrophy, FaMedal, FaGraduationCap } from 'react-icons/fa';

import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl,
    Chip, Avatar
} from '@mui/material';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

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

    const fields = { subName: chosenSubName, marksObtained }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
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
            setMessage("Achievement Unlocked! 🎉")
        }
    }, [response, statestatus, error])

    return (
        <>
            {loading
                ?
                <>
                    <div>Loading your progress...</div>
                </>
                :
                <>
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            background: '#121212',
                            borderRadius: '15px',
                            boxShadow: '0 4px 6px rgba(189, 147, 249, 0.3)'
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: 550,
                                px: 3,
                                py: '100px',
                                width: '100%'
                            }}
                        >
                            <Stack spacing={1} sx={{ mb: 3 }}>
                                <Typography variant="h4" sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    color: '#ff79c6'
                                }}>
                                    <FaGraduationCap /> Mentee: {userDetails.name}
                                    <Chip
                                        size="small"
                                        label="IITK'26"
                                        sx={{ 
                                            ml: 1,
                                            backgroundColor: '#bd93f9',
                                            color: '#ffffff'
                                        }}
                                    />
                                </Typography>
                                {currentUser.teachSubject &&
                                    <Typography variant="h4" sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 1,
                                        color: '#ff79c6'
                                    }}>
                                        <FaMedal /> Project: {currentUser.teachSubject?.subName}
                                    </Typography>
                                }
                            </Stack>
                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    {
                                        situation === "Student" &&
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label" sx={{ color: '#ff79c6' }}>
                                                Select Project Module
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={subjectName}
                                                label="Choose a module"
                                                onChange={changeHandler} 
                                                required
                                                sx={{
                                                    color: '#e6e6e6',
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#ff79c6'
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#bd93f9'
                                                    }
                                                }}
                                            >
                                                {subjectsList ?
                                                    subjectsList.map((subject, index) => (
                                                        <MenuItem key={index} value={subject.subName}>
                                                            <FaTrophy style={{ marginRight: '8px', color: '#ff5555' }} />
                                                            {subject.subName}
                                                        </MenuItem>
                                                    ))
                                                    :
                                                    <MenuItem value="Select Subject">
                                                        Add Project Modules First
                                                    </MenuItem>
                                                }
                                            </Select>
                                        </FormControl>
                                    }
                                    <FormControl>
                                        <TextField 
                                            type="number" 
                                            label='Progress Score (out of 100)'
                                            value={marksObtained} 
                                            required
                                            onChange={(e) => setMarksObtained(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                                sx: { color: '#ff79c6' }
                                            }}
                                            sx={{
                                                input: { color: '#e6e6e6' },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#ff79c6'
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#bd93f9'
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </Stack>
                                <BlueButton
                                    fullWidth
                                    size="large"
                                    sx={{ 
                                        mt: 3,
                                        background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                                        boxShadow: '0 3px 5px 2px rgba(255, 121, 198, .3)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #bd93f9 30%, #ff79c6 90%)',
                                            transform: 'scale(1.02)',
                                            transition: 'all 0.3s ease-in-out'
                                        }
                                    }}
                                    variant="contained"
                                    type="submit"
                                    disabled={loader}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Update Progress"}
                                </BlueButton>
                            </form>
                        </Box>
                    </Box>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </>
            }
        </>
    )
}

export default StudentExamMarks