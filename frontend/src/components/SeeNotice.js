import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper, Chip, Badge } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SportsIcon from '@mui/icons-material/Sports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const SeeNotice = () => {
    const dispatch = useDispatch();

    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    useEffect(() => {
        if (currentRole === "Admin") {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        }
        else {
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
    }, [dispatch]);

    if (error) {
        console.log(error);
    }

    const noticeColumns = [
        { 
            id: 'title', 
            label: 'Announcement', 
            minWidth: 170,
            renderCell: (value) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <NotificationsActiveIcon sx={{ color: '#00bcd4' }} />
                    {value}
                </div>
            )
        },
        { id: 'details', label: 'Details', minWidth: 100 },
        { 
            id: 'date', 
            label: 'Posted On', 
            minWidth: 170,
            renderCell: (value) => (
                <Chip 
                    label={value} 
                    size="small" 
                    sx={{
                        color: '#e0e0e0',
                        borderColor: '#00bcd4',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: '#00bcd4',
                            color: '#1b1b1b',
                            borderColor: '#00bcd4',
                            boxShadow: '0 0 8px #00bcd4'
                        },
                        transition: 'all 0.3s ease-in-out'
                    }}
                    variant="outlined"
                />
            )
        },
    ];

    const noticeRows = noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    const containerStyle = {
        marginTop: '50px',
        marginRight: '20px',
        color: '#e0e0e0',
        fontFamily: 'Inter, sans-serif'
    };

    const loadingStyle = {
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#9e9e9e'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '40px'
    };

    return (
        <div style={containerStyle}>
            {loading ? (
                <div style={loadingStyle}>
                    <SportsIcon sx={{ color: '#00bcd4' }} /> Loading your updates...
                </div>
            ) : response ? (
                <div style={loadingStyle}>
                    <EmojiEventsIcon sx={{ color: '#ffa726' }} /> All caught up! No new announcements
                </div>
            ) : (
                <>
                    <div style={headerStyle}>
                        <Badge 
                            badgeContent={noticesList.length} 
                            sx={{ 
                                '& .MuiBadge-badge': {
                                    background: '#00bcd4',
                                    color: '#ffffff'
                                }
                            }}
                        >
                            <NotificationsActiveIcon sx={{ 
                                fontSize: '35px', 
                                color: '#00bcd4',
                                '&:hover': {
                                    color: '#26c6da',
                                    transition: 'color 0.3s ease-in-out'
                                }
                            }} />
                        </Badge>
                        <h3 style={{ fontSize: '30px', margin: 0, color: '#00bcd4' }}>Team Updates</h3>
                    </div>
                    <Paper sx={{ 
                        width: '100%', 
                        overflow: 'hidden',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(0, 188, 212, 0.2)',
                        backgroundColor: '#2c2c2c',
                        border: '1px solid rgba(0, 188, 212, 0.1)',
                        '& .MuiTableCell-root': {
                            color: '#e0e0e0',
                            borderBottom: '1px solid rgba(0, 188, 212, 0.1)'
                        },
                        '& .MuiTableRow-root:nth-of-type(odd)': {
                            backgroundColor: '#2a2a2a'
                        },
                        '& .MuiTableRow-root:nth-of-type(even)': {
                            backgroundColor: '#202020'
                        },
                        '& .MuiTableRow-root:hover': {
                            backgroundColor: '#00acc1',
                            '& .MuiTableCell-root': {
                                color: '#1b1b1b'
                            },
                            transition: 'all 0.3s ease-in-out'
                        }
                    }}>
                        {Array.isArray(noticesList) && noticesList.length > 0 &&
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        }
                    </Paper>
                </>
            )}
        </div>
    )
}

export default SeeNotice