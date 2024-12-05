import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {
    Paper, Box, IconButton,
    Typography, Chip, Tooltip
} from '@mui/material';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { FaTrophy, FaMedal, FaUserTie } from 'react-icons/fa';
import styled from 'styled-components';
import TableTemplate from '../../../components/TableTemplate';

const PageContainer = styled.div`
    background-color: #121212;
    min-height: 100vh;
    padding: 40px;
    font-family: 'Poppins', sans-serif;
`;

const StyledPaper = styled(Paper)`
    background-color: #121212;
    color: #e6e6e6;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(189, 147, 249, 0.2);
    padding: 24px;
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0 40px 0;
`;

const ShowTeachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    };

    const teacherColumns = [
        { 
            id: 'name', 
            label: 'Mentor Name', 
            minWidth: 170,
            render: (value) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: '8px 0' }}>
                    <FaUserTie style={{ color: '#ff79c6' }}/>
                    <Typography sx={{ color: '#e6e6e6' }}>{value}</Typography>
                </Box>
            )
        },
        { 
            id: 'teachSubject', 
            label: 'Sport/Activity', 
            minWidth: 170,
            render: (value, row) => (
                <Box sx={{ padding: '8px 0' }}>
                    {value ? (
                        <Chip
                            icon={<FaTrophy style={{ color: '#bd93f9' }}/>}
                            label={`${value}`}
                            sx={{
                                backgroundColor: '#1e1e1e',
                                color: '#ff79c6',
                                border: '1px solid #ff79c6',
                                padding: '16px 8px'
                            }}
                        />
                    ) : (
                        <BlueButton
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                                color: '#ffffff',
                                padding: '8px 16px'
                            }}
                            onClick={() => navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)}
                        >
                            Assign Activity
                        </BlueButton>
                    )}
                </Box>
            )
        },
        { 
            id: 'teachSclass', 
            label: 'Team', 
            minWidth: 170,
            render: (value) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: '8px 0' }}>
                    <FaMedal style={{ color: '#ff79c6' }}/>
                    <Typography sx={{ color: '#e6e6e6' }}>{value}</Typography>
                    <Chip 
                        size="small" 
                        label="IITK'26" 
                        sx={{
                            backgroundColor: '#2a002e',
                            color: '#bd93f9',
                            padding: '4px 8px'
                        }}
                    />
                </Box>
            )
        }
    ]

    const teacherRows = teachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || null,
            teachSclass: teacher.teachSclass.sclassName,
            teachSclassID: teacher.teachSclass._id,
            id: teacher._id,
        };
    })

    const TeachersButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1, padding: '8px 0' }}>
                <Tooltip title="Remove Mentor">
                    <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
                        <PersonRemoveIcon sx={{ color: '#ff5555' }} />
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
                        transition: 'all 0.3s ease-in-out',
                        padding: '8px 16px'
                    }}
                    onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
                >
                    View Profile
                </BlueButton>
            </Box>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon sx={{ color: '#ff79c6' }} />, 
            name: 'Add New Senior Mentor',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <PersonRemoveIcon sx={{ color: '#ff5555' }} />, 
            name: 'Remove All Mentors',
            action: () => deleteHandler(currentUser._id, "Teachers")
        }
    ];

    return (
        <PageContainer>
            {loading ?
                <Typography sx={{ color: '#e6e6e6' }}>Loading...</Typography>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', padding: '0 24px' }}>
                            <GreenButton
                                variant="contained"
                                sx={{
                                    background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                                    color: '#ffffff',
                                    '&:hover': {
                                        boxShadow: '0 0 10px rgba(255, 121, 198, 0.5)',
                                        transform: 'scale(1.02)'
                                    },
                                    transition: 'all 0.3s ease-in-out',
                                    padding: '12px 24px'
                                }}
                                onClick={() => navigate("/Admin/teachers/chooseclass")}
                            >
                                Add Senior Mentor
                            </GreenButton>
                        </Box>
                        :
                        <>
                            <StyledHeader>
                                <Chip 
                                    icon={<FaUserTie style={{ color: '#ffffff' }} />} 
                                    label="Senior Mentors" 
                                    sx={{
                                        backgroundColor: '#ff79c6',
                                        color: '#ffffff',
                                        '& .MuiChip-label': {
                                            fontFamily: 'Poppins, sans-serif',
                                            padding: '16px 8px'
                                        }
                                    }} 
                                />
                            </StyledHeader>
                            <StyledPaper>
                                {Array.isArray(teachersList) && teachersList.length > 0 &&
                                    <TableTemplate buttonHaver={TeachersButtonHaver} columns={teacherColumns} rows={teacherRows} />
                                }
                                <SpeedDialTemplate actions={actions} />
                            </StyledPaper>
                        </>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </PageContainer>
    );
};

export default ShowTeachers