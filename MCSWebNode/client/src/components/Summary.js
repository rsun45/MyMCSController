import Box from '@mui/material/Box';
import * as React from 'react';
import Graph from './Graph';
import Clock from 'react-live-clock';
import Paper from '@mui/material/Paper';

export default function Summary(){
    return (
        <Box>
            <Box sx={{
                fontSize: 23,
                fontWeight: 'bold',
                textAlign: 'center',
            }}>
                121006 Project Name
            </Box>
            <Box sx={{
                fontSize: 18,
                textAlign: 'right',
            }}>
                <Clock
                    format={'dddd, MMMM Do YYYY, h:mm:ss a'}
                    ticking={true} />
            </Box>
            <Box sx={{
                display: 'flex',
                '& > :not(style)': {
                  m: 3,
                  width: 1600,
                  height: 400,
                },
            }}>
                <Paper variant="outlined">optiontal function 1</Paper>
                <Paper variant="outlined">optiontal function 2</Paper>
            </Box>
            <Graph />
        </Box>
    );
}