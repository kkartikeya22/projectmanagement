import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Chip, Typography, Tooltip, IconButton
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'Mentee', minWidth: 170, tooltip: 'Mentee who raised the concern' },
    { id: 'complaint', label: 'Feedback', minWidth: 100, tooltip: 'Mentee feedback/concern' },
    { id: 'date', label: 'Submitted On', minWidth: 170, tooltip: 'Date of submission' },
    { id: 'status', label: 'Status', minWidth: 100, tooltip: 'Current status' }
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonIcon sx={{ color: '#ff79c6' }} />
        {complain.user.name}
      </Box>,
      complaint: <Tooltip title={complain.complaint}>
        <Typography noWrap sx={{ maxWidth: 300, color: '#e6e6e6' }}>{complain.complaint}</Typography>
      </Tooltip>,
      date: <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CalendarTodayIcon sx={{ color: '#bd93f9' }} fontSize="small" />
        {dateString}
      </Box>,
      status: Math.random() > 0.5 ? 
        <Chip icon={<CheckCircleIcon />} label="Resolved" size="small" sx={{ 
          backgroundColor: '#121212',
          color: '#50fa7b',
          '& .MuiChip-icon': { color: '#50fa7b' },
          border: '1px solid #50fa7b'
        }} /> :
        <Chip icon={<PendingIcon />} label="Pending" size="small" sx={{ 
          backgroundColor: '#121212',
          color: '#ff5555',
          '& .MuiChip-icon': { color: '#ff5555' },
          border: '1px solid #ff5555'
        }} />,
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <Tooltip title="Toggle Resolution Status">
        <IconButton sx={{ 
          '&:hover': {
            backgroundColor: 'rgba(255, 121, 198, 0.1)',
          }
        }}>
          <FeedbackIcon sx={{ color: '#ff79c6' }} />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {loading ?
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Typography variant="h5" sx={{ color: '#bd93f9' }}>Loading Mentee Feedback...</Typography>
        </Box>
        :
        <>
          {response ?
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Typography variant="h6" sx={{ color: '#ff5555' }}>
                No Feedback From Mentees Yet
              </Typography>
            </Box>
            :
            <Paper sx={{ 
              width: '100%', 
              overflow: 'hidden', 
              borderRadius: 2, 
              boxShadow: '0 0 10px rgba(189, 147, 249, 0.3)',
              backgroundColor: '#1e1e1e',
              border: '1px solid #ff79c6'
            }}>
              <Typography variant="h5" sx={{ p: 2, color: '#ff79c6', fontWeight: 500 }}>
                Mentee Feedback Dashboard
              </Typography>
              {Array.isArray(complainsList) && complainsList.length > 0 &&
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              }
            </Paper>
          }
        </>
      }
    </>
  );
};

export default SeeComplains;