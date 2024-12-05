import React from 'react'
import { SpeedDial, SpeedDialAction, styled, Badge, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const SpeedDialTemplate = ({ actions }) => {
    return (
        <Tooltip title="Quick Actions" placement="top">
            <CustomSpeedDial
                ariaLabel="Mentor Controls"
                icon={
                    <Badge color="error" variant="dot">
                        <SettingsIcon sx={{ color: '#ffffff' }} />
                    </Badge>
                }
                direction="left"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={
                            <Badge color="primary" variant="dot">
                                {action.icon}
                            </Badge>
                        }
                        tooltipTitle={action.name}
                        onClick={action.action}
                        FabProps={{
                            size: "medium",
                            sx: {
                                color: '#ffffff'
                            }
                        }}
                    />
                ))}
            </CustomSpeedDial>
        </Tooltip>
    )
}

export default SpeedDialTemplate

const CustomSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background: linear-gradient(135deg, #ff79c6 0%, #bd93f9 100%);
    box-shadow: 0 4px 12px rgba(255, 121, 198, 0.3);
    transition: all 0.3s ease-in-out;
    
    &:hover {
      background: linear-gradient(135deg, #ff92d0 0%, #c9a4fa 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(255, 121, 198, 0.4),
                  0 0 20px rgba(189, 147, 249, 0.3);
    }
  }

  .MuiSpeedDialAction-fab {
    background: linear-gradient(135deg, #bd93f9 0%, #6272a4 100%);
    color: #ffffff;
    transition: all 0.3s ease-in-out;
    
    &:hover {
      background: linear-gradient(135deg, #c9a4fa 0%, #7283b5 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(189, 147, 249, 0.4);
    }
  }

  .MuiBadge-badge {
    background-color: #ff5555;
    box-shadow: 0 0 10px rgba(255, 85, 85, 0.4);
  }
`;