import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Badge, Chip } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)
  }

  const sclassColumns = [
    { id: 'name', label: 'Project Group', minWidth: 170, color: '#ffffff' },
  ]

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    };
  })

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Project Tasks', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Team Member', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    return (
      <ButtonContainer>
        <IconButton onClick={() => deleteHandler(row.id, "Sclass")} color="secondary">
          <DeleteIcon sx={{ color: '#ff5555' }} />
        </IconButton>
        <StyledButton variant="contained"
          onClick={() => navigate("/Admin/classes/class/" + row.id)}
          startIcon={<SportsSoccerIcon />}>
          View Team
        </StyledButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Add Team Members & Tasks">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <h5 style={{ color: '#bd93f9', marginRight: '8px' }}>Team</h5>
              <SpeedDialIcon sx={{ color: '#ff79c6' }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              ...styles.styledPaper,
              backgroundColor: '#1e1e1e',
              color: '#e6e6e6',
              border: '1px solid #ff79c6',
              '& .MuiMenuItem-root:hover': {
                backgroundColor: '#2a002e'
              }
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action) => (
            <MenuItem onClick={action.action}>
              <ListItemIcon sx={{ color: '#ff79c6' }}>
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  const actions = [
    {
      icon: <AddCardIcon sx={{ color: '#ff79c6' }} />, 
      name: 'Create New Team',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon sx={{ color: '#ff5555' }} />, 
      name: 'Delete All Teams',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <PageContainer>
      {loading ?
        <div style={{ color: '#e6e6e6' }}>Loading...</div>
        :
        <>
          {getresponse ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <CreateButton 
                variant="contained" 
                onClick={() => navigate("/Admin/addclass")}
                startIcon={<EmojiEventsIcon />}
              >
                Create Team
              </CreateButton>
            </Box>
            :
            <>
              <StyledHeader>
                <Chip 
                  icon={<SportsSoccerIcon sx={{ color: '#ffffff' }} />} 
                  label="Project Teams" 
                  sx={{
                    backgroundColor: '#ff79c6',
                    color: '#ffffff',
                    '& .MuiChip-label': {
                      fontFamily: 'Poppins, sans-serif'
                    }
                  }} 
                />
              </StyledHeader>
              {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
              }
              <SpeedDialTemplate actions={actions} />
            </>}
        </>
      }
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageContainer>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: '#1e1e1e',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
}

const PageContainer = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const StyledButton = styled.button`
  background: linear-gradient(45deg, #ff79c6, #bd93f9);
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(255, 121, 198, 0.4);
  }
`;

const CreateButton = styled(GreenButton)`
  background: linear-gradient(45deg, #ff79c6, #bd93f9);
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #ff79c6, #bd93f9);
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(255, 121, 198, 0.4);
  }
`;