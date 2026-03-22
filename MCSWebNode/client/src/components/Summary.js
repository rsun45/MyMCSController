import Box from '@mui/material/Box';
import * as React from 'react';
// import Graph from './Graph';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
import OperatorSummaryTimes from './OperatorSummaryTimes';
import MaintenanceSummaryComp from './MaintenanceSummaryComp';
import ActiveAlarmSummaryComp from './ActiveAlarmSummaryComp';
import SummaryFailGrid from './SummaryFailGrid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import { CookiesProvider, useCookies } from 'react-cookie';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FlowMeter from './machine-meters/FlowMeter';
import TemperatureMeter from './machine-meters/TemperatureMeter';
import HumidityMeter from './machine-meters/HumidityMeter';
import PowerMeter from './machine-meters/PowerMeter';
import TemperatureRecordsChart from './machine-meters/TemperatureRecordsChart';
import FlowRecordsChart from './machine-meters/FlowRecordsChart';
import HumidityRecordsChart from './machine-meters/HumidityRecordsChart';
import PowerRecordsChart from './machine-meters/PowerRecordsChart';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AnnouncementIcon from '@mui/icons-material/Announcement';


function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            component="div"
            variant="body1"
            sx={{ color: 'text.secondary' }}
          >
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

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
            // setCurrentProject(data.result[data.currentLineIndex].label);
            setCurrentProject("Air compressor 1");
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
    const handleMenuItem3Click = () => {
        cookies.summaryPageChoices[currentGraph] = {"name": "OperatorSummaryTimes", "header": "Operator Summary Times"};
        setCookie("summaryPageChoices", cookies.summaryPageChoices);
        handleCloseMenu();
    };
    const handleMenuItem4Click = () => {
        cookies.summaryPageChoices[currentGraph] = {"name": "CurrentShiftPassFailCounts", "header": ""};
        setCookie("summaryPageChoices", cookies.summaryPageChoices);
        handleCloseMenu();
    };
    const handleMenuItem5Click = () => {
        cookies.summaryPageChoices[currentGraph] = {"name": "RunningPerformance", "header": ""};
        setCookie("summaryPageChoices", cookies.summaryPageChoices);
        handleCloseMenu();
    };
    const handleMenuItem6Click = () => {
        cookies.summaryPageChoices[currentGraph] = {"name": "Maintenance", "header": "Maintenance"};
        setCookie("summaryPageChoices", cookies.summaryPageChoices);
        handleCloseMenu();
    };
    const handleMenuItem7Click = () => {
        cookies.summaryPageChoices[currentGraph] = {"name": "ActiveAlarm", "header": "Active Alarm"};
        setCookie("summaryPageChoices", cookies.summaryPageChoices);
        handleCloseMenu();
    };
    const handleMenuItem8Click = () => {
        cookies.summaryPageChoices[currentGraph] = {"name": "LastShiftPassFailCounts", "header": ""};
        setCookie("summaryPageChoices", cookies.summaryPageChoices);
        handleCloseMenu();
    };
    const handleMenuItem9Click = () => {
        cookies.summaryPageChoices[currentGraph] = {"name": "LastTwoShiftPassFailCounts", "header": ""};
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
        else if (graphName === "OperatorSummaryTimes"){
            return <OperatorSummaryTimes refresh={refresh} />
        }
        else if (graphName === "CurrentShiftPassFailCounts"){
            return <PieChartCurrentShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData} refresh={refresh} />
        }
        else if (graphName === "LastShiftPassFailCounts"){
            return <PieChartLastShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData} refresh={refresh}/>
        }
        else if (graphName === "LastTwoShiftPassFailCounts"){
            return <PieChartLastTwoShift pieToggleDrawer={pieToggleDrawer} setShiftData={setShiftData} refresh={refresh}/>
        }
        else if (graphName === "RunningPerformance"){
            return <PieChartRunningPerformance refresh={refresh} />
        }
        else if (graphName === "Maintenance"){
            return <MaintenanceSummaryComp refresh={refresh} />
        }
        else if (graphName === "ActiveAlarm"){
            return <ActiveAlarmSummaryComp refresh={refresh} />
        }
    }



    return (
        <div
            style={{ flex: "1", display:"flex", flexDirection:"column", paddingTop:"10px" }}
        >
            <Box
                display="flex"
                alignItems="center"
                width="100%"
            >
                <Autocomplete
                    disablePortal
                    id="project_name"
                    // options={project.map((option) => option)}
                    options={["Air compressor 1", "Air compressor 2", "Air compressor 3"]}
                    value={currentProject}
                    sx={{ width: 400, margin: "auto", pt: 1 }}
                    renderInput={(params) => <TextField required {...params} label="Air Compressors" />}
                    isOptionEqualToValue={(option, value) => option.label === value}
                    // renderOption={(props, item) => (
                    //     <li {...props} key={item.id}>
                    //     <ListItemText>{item.label}</ListItemText>
                    //     </li>
                    // )}

                    onChange={(event, newValue) => {
                        setCurrentProject(newValue);
                        // changeProject(newValue.label);
                        setRefresh(!refresh);
                    }}

                />
            </Box>
            <div
                style={{ flex: "1", backgroundColor: " #f2f6fa", borderTop: "1px solid #dbdbdb", marginTop:"15px"}}
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
                    <MenuItem onClick={handleMenuItem3Click}>Operator Summary Times</MenuItem>
                    <MenuItem onClick={handleMenuItem4Click}>Current Shift Pass Fail Counts</MenuItem>
                    <MenuItem onClick={handleMenuItem8Click}>Last Shift Pass Fail Counts</MenuItem>
                    <MenuItem onClick={handleMenuItem9Click}>Last Two Shift Pass Fail Counts</MenuItem>
                    <MenuItem onClick={handleMenuItem5Click}>Running Performance</MenuItem>
                    <MenuItem onClick={handleMenuItem6Click}>Maintenance</MenuItem>
                    <MenuItem onClick={handleMenuItem7Click}>Active Alarm</MenuItem>
                </Menu>








                {/* air compressor dashboard */}
                {/* <Box sx={{ height: "12vh", mb: 4, ml: 1, overflow: "auto" }}>
                    <Grid
                        container columns={4} sx={{ height: 0.85, }} justifyContent="center" alignItems="center">
                        <Grid item xs={1} sx={{ height: 0.85, }}>
                            <TemperatureMeter />

                        </Grid>
                        <Grid item xs={1} sx={{ height: 0.85, }}>
                            <AirCompressorMeters />

                        </Grid>
                        <Grid item xs={1} sx={{ height: 0.85, }}>
                            <HumidityMeter />

                        </Grid>
                        <Grid item xs={1} sx={{ height: 0.85, }}>
                            <VoltageMeter />

                        </Grid>
                    </Grid>
                </Box> */}

                <Grid container spacing={3} sx={{ height: 1, p: 3 }}>


                    <Grid
                        item
                        xs={6}
                        sx={{
                            height: "20%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader sx={{height:18}}
                                    title={currentProject}
                                />
                                <CardContent >

                                    <div style={{ display: "flex" }}>
                                        <Box>
                                            <Typography variant="body2" sx={{ color: 'text.secondary', width:280 }}>
                                                Hours Left to Service: 1500 of 2000 hours
                                            </Typography>
                                            <CircularProgressWithLabel variant="determinate" value={25} size={45} />
                                        </Box>

                                        <Divider orientation="vertical" variant="middle" flexItem sx={{m:2}}/>

                                        <Box>
                                            <Chip icon={<StopCircleIcon />} label="Remote Halt: OFF" variant="outlined" sx={{color:"rgb(62, 62, 62)", m:"2px"}} />
                                            <Chip icon={<PlayCircleOutlineIcon />} label="Timer Control: ON" variant="outlined" color="success" sx={{m:"2px"}} />
                                            <Chip icon={<StopCircleIcon />} label="Auto Restart: OFF" variant="outlined" sx={{color:"rgb(62, 62, 62)", m:"2px"}} />
                                            <Chip icon={<AccessTimeIcon />} label="Loaded Hours: 144.0" variant="outlined" color="info" sx={{m:"2px"}} />
                                            <Chip icon={<AccessTimeIcon />} label="Total Run Hours: 164.0" variant="outlined" color="info" sx={{m:"2px"}} />
                                        </Box>

                                    </div>
                                    
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            height: "20%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader sx={{height:18}}
                                    title="Alarms"
                                />
                                <CardContent >

                                    <div style={{ display: "flex" }}>
                                        <Box>
                                            <Typography variant="body1" sx={{ color: 'text.secondary', width: 220 }}>
                                                Active Alarms:
                                            </Typography>

                                            <Chip icon={<AnnouncementIcon />} label="Over Temperature" variant="filled" color="error" sx={{ m: "2px" }} />
                                        </Box>

                                        <Divider orientation="vertical" variant="middle" flexItem sx={{ m: 2 }} />

                                        <Box sx={{display:"flow"}}>
                                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                                Alarm History:
                                            </Typography>

                                            <Chip icon={<AnnouncementIcon />} label="Power Falure Occurred | 2025-03-06 14:05:00" variant="filled" color="info" sx={{ m: "2px" }} />
                                            <Chip icon={<AnnouncementIcon />} label="Alr filier servce required | 2025-03-06 09:30:00" variant="filled" color="info" sx={{ m: "2px" }} />
                                            <Chip icon={<AnnouncementIcon />} label="Oil hlter servce required | 2025-03-05 19:00:00" variant="filled" color="info" sx={{ m: "2px" }} />
                                        </Box>

                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>




                    <Grid
                        item
                        xs={2}
                        sx={{
                            height: "40%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader
                                    title="Temperature"
                                />
                                <CardContent sx={{ height: "70%" }}>

                                    <TemperatureMeter />

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            height: "40%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader
                                    title="Temperature Chart"
                                />
                                <CardContent sx={{ height: "70%" }}>

                                    <TemperatureRecordsChart />

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>

                    <Grid
                        item
                        xs={2}
                        sx={{
                            height: "40%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader
                                    title="Flow"
                                />
                                <CardContent sx={{ height: "70%" }}>

                                    <FlowMeter />

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            height: "40%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader
                                    title="Flow Chart"
                                />
                                <CardContent sx={{ height: "70%" }}>

                                    <FlowRecordsChart />

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>





                    <Grid
                        item
                        xs={2}
                        sx={{
                            height: "40%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader
                                    title="Humidity"
                                />
                                <CardContent sx={{ height: "70%" }}>

                                    <HumidityMeter />

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            height: "40%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader
                                    title="Humidity Chart"
                                />
                                <CardContent sx={{ height: "70%" }}>

                                    <HumidityRecordsChart />

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>

                    <Grid
                        item
                        xs={2}
                        sx={{
                            height: "40%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader
                                    title="Power"
                                />
                                <CardContent sx={{ height: "70%" }}>

                                    <PowerMeter />

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            height: "40%",
                        }}
                    >
                        <div style={{ height: "100%" }}>
                            <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                                <CardHeader
                                    title="Power Chart"
                                />
                                <CardContent sx={{ height: "70%" }}>

                                    <PowerRecordsChart />

                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>



                </Grid>




                






                {/* <Box sx={{ height: "40vh", mb:4}}>
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
                    </Grid>
                    <Grid item xs={1} style={{ textAlign: "center" }}sx={{ height: "40vh",}}>
                        <div style={{display:"flex", justifyContent: "center" }}>
                        <h3>{cookies.summaryPageChoices["Graph2"].header}</h3>
                            <IconButton onClick={(event)=>handleClickOpenMenu(event, "Graph2")} >
                                <ArrowDropDownCircleIcon />
                            </IconButton>
                        </div>
                        { getGraphCompByCookie(cookies.summaryPageChoices["Graph2"].name) }
                    </Grid>
                </Grid>
            </Box>
            
            
            <Box sx={{ height: "35vh", pr:2}}>
                <Grid
                    container spacing={4} columns={4} sx={{ height: "100%"}} >
                    <Grid item xs={1} >
                        <div style={{display:"flex", justifyContent: "center" }}>
                            <h3>{cookies.summaryPageChoices["Graph3"].header}</h3>
                            <IconButton onClick={(event)=>handleClickOpenMenu(event, "Graph3")}>
                                <ArrowDropDownCircleIcon />
                            </IconButton>
                        </div>
                        { getGraphCompByCookie(cookies.summaryPageChoices["Graph3"].name) }
                        
                        
                    </Grid>
                    <Grid item xs={1} >

                        <div style={{display:"flex", justifyContent: "center" }}>
                            <h3>{cookies.summaryPageChoices["Graph4"].header}</h3>
                            <IconButton onClick={(event)=>handleClickOpenMenu(event, "Graph4")}>
                                <ArrowDropDownCircleIcon />
                            </IconButton>
                        </div>
                        { getGraphCompByCookie(cookies.summaryPageChoices["Graph4"].name) }

                    </Grid>


                    <Grid item xs={1}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <h3>{cookies.summaryPageChoices["Graph5"].header}</h3>
                            <IconButton onClick={(event) => handleClickOpenMenu(event, "Graph5")}>
                                <ArrowDropDownCircleIcon />
                            </IconButton>
                        </div>
                        {getGraphCompByCookie(cookies.summaryPageChoices["Graph5"].name)}


                    </Grid>



                    <Grid item xs={1}>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <h3>{cookies.summaryPageChoices["Graph6"].header}</h3>
                            <IconButton onClick={(event) => handleClickOpenMenu(event, "Graph6")}>
                                <ArrowDropDownCircleIcon />
                            </IconButton>
                        </div>
                        {getGraphCompByCookie(cookies.summaryPageChoices["Graph6"].name)}

                    </Grid>


                </Grid>
            </Box> */}

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
        </div>
    );
}