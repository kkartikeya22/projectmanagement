import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton,
    Typography, Chip, Tooltip
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { FaTrophy, FaMedal, FaProjectDiagram } from 'react-icons/fa';
import styled from 'styled-components';

const PageContainer = styled.div`
    background-color: #121212;
    min-height: 100vh;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
`;

const StyledPaper = styled(Paper)`
    background-color: #1e1e1e;
    color: #e6e6e6;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(189, 147, 249, 0.2);
    padding: 20px;
`;

const ShowSubjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const subjectColumns = [
        { 
            id: 'subName', 
            label: 'Project Module', 
            minWidth: 170,
            render: (value) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FaProjectDiagram style={{ color: '#ff79c6' }}/>
                    <Typography sx={{ color: '#e6e6e6' }}>{value}</Typography>
                </Box>
            )
        },
        { 
            id: 'sessions', 
            label: 'Milestones', 
            minWidth: 170,
            render: (value) => (
                <Chip
                    icon={<FaTrophy style={{ color: '#bd93f9' }}/>}
                    label={`${value} milestones`}
                    sx={{
                        backgroundColor: '#2a002e',
                        color: '#ff79c6',
                        border: '1px solid #ff79c6'
                    }}
                />
            )
        },
        { 
            id: 'sclassName', 
            label: 'Team', 
            minWidth: 170,
            render: (value) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FaMedal style={{ color: '#ff79c6' }}/>
                    <Typography sx={{ color: '#e6e6e6' }}>{value}</Typography>
                    <Chip 
                        size="small" 
                        label="IITK'26" 
                        sx={{
                            backgroundColor: '#2a002e',
                            color: '#bd93f9'
                        }}
                    />
                </Box>
            )
        },
    ]

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Remove Module">
                    <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                        <DeleteIcon sx={{ color: '#ff5555' }} />
                    </IconButton>
                </Tooltip>
                <BlueButton
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                        color: '#ffffff',
                        '&:hover': {
                            boxShadow: '0 0 10px rgba(255, 121, 198, 0.5)',
                            transform: 'scale(1.02)'
                        },
                        transition: 'all 0.3s ease-in-out'
                    }}
                    onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
                >
                    Track Progress
                </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon sx={{ color: '#ff79c6' }} />, 
            name: 'Add New Project Module',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon sx={{ color: '#ff5555' }} />, 
            name: 'Clear All Modules',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <PageContainer>
            {loading ?
                <div style={{ color: '#e6e6e6' }}>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton
                                variant="contained"
                                sx={{
                                    background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                                    color: '#ffffff',
                                    '&:hover': {
                                        boxShadow: '0 0 10px rgba(255, 121, 198, 0.5)',
                                        transform: 'scale(1.02)'
                                    },
                                    transition: 'all 0.3s ease-in-out'
                                }}
                                onClick={() => navigate("/Admin/subjects/chooseclass")}
                            >
                                Add Project Modules
                            </GreenButton>
                        </Box>
                        :
                        <StyledPaper>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 &&
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </StyledPaper>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </PageContainer>
    );
};

export default ShowSubjects;