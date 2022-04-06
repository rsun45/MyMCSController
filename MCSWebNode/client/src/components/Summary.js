import Box from '@mui/material/Box';
import * as React from 'react';
// import Graph from './Graph';
import Clock from 'react-live-clock';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PieChartCurrentDay from './PieChartCurrentDay';
import PieChartCurrentShift from './PieChartCurrentShift';
import PieChartLastShift from './PieChartLastShift';
import PieChartYesterday from './PieChartYesterday';

export default function Summary(){
    return (
        <Box>
            <Box sx={{
                fontSize: 23,
                fontWeight: 'bold',
                textAlign: 'center',
            }}>
                Project Name
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
                  height: 300,
                },
            }}>
                <Paper variant="outlined">optiontal function 1</Paper>
                <Paper variant="outlined">optiontal function 2</Paper>
            </Box>
            
            
            <Grid container spacing={0} columns={4}>                {/* 空间安排4列 */}
                <Grid item xs={1}>
                    <PieChartCurrentShift/>
                </Grid>
                <Grid item xs={1}>
                    <PieChartLastShift/>
                </Grid>
                <Grid item xs={1}>
                    <PieChartCurrentDay/>
                </Grid>
                <Grid item xs={1}>
                    <PieChartYesterday/>
                </Grid>
            </Grid>
        </Box>
    );
}