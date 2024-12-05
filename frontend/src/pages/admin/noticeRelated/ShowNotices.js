import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton, Chip, Tooltip, Badge, Typography, Container
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import SportsIcon from '@mui/icons-material/Sports';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

const ShowNotices = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            })
    }

    const noticeColumns = [
        { 
            id: 'title', 
            label: 'Announcement Title', 
            minWidth: 170,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SportsIcon sx={{ color: '#ff79c6' }} />
                    {params.value}
                </Box>
            )
        },
        { 
            id: 'details', 
            label: 'Message Details', 
            minWidth: 100 
        },
        { 
            id: 'date', 
            label: 'Posted On', 
            minWidth: 170,
            renderCell: (params) => (
                <Chip 
                    label={params.value}
                    size="small"
                    sx={{
                        backgroundColor: '#121212',
                        color: '#ff79c6',
                        border: '1px solid #ff79c6',
                        '&:hover': {
                            backgroundColor: '#1e1e1e',
                            boxShadow: '0 0 8px #bd93f9'
                        }
                    }}
                />
            )
        },
    ];

    const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    const NoticeButtonHaver = ({ row }) => {
        return (
            <>
                <Tooltip title="Remove Announcement">
                    <IconButton 
                        onClick={() => deleteHandler(row.id, "Notice")}
                        sx={{
                            '&:hover': {
                                '& .deleteIcon': {
                                    color: '#ff5555',
                                    filter: 'drop-shadow(0 0 8px #ff5555)'
                                }
                            }
                        }}
                    >
                        <DeleteIcon className="deleteIcon" sx={{ color: '#ff5555' }} />
                    </IconButton>
                </Tooltip>
            </>
        );
    };

    const actions = [
        {
            icon: <Badge color="success" variant="dot"><NoteAddIcon sx={{ color: '#bd93f9' }} /></Badge>, 
            name: 'Post New Announcement',
            action: () => navigate("/Admin/addnotice")
        },
        {
            icon: <Badge color="error" variant="dot"><DeleteIcon sx={{ color: '#ff5555' }} /></Badge>, 
            name: 'Clear All Announcements',
            action: () => deleteHandler(currentUser._id, "Notices")
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {loading ?
                <Box display="flex" justifyContent="center">
                    <Typography sx={{ color: '#e6e6e6' }}>Loading...</Typography>
                </Box>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton 
                                variant="contained"
                                startIcon={<EmojiEventsIcon />}
                                onClick={() => navigate("/Admin/addnotice")}
                                sx={{
                                    background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
                                    color: '#ffffff',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #ff79c6 60%, #bd93f9 90%)',
                                        boxShadow: '0 0 10px #ff79c6'
                                    }
                                }}
                            >
                                Post Announcement
                            </GreenButton>
                        </Box>
                        :
                        <Paper 
                            sx={{ 
                                width: '100%', 
                                overflow: 'hidden', 
                                borderRadius: 2, 
                                boxShadow: '0 0 10px rgba(189, 147, 249, 0.3)',
                                backgroundColor: '#121212',
                                color: '#e6e6e6',
                                '& .MuiTableCell-root': {
                                    color: '#e6e6e6',
                                    borderBottom: '1px solid #1e1e1e'
                                },
                                '& .MuiTableHead-root': {
                                    backgroundColor: '#1e1e1e',
                                    '& .MuiTableCell-root': {
                                        color: '#ff79c6',
                                        fontWeight: 'bold'
                                    }
                                }
                            }}
                        >
                            {Array.isArray(noticesList) && noticesList.length > 0 &&
                                <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
        </Container>
    );
};

export default ShowNotices;