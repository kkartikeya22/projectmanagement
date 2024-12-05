import React, { useState } from 'react'
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination, Chip, Tooltip } from '@mui/material';
import { SportsSoccer, EmojiEvents, School, Timeline } from '@mui/icons-material';

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getStatusIcon = (value) => {
        if (typeof value === 'string') {
            if (value.toLowerCase().includes('completed')) {
                return <Chip icon={<EmojiEvents />} label={value} sx={{
                    backgroundColor: '#ff79c6',
                    color: '#121212',
                    '& .MuiChip-icon': {
                        color: '#121212'
                    }
                }} size="small" />;
            } else if (value.toLowerCase().includes('progress')) {
                return <Chip icon={<Timeline />} label={value} sx={{
                    backgroundColor: '#bd93f9',
                    color: '#121212',
                    '& .MuiChip-icon': {
                        color: '#121212'
                    }
                }} size="small" />;
            }
        }
        return value;
    };

    return (
        <>
            <TableContainer sx={{ 
                boxShadow: '0 0 10px rgba(255, 121, 198, 0.3)', 
                borderRadius: 2, 
                bgcolor: '#1e1e1e',
                '&:hover': {
                    boxShadow: '0 0 15px rgba(189, 147, 249, 0.4)'
                },
                transition: 'box-shadow 0.3s ease-in-out'
            }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column, index) => (
                                <StyledTableCell
                                    key={index}
                                    align={column.align}
                                    style={{ 
                                        minWidth: column.minWidth,
                                        fontWeight: 'bold',
                                        backgroundColor: '#ffffff',
                                        color: '#121212'
                                    }}
                                >
                                    <Tooltip title={`Sort by ${column.label}`}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <SportsSoccer fontSize="small" />
                                            {column.label}
                                        </div>
                                    </Tooltip>
                                </StyledTableCell>
                            ))}
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
                                            backgroundColor: '#121212',
                                            '&:nth-of-type(even)': {
                                                backgroundColor: '#1e1e1e',
                                            },
                                            '&:hover': {
                                                backgroundColor: '#2a002e !important',
                                                boxShadow: '0 0 8px rgba(255, 121, 198, 0.3)',
                                            },
                                            transition: 'all 0.3s ease-in-out'
                                        }}
                                    >
                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <StyledTableCell 
                                                    key={index} 
                                                    align={column.align}
                                                    sx={{
                                                        color: '#e6e6e6'
                                                    }}
                                                >
                                                    {
                                                        column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : getStatusIcon(value)
                                                    }
                                                </StyledTableCell>
                                            );
                                        })}
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
                    color: '#e6e6e6',
                    '.MuiTablePagination-select': {
                        backgroundColor: '#1e1e1e',
                        borderRadius: 1,
                        color: '#ff79c6',
                        '&:hover': {
                            backgroundColor: '#2a002e'
                        }
                    },
                    '.MuiTablePagination-selectIcon': {
                        color: '#ff79c6'
                    },
                    '.MuiTablePagination-actions': {
                        color: '#ff79c6'
                    }
                }}
            />
        </>
    )
}

export default TableViewTemplate