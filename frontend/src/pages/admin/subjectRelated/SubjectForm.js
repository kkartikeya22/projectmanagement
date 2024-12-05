import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, Badge, Tooltip } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';
import { FaProjectDiagram } from 'react-icons/fa';
import { FaTrophy } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

const PageContainer = styled.div`
    background-color: #121212;
    min-height: 100vh;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
`;

const StyledForm = styled.form`
    padding: 20px;
`;

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id
    const adminID = currentUser._id
    const address = "Subject"

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
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
    }, [status, navigate, error, response, dispatch]);

    return (
        <PageContainer>
            <StyledForm onSubmit={submitHandler}>
                <Box mb={2} sx={styles.headerBox}>
                    <Badge badgeContent={<FaProjectDiagram style={{ color: '#ff79c6' }}/>} overlap="circular">
                        <Typography variant="h5" sx={styles.heading}>
                            <FaTrophy style={{ marginRight: '10px', color: '#bd93f9' }}/> 
                            Track Your Progress
                        </Typography>
                    </Badge>
                </Box>
                <Grid container spacing={2}>
                    {subjects.map((subject, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={6}>
                                <Tooltip title="Enter milestone name" placement="top">
                                    <TextField
                                        fullWidth
                                        label="Milestone Name"
                                        variant="outlined"
                                        value={subject.subName}
                                        onChange={handleSubjectNameChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4}>
                                <Tooltip title="Enter milestone code" placement="top">
                                    <TextField
                                        fullWidth
                                        label="Milestone Code"
                                        variant="outlined"
                                        value={subject.subCode}
                                        onChange={handleSubjectCodeChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4}>
                                <Tooltip title="Number of checkpoints" placement="top">
                                    <TextField
                                        fullWidth
                                        label="Checkpoints"
                                        variant="outlined"
                                        type="number"
                                        inputProps={{ min: 0 }}
                                        value={subject.sessions}
                                        onChange={handleSessionsChange(index)}
                                        sx={styles.inputField}
                                        required
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" alignItems="flex-end">
                                    {index === 0 ? (
                                        <Button
                                            variant="contained"
                                            onClick={handleAddSubject}
                                            startIcon={<FaTrophy />}
                                            sx={styles.button}
                                        >
                                            Add Milestone
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleRemoveSubject(index)}
                                            startIcon={<DeleteIcon />}
                                            sx={styles.removeButton}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button 
                                variant="contained" 
                                type="submit" 
                                disabled={loader}
                                sx={styles.saveButton}
                            >
                                {loader ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Lock Milestones'
                                )}
                            </Button>
                        </Box>
                    </Grid>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </Grid>
            </StyledForm>
        </PageContainer>
    );
}

export default SubjectForm

const styles = {
    headerBox: {
        background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(189, 147, 249, 0.2)',
    },
    heading: {
        color: '#f8f8f2',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Poppins, sans-serif'
    },
    inputField: {
        '& .MuiInputLabel-root': {
            color: '#ff79c6',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#6272a4',
            },
            '&:hover fieldset': {
                borderColor: '#ff79c6',
            },
            '& input': {
                color: '#f8f8f2',
            }
        },
        backgroundColor: '#282a36',
    },
    button: {
        background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
        color: '#f8f8f2',
        borderRadius: '20px',
        textTransform: 'none',
        '&:hover': {
            boxShadow: '0 0 10px rgba(255, 121, 198, 0.5)',
            transform: 'scale(1.02)'
        },
        transition: 'all 0.3s ease-in-out'
    },
    removeButton: {
        backgroundColor: '#ff5555',
        color: '#f8f8f2',
        borderRadius: '20px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#ff3333',
            transform: 'scale(1.02)'
        },
        transition: 'all 0.3s ease-in-out'
    },
    saveButton: {
        background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
        color: '#f8f8f2',
        borderRadius: '20px',
        textTransform: 'none',
        padding: '10px 30px',
        '&:hover': {
            boxShadow: '0 0 10px rgba(255, 121, 198, 0.5)',
            transform: 'scale(1.02)'
        },
        transition: 'all 0.3s ease-in-out'
    }
};