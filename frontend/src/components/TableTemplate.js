import React, { useState } from 'react'
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination, Chip, Tooltip } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    return (
        <>
            <TableContainer sx={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(255, 121, 198, 0.2)',
                backgroundColor: '#121212',
                border: '1px solid rgba(255, 121, 198, 0.1)'
            }}>
                <Table stickyHeader aria-label="project tracking table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ 
                                        minWidth: column.minWidth,
                                        backgroundColor: '#121212',
                                        color: '#000000',
                                        fontWeight: 'bold',
                                        fontSize: '0.95rem',
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                >
                                    <Tooltip title={`Sort by ${column.label}`}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: column.align === 'right' ? 'flex-end' : 'flex-start' }}>
                                            <SportsSoccerIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#bd93f9' }} />
                                            {column.label}
                                        </div>
                                    </Tooltip>
                                </StyledTableCell>
                            ))}
                            <StyledTableCell 
                                align="center"
                                style={{ 
                                    backgroundColor: '#121212',
                                    color: '#000000',
                                    fontWeight: 'bold',
                                    fontSize: '0.95rem',
                                    fontFamily: "'Poppins', sans-serif"
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <EmojiEventsIcon sx={{ mr: 1, color: '#bd93f9' }} />
                                    Actions
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow 
                                        hover 
                                        role="checkbox" 
                                        tabIndex={-1} 
                                        key={row.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#2a002e !important',
                                                cursor: 'pointer',
                                                boxShadow: '0 0 12px rgba(189, 147, 249, 0.3)'
                                            }
                                        }}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? (
                                                        <Chip 
                                                            label={column.format(value)}
                                                            sx={{
                                                                background: 'linear-gradient(135deg, #ff79c6 0%, #bd93f9 100%)',
                                                                color: '#ffffff',
                                                                fontWeight: '500'
                                                            }}
                                                            size="small"
                                                        />
                                                    ) : (
                                                        <span style={{ 
                                                            fontWeight: '500',
                                                            color: '#e6e6e6'
                                                        }}>{value}</span>
                                                    )}
                                                </StyledTableCell>
                                            );
                                        })}
                                        <StyledTableCell align="center">
                                            <ButtonHaver row={row} />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 5));
                    setPage(0);
                }}
                sx={{
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                        fontWeight: '500',
                        color: '#e6e6e6'
                    },
                    '.MuiTablePagination-select': {
                        color: '#ff79c6'
                    },
                    '.MuiTablePagination-actions': {
                        color: '#bd93f9'
                    }
                }}
            />
        </>
    )
}

export default TableTemplate