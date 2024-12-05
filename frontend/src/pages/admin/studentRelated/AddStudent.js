import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [sclassName, setSclassName] = useState('')

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
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
        <>
            <div className="register" style={{
                backgroundColor: '#121212',
                color: '#e6e6e6',
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <form className="registerForm" onSubmit={submitHandler} style={{
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #ff79c6',
                    boxShadow: '0 0 10px #bd93f9',
                    padding: '2rem',
                    borderRadius: '8px',
                    width: '500px'
                }}>
                    <span className="registerTitle" style={{
                        color: '#ff79c6',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '2rem',
                        marginBottom: '1.5rem',
                        display: 'block'
                    }}>Add Student</span>
                    <label style={{ color: '#ff79c6', marginBottom: '0.5rem', display: 'block' }}>Name</label>
                    <input className="registerInput" type="text" placeholder="Enter student's name..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name" required 
                        style={{
                            backgroundColor: '#121212',
                            border: '1px solid #ff79c6',
                            color: '#e6e6e6',
                            padding: '0.8rem',
                            marginBottom: '1rem',
                            width: '100%',
                            borderRadius: '4px'
                        }}
                    />

                    {
                        situation === "Student" &&
                        <>
                            <label style={{ color: '#ff79c6', marginBottom: '0.5rem', display: 'block' }}>Class</label>
                            <select
                                className="registerInput"
                                value={className}
                                onChange={changeHandler} required
                                style={{
                                    backgroundColor: '#121212',
                                    border: '1px solid #ff79c6',
                                    color: '#e6e6e6',
                                    padding: '0.8rem',
                                    marginBottom: '1rem',
                                    width: '100%',
                                    borderRadius: '4px'
                                }}>
                                <option value='Select Class'>Select Class</option>
                                {sclassesList.map((classItem, index) => (
                                    <option key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </option>
                                ))}
                            </select>
                        </>
                    }

                    <label style={{ color: '#ff79c6', marginBottom: '0.5rem', display: 'block' }}>Roll Number</label>
                    <input className="registerInput" type="number" placeholder="Enter student's Roll Number..."
                        value={rollNum}
                        onChange={(event) => setRollNum(event.target.value)}
                        required 
                        style={{
                            backgroundColor: '#121212',
                            border: '1px solid #ff79c6',
                            color: '#e6e6e6',
                            padding: '0.8rem',
                            marginBottom: '1rem',
                            width: '100%',
                            borderRadius: '4px'
                        }}
                    />

                    <label style={{ color: '#ff79c6', marginBottom: '0.5rem', display: 'block' }}>Password</label>
                    <input className="registerInput" type="password" placeholder="Enter student's password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password" required 
                        style={{
                            backgroundColor: '#121212',
                            border: '1px solid #ff79c6',
                            color: '#e6e6e6',
                            padding: '0.8rem',
                            marginBottom: '1.5rem',
                            width: '100%',
                            borderRadius: '4px'
                        }}
                    />

                    <button className="registerButton" type="submit" disabled={loader} style={{
                        background: 'linear-gradient(45deg, #ff79c6, #bd93f9)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'all 0.3s ease-in-out',
                        ':hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 0 15px #ff79c6'
                        }
                    }}>
                        {loader ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Add'
                        )}
                    </button>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddStudent