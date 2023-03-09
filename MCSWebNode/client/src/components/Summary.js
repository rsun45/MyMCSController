import Box from '@mui/material/Box';
import * as React from 'react';
// import Graph from './Graph';
import Clock from 'react-live-clock';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PieChartCurrentDay from './PieChartCurrentDay';
import PieChartCurrentShift from './PieChartCurrentShift';
import PieChartLastShift from './PieChartLastShift';
import PieChartYesterday from './PieChartYesterday';
import OptionalFunction1 from './OptionalFunction1';
import OptionalFunction2 from './OptionalFunction2';
import SummaryFailGrid from './SummaryFailGrid';

export default function Summary(){

    // drawer for graph
    const [drawer, setDrawer] = React.useState(false);

    
    const [shiftData, setShiftData] = React.useState([{"id": "1", "tagName": "nut3", "rejectCount": 1}]);

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }


        setDrawer(!drawer);
    };

    const pieToggleDrawer = ()  => {


        setDrawer(!drawer);

    };


    return (
        <div>
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
                  width: '100%',
                  height: '350px',
                },
            }}>
                <Paper variant="outlined">
                    <h3>Top 5 reject nuts</h3>
                    <OptionalFunction1/>
                </Paper>
                <Paper variant="outlined">
                    <h3>Station average cycle time</h3>
                    <OptionalFunction2/>
                </Paper>
            </Box>
            
            
            <Grid 
            container spacing={0} columns={4}>                {/* 空间安排4列 */}
                <Grid item xs={1}>
                    <PieChartCurrentShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData}/>
                </Grid>
                <Grid item xs={1}>
                    <PieChartLastShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData}/>
                </Grid>
                <Grid item xs={1}>
                    <PieChartCurrentDay pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData}/>
                </Grid>
                <Grid item xs={1}>
                    <PieChartYesterday pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData}/>
                </Grid>
            </Grid>

            <Drawer
                anchor='bottom'
                open={drawer}
                onClose={toggleDrawer()}
                PaperProps={{
                    sx: { height: "50%" },
                  }}
            >
                <CancelIcon onClick={toggleDrawer()}/>
                
                    <SummaryFailGrid shiftData={shiftData}/>
            </Drawer> 


        </div>
    );
}