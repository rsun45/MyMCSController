import Box from '@mui/material/Box';
import * as React from 'react';
import Graph from './Graph';

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
                {Date()}
            </Box>
            
            <Graph />
        </Box>
    );
}