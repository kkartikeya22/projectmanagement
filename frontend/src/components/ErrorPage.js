import React from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle, FaMedal } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <Container>
            <Content>
                <Badge>IITK Mentorship Portal</Badge>
                <IconWrapper>
                    <FaExclamationTriangle size={50} />
                </IconWrapper>
                <Heading>Oops, something went wrong!</Heading>
                <Text>
                    We apologize for the interruption to your mentorship journey. Our portal is currently experiencing technical difficulties. Please check back later to continue supporting your fellow IITK students.
                </Text>
                <MedalWrapper>
                    <FaMedal size={30} />
                </MedalWrapper>
            </Content>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Poppins", sans-serif;
  color: #e6e6e6;
  background: linear-gradient(135deg, #121212 0%, #2a002e 100%);
  position: relative;
`;

const Content = styled.div`
  max-width: 800px;
  padding: 40px;
  text-align: center;
  background: rgba(30, 30, 30, 0.95);
  border-radius: 15px;
  border: 1px solid #ff79c6;
  box-shadow: 0 0 20px rgba(255, 121, 198, 0.1);
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0 0 30px rgba(189, 147, 249, 0.2);
    transform: translateY(-2px);
  }
`;

const Badge = styled.div`
  background: linear-gradient(135deg, #ff79c6 0%, #bd93f9 100%);
  color: #ffffff;
  padding: 8px 20px;
  border-radius: 25px;
  display: inline-block;
  font-weight: 600;
  margin-bottom: 25px;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(255, 121, 198, 0.3);
  }
`;

const IconWrapper = styled.div`
  color: #ff5555;
  margin-bottom: 25px;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const Heading = styled.h1`
  margin-bottom: 40px;
  font-size: 36px;
  font-weight: 700;
  color: #ff79c6;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(255, 121, 198, 0.3);
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 25px;
  color: #e6e6e6;
`;

const MedalWrapper = styled.div`
  color: #bd93f9;
  opacity: 0.9;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
    color: #ff79c6;
  }
`;

export default ErrorPage;
