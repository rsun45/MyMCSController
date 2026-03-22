import Box from '@mui/material/Box';
import * as React from 'react';
// import Graph from './Graph';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import { CookiesProvider, useCookies } from 'react-cookie';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Timeline from "react-calendar-timeline";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DeleteIcon from '@mui/icons-material/Delete';



export default function ScheduleSetupRunning() {

    const groups = [{ id: 1, title: 'Air Compressor 1' }, { id: 2, title: 'Air Compressor 2' }, { id: 3, title: 'Air Compressor 3' }, { id: 4, title: 'Air Compressor 4' }]

    // gantt chart data
    const [ganttData, setGanttData] = React.useState([
        {
            id: 1,  
            group: 1,
            start_time: new Date("2025-03-08T08:00:00"),
            end_time: new Date("2025-04-07T20:00:00"),
            title: "Air Compressor 1",
            itemProps: {
                style: {
                    background: 'rgb(70, 173, 106)'
                }
            }
          },
        
          // Air Compressor 2 的任务（group: 2）
          {
            id: 3,
            group: 2,
            start_time: new Date("2025-03-08T08:00:00"),
            end_time: new Date("2025-03-11T08:00:00"),
            title: "Air Compressor 2",
            itemProps: {
                style: { backgroundColor: "rgb(74, 104, 184)" }
            }
          },
          {
            id: 4,
            group: 2,
            start_time: new Date("2025-03-17T08:00:00"),
            end_time: new Date("2025-03-20T08:00:00"),
            title: "Air Compressor 2",
            itemProps: {
                style: { backgroundColor: "rgb(74, 104, 184)" }
            }
          },
          {
            id: 5,
            group: 2,
            start_time: new Date("2025-03-26T08:00:00"),
            end_time: new Date("2025-03-29T08:00:00"),
            title: "Air Compressor 2",
            itemProps: {
                style: { backgroundColor: "rgb(74, 104, 184)" }
            }
          },
          {
            id: 6,
            group: 2,
            start_time: new Date("2025-04-04T08:00:00"),
            end_time: new Date("2025-04-07T08:00:00"),
            title: "Air Compressor 2",
            itemProps: {
                style: { backgroundColor: "rgb(74, 104, 184)" }
            }
          },
        
          // Air Compressor 3 的任务（group: 3）
          {
            id: 7,
            group: 3,
            start_time: new Date("2025-03-11T08:00:00"),
            end_time: new Date("2025-03-14T08:00:00"),
            title: "Air Compressor 3",
            itemProps: {
                style: { backgroundColor: "rgb(174, 81, 197)" }
            }
          },
          {
            id: 8,
            group: 3,
            start_time: new Date("2025-03-20T08:00:00"),
            end_time: new Date("2025-03-23T08:00:00"),
            title: "Air Compressor 3",
            itemProps: {
                style: { backgroundColor: "rgb(174, 81, 197)" }
            }
          },
          {
            id: 9,
            group: 3,
            start_time: new Date("2025-03-29T08:00:00"),
            end_time: new Date("2025-04-01T08:00:00"),
            title: "Air Compressor 3",
            itemProps: {
                style: { backgroundColor: "rgb(174, 81, 197)" }
            }
          },
        
          // Air Compressor 4 的任务（group: 4）
          {
            id: 10,
            group: 4,
            start_time: new Date("2025-03-14T08:00:00"),
            end_time: new Date("2025-03-17T08:00:00"),
            title: "Air Compressor 4",
            itemProps: {
                style: { backgroundColor: "rgb(198, 155, 82)" }
            }
          },
          {
            id: 11,
            group: 4,
            start_time: new Date("2025-03-23T08:00:00"),
            end_time: new Date("2025-03-26T08:00:00"),
            title: "Air Compressor 4",
            itemProps: {
                style: { backgroundColor: "rgb(198, 155, 82)" }
            }
          },
          {
            id: 12,
            group: 4,
            start_time: new Date("2025-04-01T08:00:00"),
            end_time: new Date("2025-04-04T08:00:00"),
            title: "Air Compressor 4",
            itemProps: {
                style: { backgroundColor: "rgb(198, 155, 82)" }
            }
          }


    ]);


    // get all project names
    React.useEffect(() => {



    }, []);




    return (
        <div
            style={{ flex: "1", display: "flex", flexDirection: "column", backgroundColor: " #f2f6fa", }}
        >


            <Grid container spacing={3} sx={{ height: 1, p: 3 }}>


                <Grid
                    item
                    xs={12}
                    sx={{
                        height: "30%",
                    }}
                >
                    <div style={{ height: "100%" }}>
                        <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                            <CardHeader sx={{ height: 18 }}
                                title={"Schedule Chart"}
                            />
                            <CardContent >

                                <Timeline
                                    groups={groups}
                                    items={ganttData}
                                    defaultTimeStart={new Date(2025, 2, 1)}  // 2025年3月1日
                                    defaultTimeEnd={new Date(2025, 4, 1)}     // 2025年5月1日
                                    canMove={false}                           // 禁止拖拽
                                    canResize={false}                         // 禁止调整长度
                                />

                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={3}
                    sx={{
                        height: "70%",
                    }}
                >
                    <div style={{ height: "100%" }}>
                        <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                            <CardHeader sx={{ height: 18 }}
                                title="Select Air Compressor"
                            />
                            <CardContent >
                                <Stack spacing={2}>
                                    <Button variant="contained" sx={{backgroundColor:"rgb(70, 173, 106)", '&:hover': {backgroundColor: 'rgb(30, 112, 59)'},}} >Air Compressor 1</Button>
                                    <Button variant="contained" sx={{backgroundColor:"rgb(74, 104, 184)", '&:hover': {backgroundColor: 'rgb(32, 55, 118)'},}} disabled >Air Compressor 2</Button>
                                    <Button variant="contained" sx={{backgroundColor:"rgb(174, 81, 197)", '&:hover': {backgroundColor: 'rgb(87, 30, 101)'},}}>Air Compressor 3</Button>
                                    <Button variant="contained" sx={{backgroundColor:"rgb(198, 155, 82)", '&:hover': {backgroundColor: 'rgb(113, 83, 32)'},}}>Air Compressor 4</Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={3}
                    sx={{
                        height: "70%",
                    }}
                >
                    <div style={{ height: "100%" }}>
                        <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                            <CardHeader sx={{ height: 18 }}
                                title="Status"
                            />
                            <CardContent >

                                <Stack spacing={2} sx={{ alignItems: 'center' }}>

                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{ width: 180 }}>
                                            Machine status:
                                        </Typography>
                                        <TextField
                                            id="machine-status"
                                            defaultValue="ON"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Stack>

                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{width:180}}>
                                            Total hours of schedule:
                                        </Typography>
                                        <TextField
                                            id="total-hours-of-schedule"
                                            defaultValue="288 Hours"
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                    </Stack>

                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{width:180}}>
                                            Total hours of current month:
                                        </Typography>
                                        <TextField
                                            id="total-hours-of-current-month"
                                            defaultValue="216 Hours"
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                    </Stack>

                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{width:180}}>
                                            Continuous running time:
                                        </Typography>
                                        <TextField
                                            id="continuous-running-time"
                                            defaultValue="36 Hours"
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                    </Stack>

                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{width:180}}>
                                            Next start time:
                                        </Typography>
                                        <TextField
                                            id="next-start-dt"
                                            defaultValue="2025-03-17 08:00:00"
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                    </Stack>
                                    
                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{width:180}}>
                                            Next stop time:
                                        </Typography>
                                        <TextField
                                            id="next-stop-dt"
                                            defaultValue="2025-03-11 08:00:00"
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                    </Stack>

                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{width:180}}>
                                            Final stop time:
                                        </Typography>
                                        <TextField
                                            id="final-stop-dt"
                                            defaultValue="2025-04-07 08:00:00"
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                    </Stack>


                                </Stack>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>



                <Grid
                    item
                    xs={6}
                    sx={{
                        height: "70%",
                    }}
                >
                    <div style={{ height: "100%" }}>
                        <Card sx={{ height: 1, borderRadius: 4, overflow: "auto" }}>
                            <CardHeader
                                title="Schedules"
                            />
                            <CardContent sx={{ height: "70%" }}>
                                <Stack spacing={2} sx={{ alignItems: 'start', alignItems: 'center', pb:2 }} direction="row" >
                                    <Typography variant="body1" sx={{ width: 180 }}>
                                        Select work range:
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DateTimePicker label="Start time" />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DateTimePicker label="Stop time" />
                                    </LocalizationProvider>

                                    <Button variant="contained">Add To Schedule</Button>


                                </Stack>
                                <Divider />

                                <Box sx={{
                                    p: 2,
                                    display: 'flex',
                                    gap: 1,
                                    flexWrap: 'wrap' 
                                }}
                                >
                                    <Chip icon={<ScheduleIcon />} label="2025-03-08 08:00:00 - 2025-03-11 08:00:00" variant="outlined" color="info" onDelete={{}} />
                                    <Chip icon={<ScheduleIcon />} label="2025-03-17 08:00:00 - 2025-03-20 08:00:00" variant="outlined" color="info" onDelete={{}} />
                                    <Chip icon={<ScheduleIcon />} label="2025-03-26 08:00:00 - 2025-03-29 08:00:00" variant="outlined" color="info" onDelete={{}} />
                                    <Chip icon={<ScheduleIcon />} label="2025-04-04 08:00:00 - 2025-04-07 08:00:00" variant="outlined" color="info" onDelete={{}} />
                                </Box>

                            </CardContent>
                        </Card>
                    </div>
                </Grid>



            </Grid>



        </div>
    );
}