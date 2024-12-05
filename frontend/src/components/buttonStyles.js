import styled from 'styled-components';
import { Button } from '@mui/material';

export const PrimaryButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #ff79c6 0%, #bd93f9 100%);
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    position: relative;
    overflow: hidden;
    &:hover {
      background: linear-gradient(135deg, #ff92d0 0%, #c9a4fa 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(255, 121, 198, 0.3),
                  0 0 20px rgba(189, 147, 249, 0.3);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const SecondaryButton = styled(Button)`
  && {
    background-color: transparent;
    color: #ff79c6;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    border: 2px solid #ff79c6;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #ff79c6;
      color: #121212;
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(255, 121, 198, 0.3),
                  0 0 20px rgba(255, 121, 198, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const MentorButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #bd93f9 0%, #6272a4 100%);
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #c9a4fa 0%, #7283b5 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(189, 147, 249, 0.4),
                  0 0 20px rgba(189, 147, 249, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const MenteeButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #ff5555 0%, #ff79c6 100%);
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #ff6666 0%, #ff92d0 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(255, 85, 85, 0.4),
                  0 0 20px rgba(255, 121, 198, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const SportyButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #ff79c6 0%, #ff5555 100%);
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #ff92d0 0%, #ff6666 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(255, 121, 198, 0.4),
                  0 0 20px rgba(255, 85, 85, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const SuccessButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #50fa7b 0%, #69ff97 100%);
    color: #121212;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #69ff97 0%, #85ffb0 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(80, 250, 123, 0.4),
                  0 0 20px rgba(80, 250, 123, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const WarningButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #ffb86c 0%, #ffd97c 100%);
    color: #121212;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #ffc67c 0%, #ffe68c 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(255, 184, 108, 0.4),
                  0 0 20px rgba(255, 184, 108, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const DangerButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #ff5555 0%, #ff6666 100%);
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #ff6666 0%, #ff7777 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(255, 85, 85, 0.4),
                  0 0 20px rgba(255, 85, 85, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const AchievementButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #bd93f9 0%, #ff79c6 100%);
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    border: 2px solid #ff79c6;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #c9a4fa 0%, #ff92d0 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(189, 147, 249, 0.4),
                  0 0 20px rgba(255, 121, 198, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #8be9fd 0%, #6272a4 100%);
    color: #121212;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #9cf0ff 0%, #7283b5 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(139, 233, 253, 0.4),
                  0 0 20px rgba(98, 114, 164, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #50fa7b 0%, #69ff97 100%);
    color: #121212;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #69ff97 0%, #85ffb0 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(80, 250, 123, 0.4),
                  0 0 20px rgba(80, 250, 123, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #bd93f9 0%, #6272a4 100%);
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #c9a4fa 0%, #7283b5 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(189, 147, 249, 0.4),
                  0 0 20px rgba(98, 114, 164, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #282a36 0%, #44475a 100%);
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #44475a 0%, #6272a4 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(40, 42, 54, 0.4),
                  0 0 20px rgba(68, 71, 90, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #c9a4fa 0%, #bd93f9 100%);
    color: #121212;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-transform: none;
    border-radius: 12px;
    padding: 10px 24px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #d4b5fb 0%, #c9a4fa 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(201, 164, 250, 0.4),
                  0 0 20px rgba(189, 147, 249, 0.2);
    }
    &:active {
      transform: translateY(-1px);
    }
  }
`;
