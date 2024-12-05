import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Avatar, Chip } from '@mui/material'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import { FaUsers, FaUserFriends } from 'react-icons/fa';
import { GiTeamUpgrade } from 'react-icons/gi';
import styled from 'styled-components';

const PageContainer = styled.div`
    background-color: #121212;
    min-height: 100vh;
    padding: 20px;
    color: #f8f8f2;
    font-family: 'Poppins', sans-serif;
`;

const StyledBox = styled(Box)`
    background-color: #282a36;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(189, 147, 249, 0.2);
`;

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error)
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID)
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID)
        }
    }

    const sclassColumns = [
        { 
            id: 'name', 
            label: 'Project Group', 
            minWidth: 170,
            render: (value) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ bgcolor: '#ff79c6', width: 32, height: 32 }}>
                        <FaUsers />
                    </Avatar>
                    <Typography sx={{ color: '#f8f8f2' }}>{value}</Typography>
                </Box>
            )
        }
    ]

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    })

    const SclassButtonHaver = ({ row }) => {
        return (
            <>
                <PurpleButton 
                    variant="contained"
                    startIcon={<GiTeamUpgrade />}
                    onClick={() => navigateHandler(row.id)}
                    sx={{
                        background: 'linear-gradient(45deg, #bd93f9 30%, #ff79c6 90%)',
                        color: '#f8f8f2'
                    }}
                >
                    Select Group
                </PurpleButton>
            </>
        );
    };

    return (
        <PageContainer>
            {loading ?
                <Typography sx={{ color: '#f8f8f2' }}>Loading...</Typography>
                :
                <>
                    {getresponse ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <PurpleButton 
                                variant="contained" 
                                startIcon={<FaUserFriends />}
                                onClick={() => navigate("/Admin/addclass")}
                                sx={{
                                    background: 'linear-gradient(45deg, #bd93f9 30%, #ff79c6 90%)',
                                    color: '#f8f8f2'
                                }}
                            >
                                Create Project Group
                            </PurpleButton>
                        </Box>
                        :
                        <StyledBox>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <FaUsers style={{ fontSize: '24px', color: '#ff79c6' }}/>
                                <Typography variant="h5" sx={{ color: '#f8f8f2' }}>
                                    Select Your Project Group
                                </Typography>
                                <Chip 
                                    label="IITK Teams" 
                                    sx={{ 
                                        ml: 1,
                                        bgcolor: '#44475a',
                                        color: '#f8f8f2'
                                    }}
                                    size="small"
                                />
                            </Box>
                            {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                            }
                        </StyledBox>
                    }
                </>
            }
        </PageContainer>
    )
}

export default ChooseClass