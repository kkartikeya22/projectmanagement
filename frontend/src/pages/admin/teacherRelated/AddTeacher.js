import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { FaUserTie } from 'react-icons/fa';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const StyledForm = styled.form`
  background-color: #282a36;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(189, 147, 249, 0.2);
  max-width: 500px;
  margin: 0 auto;
`;

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center' }}>
          <FaUserTie style={{ fontSize: '32px', color: '#ff79c6' }}/>
          <Typography variant="h4" sx={{ color: '#f8f8f2' }}>
            Add Mentor
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#bd93f9', mb: 1 }}>
            Module: {subjectDetails && subjectDetails.subName}
          </Typography>
          <Typography variant="h6" sx={{ color: '#bd93f9' }}>
            Project: {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={styles.inputField}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={styles.inputField}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={styles.inputField}
          margin="normal"
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loader}
          sx={styles.button}
        >
          {loader ? (
            <CircularProgress size={24} sx={{ color: '#f8f8f2' }} />
          ) : (
            'Register'
          )}
        </Button>
      </StyledForm>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageContainer>
  )
}

export default AddTeacher

const styles = {
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
    marginBottom: '1rem'
  },
  button: {
    background: 'linear-gradient(45deg, #ff79c6 30%, #bd93f9 90%)',
    color: '#f8f8f2',
    marginTop: '1rem',
    padding: '12px',
    '&:hover': {
      background: 'linear-gradient(45deg, #bd93f9 30%, #ff79c6 90%)',
    }
  }
}