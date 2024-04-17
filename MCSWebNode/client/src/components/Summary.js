import Box from '@mui/material/Box';
import * as React from 'react';
// import Graph from './Graph';
import Clock from 'react-live-clock';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PieChartLastTwoShift from './PieChartLastTwoShift';
import PieChartCurrentShift from './PieChartCurrentShift';
import PieChartLastShift from './PieChartLastShift';
import PieChartYesterday from './PieChartYesterday';
import OptionalFunction1 from './SumFaultTimeByStations';
import OptionalFunction2 from './AverageCycleTimeByStations';
import SummaryFailGrid from './SummaryFailGrid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';

export default function Summary(){

    // drawer for graph
    const [drawer, setDrawer] = React.useState(false);
    // state for selecting project names
    const [project, setProject] = React.useState([]);
    const [currentProject, setCurrentProject] = React.useState("");

    // force to refresh
    const [refresh, setRefresh] = React.useState(true);

    // get all project names
    React.useEffect(() => {    
        
        const getAllProjectNames = async () => { fetch("/api/GetAllLinesNames")                            
        .then((res) => res.json())                  
        .then((data) => {
            setProject(data.result);
            console.log(data);
            setCurrentProject(data.result[data.currentLineIndex].label);
        });    
        }
        getAllProjectNames();

    }, []);

    // when change project
    const changeProject = (lineName) => {
        fetch("/api/ChangeProjectLine/" + lineName)                            
        .then((res) => res.json())                  
        .then((data) => {
            console.log(data);
        });    
    };

    
    const [shiftData, setShiftData] = React.useState([{"id": "1", "tagName": "nut3", "rejectCount": 1}]);

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }


        setDrawer(!drawer);
    };

    const pieToggleDrawer = ()  => {


        // setDrawer(!drawer);

    };


    return (
        <div>
            <Box
                display="flex"
                alignItems="center"
                width="100%"
            >
                <Autocomplete
                    disablePortal
                    id="project_name"
                    options={project.map((option) => option)}
                    value={currentProject}
                    sx={{ width: 400, margin: "auto"}}
                    renderInput={(params) => <TextField required {...params} label="Project Name"  />}
                    isOptionEqualToValue={(option, value) => option.label === value}
                    // renderOption={(props, item) => (
                    //     <li {...props} key={item.id}>
                    //     <ListItemText>{item.label}</ListItemText>
                    //     </li>
                    // )}
                    
                    onChange={(event, newValue) => {
                        setCurrentProject(newValue);
                        changeProject(newValue.label);
                        setRefresh(!refresh);
                    }}

                />
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
                    <h3>All stations sum fault time</h3>
                    <OptionalFunction1 refresh={refresh}/>
                </Paper>
                <Paper variant="outlined">
                    <h3>All stations average sum time</h3>
                    <OptionalFunction2 refresh={refresh}/>
                </Paper>
            </Box>
            
            
            <Grid 
            container spacing={0} columns={3}>               
                <Grid item xs={1}>
                    <PieChartCurrentShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData} refresh={refresh}/>
                </Grid>
                <Grid item xs={1}>
                    <PieChartLastShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData} refresh={refresh}/>
                </Grid>
                <Grid item xs={1}>
                    <PieChartLastTwoShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData} refresh={refresh}/>
                </Grid>
                {/* <Grid item xs={1}>
                    <PieChartYesterday pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData}/>
                </Grid> */}
            </Grid>

            {/* <Drawer
                anchor='bottom'
                open={drawer}
                onClose={toggleDrawer()}
                PaperProps={{
                    sx: { height: "50%" },
                  }}
            >
                <CancelIcon onClick={toggleDrawer()}/>
                
                    <SummaryFailGrid shiftData={shiftData}/>
            </Drawer>  */}


        </div>
    );
}