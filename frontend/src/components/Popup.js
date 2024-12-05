import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { SportsScore, Error } from '@mui/icons-material';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    const vertical = "top"
    const horizontal = "right"

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
        dispatch(underControl())
        dispatch(underStudentControl())
    };

    return (
        <>
            <Snackbar 
                open={showPopup} 
                autoHideDuration={2000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical, horizontal }} 
                key={vertical + horizontal}
            >
                {
                    (message === "Done Successfully") ?
                        <Alert 
                            onClose={handleClose} 
                            severity="success" 
                            icon={<SportsScore fontSize="inherit" />}
                            sx={{ 
                                width: '100%',
                                backgroundColor: '#121212',
                                color: '#e6e6e6',
                                '& .MuiAlert-icon': {
                                    color: '#ff79c6' // Theme's pink accent
                                },
                                fontWeight: 600,
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(189, 147, 249, 0.2)', // Purple glow
                                border: '1px solid #bd93f9', // Purple border
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    backgroundColor: '#1e1e1e',
                                    boxShadow: '0 6px 16px rgba(255, 121, 198, 0.3)', // Pink glow on hover
                                }
                            }}
                        >
                            {message}
                        </Alert>
                        :
                        <Alert 
                            onClose={handleClose} 
                            severity="error"
                            icon={<Error fontSize="inherit" />}
                            sx={{ 
                                width: '100%',
                                backgroundColor: '#121212',
                                color: '#e6e6e6',
                                '& .MuiAlert-icon': {
                                    color: '#ff5555' // Theme's red for errors
                                },
                                fontWeight: 600,
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(255, 85, 85, 0.2)', // Red glow
                                border: '1px solid #ff5555', // Red border
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    backgroundColor: '#1e1e1e',
                                    boxShadow: '0 6px 16px rgba(255, 85, 85, 0.3)',
                                }
                            }}
                        >
                            {message}
                        </Alert>
                }
            </Snackbar>
        </>
    );
};

export default Popup;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
