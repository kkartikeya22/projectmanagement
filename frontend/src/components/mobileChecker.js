const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
    const handleResize = () => {
        const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
        setIsMobile(isMobileDevice);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the value on the first render
    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);

{/* {
          isMobile ?
            <ActionMenu row={row} actions={actions} />
            :
            <StyledSpeedDial
              ariaLabel="Sports-themed Action Menu"
              icon={<SportsSoccerIcon />}
              direction="right"
              className="action-dial"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.action}
                  FabProps={{
                    size: "medium",
                    className: "action-button"
                  }}
                />
              ))}
            </StyledSpeedDial>
        } */}

const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background: linear-gradient(135deg, #ff79c6 0%, #bd93f9 100%);
    transition: all 0.3s ease-in-out;
    &:hover {
      background: linear-gradient(135deg, #ff8bd0 0%, #c9a4ff 100%);
      transform: scale(1.05);
      box-shadow: 0 0 15px rgba(255, 121, 198, 0.5);
    }
  }
  
  .action-button {
    background-color: transparent;
    border: 2px solid #ff79c6;
    color: #ff79c6;
    transition: all 0.3s ease-in-out;
    
    &:hover {
      background-color: #ff79c6;
      color: #121212;
      transform: scale(1.05);
      box-shadow: 0 0 10px rgba(255, 121, 198, 0.3);
    }
  }

  .MuiSpeedDialAction-staticTooltipLabel {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    background-color: #1e1e1e;
    color: #e6e6e6;
    padding: 6px 12px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(255, 121, 198, 0.2);
    border: 1px solid #ff79c6;
  }
`;