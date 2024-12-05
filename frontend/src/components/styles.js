import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses, 
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

const drawerWidth = 240;

// Sporty table cell styling with subtle gradient and modern look
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        background: `linear-gradient(45deg, #bd93f9 30%, #ff79c6 90%)`,
        color: '#ffffff',
        fontWeight: 600,
        fontSize: 15,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontFamily: "'Poppins', sans-serif"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontWeight: 500,
        color: '#e6e6e6',
        backgroundColor: '#121212',
        '&:hover': {
            backgroundColor: '#1e1e1e',
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 0 8px rgba(255, 121, 198, 0.3)'
        }
    },
}));

// Modern striped rows with hover effect
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#121212',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#1e1e1e',
    },
    '&:hover': {
        backgroundColor: '#2a002e',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        boxShadow: '0 0 12px rgba(189, 147, 249, 0.3)'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Dynamic AppBar with sporty accent
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: '#121212',
    boxShadow: '0 4px 12px rgba(255, 121, 198, 0.2)',
    borderBottom: '1px solid rgba(255, 121, 198, 0.2)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Modern drawer with subtle animations
export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            background: '#121212',
            borderRight: '1px solid rgba(255, 121, 198, 0.2)',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            boxShadow: '4px 0 12px rgba(0, 0, 0, 0.3)',
            '& .MuiListItemIcon-root': {
                color: '#ff79c6',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)',
                    color: '#bd93f9',
                    filter: 'drop-shadow(0 0 8px rgba(189, 147, 249, 0.5))'
                }
            },
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);