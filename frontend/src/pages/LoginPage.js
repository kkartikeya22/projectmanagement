import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop, Badge, Tooltip, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, SportsMartialArts, EmojiEvents, Groups } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg"
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bd93f9',
        },
        secondary: {
            main: '#ff79c6',
        },
        background: {
            default: '#282a36',
            paper: '#44475a',
        },
        text: {
            primary: '#f8f8f2',
            secondary: '#bd93f9',
        },
    },
});

const LoginPage = ({ role }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }

        else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "zxc"

        if (role === "Admin") {
            const email = "yogendra@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Student") {
            const rollNum = "1"
            const studentName = "Dipesh Awasthi"
            const fields = { rollNum, studentName, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Teacher") {
            const email = "tony@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            }
            else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            }
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
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={darkTheme}>
            <StyledContainer>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square 
                        sx={{ 
                            backgroundColor: '#44475a',
                            color: '#f8f8f2'
                        }}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Badge badgeContent="IITK" color="secondary">
                                <Typography variant="h4" sx={{ color: '#ff79c6', display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <SportsMartialArts sx={{ mr: 1, color: '#bd93f9' }} />
                                    {role === "Student" ? "Mentee" : "Mentor"} Login
                                </Typography>
                            </Badge>
                            <Typography variant="subtitle1" sx={{ color: '#f8f8f2', display: 'flex', alignItems: 'center' }}>
                                <EmojiEvents sx={{ mr: 1, color: '#bd93f9' }} />
                                Ready to achieve project milestones? Let's go!
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                {role === "Student" ? (
                                    <>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="rollNumber"
                                            label="Enter your Roll Number"
                                            name="rollNumber"
                                            autoComplete="off"
                                            type="number"
                                            autoFocus
                                            error={rollNumberError}
                                            helperText={rollNumberError && 'Roll Number is required'}
                                            onChange={handleInputChange}
                                            sx={{
                                                '& label': { color: '#f8f8f2' },
                                                '& input': { color: '#f8f8f2' },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: '#6272a4' },
                                                    '&:hover fieldset': { borderColor: '#bd93f9' },
                                                }
                                            }}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="studentName"
                                            label="Enter your name"
                                            name="studentName"
                                            autoComplete="name"
                                            autoFocus
                                            error={studentNameError}
                                            helperText={studentNameError && 'Name is required'}
                                            onChange={handleInputChange}
                                            sx={{
                                                '& label': { color: '#f8f8f2' },
                                                '& input': { color: '#f8f8f2' },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: '#6272a4' },
                                                    '&:hover fieldset': { borderColor: '#bd93f9' },
                                                }
                                            }}
                                        />
                                    </>
                                ) : (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Enter your email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={emailError}
                                        helperText={emailError && 'Email is required'}
                                        onChange={handleInputChange}
                                        sx={{
                                            '& label': { color: '#f8f8f2' },
                                            '& input': { color: '#f8f8f2' },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { borderColor: '#6272a4' },
                                                '&:hover fieldset': { borderColor: '#bd93f9' },
                                            }
                                        }}
                                    />
                                )}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={toggle ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={passwordError}
                                    helperText={passwordError && 'Password is required'}
                                    onChange={handleInputChange}
                                    sx={{
                                        '& label': { color: '#f8f8f2' },
                                        '& input': { color: '#f8f8f2' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#6272a4' },
                                            '&:hover fieldset': { borderColor: '#bd93f9' },
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setToggle(!toggle)} sx={{ color: '#f8f8f2' }}>
                                                    {toggle ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" sx={{ 
                                            color: '#bd93f9',
                                            '&.Mui-checked': {
                                                color: '#ff79c6',
                                            },
                                        }} />}
                                        label="Remember me"
                                        sx={{ color: '#f8f8f2' }}
                                    />
                                    <StyledLink href="#">
                                        Forgot password?
                                    </StyledLink>
                                </Grid>
                                <Tooltip title="Join your project squad">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ 
                                            mt: 3,
                                            bgcolor: '#bd93f9',
                                            '&:hover': {
                                                bgcolor: '#ff79c6'
                                            }
                                        }}
                                        startIcon={<Groups />}
                                    >
                                        {loader ?
                                            <CircularProgress size={24} color="inherit" />
                                            : "Login"}
                                    </Button>
                                </Tooltip>
                                <Button
                                    fullWidth
                                    onClick={guestModeHandler}
                                    variant="outlined"
                                    sx={{ 
                                        mt: 2, 
                                        mb: 3, 
                                        color: '#bd93f9', 
                                        borderColor: '#bd93f9',
                                        '&:hover': {
                                            borderColor: '#ff79c6',
                                            color: '#ff79c6'
                                        }
                                    }}
                                    startIcon={<SportsMartialArts />}
                                >
                                    Try Demo Access
                                </Button>
                                {role === "Admin" &&
                                    <Grid container sx={{ color: '#f8f8f2' }}>
                                        <Grid>
                                            Want to be a mentor?
                                        </Grid>
                                        <Grid item sx={{ ml: 2 }}>
                                            <StyledLink to="/Adminregister">
                                                Join as Mentor
                                            </StyledLink>
                                        </Grid>
                                    </Grid>
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: `url(${bgpic})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: '#282a36',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>
                <Backdrop
                    sx={{ color: '#f8f8f2', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={guestLoader}
                >
                    <CircularProgress sx={{ color: '#bd93f9' }} />
                    Please Wait
                </Backdrop>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </StyledContainer>
        </ThemeProvider>
    );
}

export default LoginPage

const StyledContainer = styled(Container)`
    background-color: #282a36;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #bd93f9;
    &:hover {
        color: #ff79c6;
    }
`;
