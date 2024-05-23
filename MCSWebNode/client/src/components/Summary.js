import Box from '@mui/material/Box';
import * as React from 'react';
// import Graph from './Graph';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PieChartLastTwoShift from './PieChartLastTwoShift';
import PieChartCurrentShift from './PieChartCurrentShift';
import PieChartLastShift from './PieChartLastShift';
import PieChartRunningPerformance from './PieChartRunningPerformance';
import PieChartYesterday from './PieChartYesterday';
import OptionalFunction1 from './SumFaultTimeByStations';
import OptionalFunction2 from './AverageCycleTimeByStations';
import SummaryFailGrid from './SummaryFailGrid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import { CookiesProvider, useCookies } from 'react-cookie';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Summary(){

    // drawer for graph
    const [drawer, setDrawer] = React.useState(false);
    // state for selecting project names
    const [project, setProject] = React.useState([]);
    const [currentProject, setCurrentProject] = React.useState("");

    // force to refresh
    const [refresh, setRefresh] = React.useState(true);

    
    // get cookies
    const [cookies, setCookie] = useCookies(['summaryPageChoices']);

    
    // refresh timer
    const [refreshTimer, setRefreshTimer] = React.useState(0);

    // get all project names
    React.useEffect(() => {
        
        // get all lines names and refresh time
        const getAllProjectNames = async () => { fetch("/api/GetAllLinesNames")                            
        .then((res) => res.json())                  
        .then((data) => {
            // console.log(data);
            setProject(data.result);
            setCurrentProject(data.result[data.currentLineIndex].label);
            setRefreshTimer(Number(data.refreshTimer));
        });    
        }
        getAllProjectNames();


    }, []);



    
    // when got refresh timer
    React.useEffect(() => {

        if (refreshTimer>0) {
            const reloadData = () =>{
                // console.log("reload in " + refreshTimer);
                setRefresh(refresh => {
                    return !refresh;
                });
                
            };

            const intervalId = setInterval(() => {
                reloadData();
            }, refreshTimer);

            return () => clearInterval(intervalId);
        }


    }, [refreshTimer]);



    // when change project
    const changeProject = (lineName) => {
        fetch("/api/ChangeProjectLine/" + lineName)                            
        .then((res) => res.json())                  
        .then((data) => {
            console.log(data);
        });    
    };

    
    const [shiftData, setShiftData] = React.useState([{"id": "1", "tagName": "nut3", "rejectCount": 1}]);

    // const toggleDrawer = () => (event) => {
    //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }


    //     setDrawer(!drawer);
    // };

    const pieToggleDrawer = ()  => {


        // setDrawer(!drawer);

    };




    // change graph menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClickOpenMenu = (event, selectedGraph) => {
        setAnchorEl(event.currentTarget);
        setCurrentGraph(selectedGraph);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    // current selected graph
    const [currentGraph, setCurrentGraph] = React.useState("");

    // handle menu item click
    const handleMenuItem1Click = () => {
        cookies.summaryPageChoices[currentGraph] = {"name": "SumFaultTime", "header": "All Stations Sum Fault Time (Second)"};
        setCookie("summaryPageChoices", cookies.summaryPageChoices);
        handleCloseMenu();
    };
    const handleMenuItem2Click = () => {
        cookies.summaryPageChoices[currentGraph] = {"name": "AverageCycleTime", "header": "All Stations Average Cycle Time (Second)"};
        setCookie("summaryPageChoices", cookies.summaryPageChoices);
        handleCloseMenu();
    };


    // return graph component base on cookie name
    const getGraphCompByCookie = (graphName) => {
        if (graphName === "SumFaultTime"){
            return <OptionalFunction1 refresh={refresh} />;
        }
        else if (graphName === "AverageCycleTime"){
            return <OptionalFunction2 refresh={refresh} />
        }
    }



    return (
        <div
        // style={{backgroundColor:"#ededed", width:"100%", height:"90vh", marginTop:-15, paddingTop: 15}}
        >


            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleMenuItem1Click}>Sum Fault Time</MenuItem>
                <MenuItem onClick={handleMenuItem2Click}>Average Cycle Time</MenuItem>
            </Menu>




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
            {/* <Box sx={{
                display: 'flex',
                '& > :not(style)': {
                  m: 3,
                  width: '100%',
                  height: '350px',
                },
            }}>
                <Paper variant="outlined">
                    <h3>All Stations Sum Fault Time</h3>
                    <OptionalFunction1 refresh={refresh}/>
                </Paper>
                <Paper variant="outlined">
                    <h3>All Stations Average Cycle Time</h3>
                    <OptionalFunction2 refresh={refresh}/>
                </Paper>
            </Box> */}


            <Box sx={{ height: "40vh", mb:4}}>
                <Grid
                    container spacing={4} columns={2} sx={{ p: 2 }} justifyContent="center" alignItems="center">
                    <Grid item xs={1} style={{ justifyContent: "center" }} sx={{ height: "40vh", }}>
                        <div style={{display:"flex", justifyContent: "center" }}>
                            <h3>{cookies.summaryPageChoices["Graph1"].header}</h3>
                            <IconButton onClick={(event)=>handleClickOpenMenu(event, "Graph1")}>
                                <ArrowDropDownCircleIcon />
                            </IconButton>
                        </div>
                        { getGraphCompByCookie(cookies.summaryPageChoices["Graph1"].name) }
                        {/* <OptionalFunction1 refresh={refresh} /> */}
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}sx={{ height: "40vh",}}>
                        <div style={{display:"flex", justifyContent: "center" }}>
                        <h3>All Stations Average Cycle Time (Second)</h3>
                            <IconButton onClick={(event)=>handleClickOpenMenu(event, "Graph2")} >
                                <ArrowDropDownCircleIcon />
                            </IconButton>
                        </div>
                        { getGraphCompByCookie(cookies.summaryPageChoices["Graph2"].name) }
                        {/* <OptionalFunction2 refresh={refresh} /> */}
                    </Grid>
                </Grid>
            </Box>
            
            
            <Grid 
            container spacing={0} columns={3} >               
                <Grid item xs={1}>
                    <PieChartCurrentShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData} refresh={refresh}/>
                </Grid>
                <Grid item xs={1}>
                    <PieChartLastShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData} refresh={refresh}/>
                </Grid>
                <Grid item xs={1}>
                    {/* <PieChartLastTwoShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData} refresh={refresh}/> */}
                    <PieChartRunningPerformance refresh={refresh}/>
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