import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper, Box, IconButton, Chip, Badge, Tooltip, styled
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlackButton, BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';

import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popup from '../../../components/Popup';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#121212',
    color: '#e6e6e6',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(189, 147, 249, 0.2)',
    '& .MuiChip-root': {
        backgroundColor: '#bd93f9',
        color: '#ffffff',
    },
    '& .MuiIconButton-root': {
        color: '#ff79c6',
        '&:hover': {
            backgroundColor: 'rgba(255, 121, 198, 0.1)',
        },
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
    color: '#ffffff',
    '&:hover': {
        boxShadow: '0 0 10px rgba(255, 121, 198, 0.5)',
        transform: 'scale(1.02)',
    },
    transition: 'all 0.3s ease-in-out',
}));

const SmallButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    transform: 'scale(0.9)',
    marginLeft: '16px',
    '& .MuiButton-root': {
        background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
        color: '#ffffff',
        fontSize: '0.875rem'
    }
}));

const ShowStudents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const studentColumns = [
        { id: 'name', label: 'Mentee Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Team', minWidth: 170 },
    ]

    const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
        };
    })

    const StudentButtonHaver = ({ row }) => {
        const options = ['Track Progress', 'Update Milestones'];

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            console.info(`You clicked ${options[selectedIndex]}`);
            if (selectedIndex === 0) {
                handleAttendance();
            } else if (selectedIndex === 1) {
                handleMarks();
            }
        };

        const handleAttendance = () => {
            navigate("/Admin/students/student/attendance/" + row.id)
        }
        const handleMarks = () => {
            navigate("/Admin/students/student/marks/" + row.id)
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title="Remove Mentee">
                    <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                        <PersonRemoveIcon sx={{ color: '#ff5555' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="View Mentee Profile">
                    <StyledButton
                        startIcon={<GroupsIcon />}
                        onClick={() => navigate("/Admin/students/student/" + row.id)}>
                        View Profile
                    </StyledButton>
                </Tooltip>
                <SmallButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button startIcon={<EmojiEventsIcon />} onClick={handleClick}>
                        {options[selectedIndex]}
                    </Button>
                    <BlackButton
                        size="small"
                        onClick={handleToggle}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </BlackButton>
                </SmallButtonGroup>
                <Popper
                    sx={{
                        zIndex: 1,
                        '& .MuiPaper-root': {
                            backgroundColor: '#1e1e1e',
                            color: '#e6e6e6'
                        }
                    }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                disabled={index === 2}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(189, 147, 249, 0.1)'
                                                    }
                                                }}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Box>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon sx={{ color: '#ff79c6' }} />,
            name: 'Add New Mentee',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon sx={{ color: '#ff5555' }} />,
            name: 'Remove All Mentees',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

    return (
        <>
            {loading ?
                <div style={{ color: '#e6e6e6' }}>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <StyledButton startIcon={<SportsSoccerIcon />} onClick={() => navigate("/Admin/addstudents")}>
                                Add New Mentee
                            </StyledButton>
                        </Box>
                        :
                        <StyledPaper sx={{ width: '100%', overflow: 'hidden', margin: '0 auto' }}>
                            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Badge badgeContent={studentsList?.length || 0} color="secondary">
                                    <GroupsIcon sx={{ color: '#ff79c6' }} />
                                </Badge>
                                <Chip label="Mentorship Program" icon={<EmojiEventsIcon />} />
                            </Box>
                            {Array.isArray(studentsList) && studentsList.length > 0 &&
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </StyledPaper>
                    }
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowStudents;