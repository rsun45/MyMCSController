import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

// return local datetime string in 'YYYY-MM-DD HH:MM:SS' formate
function toLocalIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          return (num < 10 ? '0' : '') + num;
      };

  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      ' ' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds());
}

// return shift start and end datetime string in YYYY-MM-DD HH:MM:SS formate and shift name by passed datetime
function getShiftTimeStrByDate( dateTime ) {
  const currentDateTime = dateTime;
  // morning shift
  if (currentDateTime.getHours() >= 7 && currentDateTime.getHours() < 15){
      return([toLocalIsoString(currentDateTime).split(" ")[0] + " 07:00:00", toLocalIsoString(currentDateTime).split(" ")[0] + " 14:59:59", "Morning"]);
  }
  // afternoon shift
  else if (currentDateTime.getHours() >= 15 && currentDateTime.getHours() < 23){
      return([toLocalIsoString(currentDateTime).split(" ")[0] + " 15:00:00", toLocalIsoString(currentDateTime).split(" ")[0] + " 22:59:59", "Afternoon"]);
  }
  else {
      // current hour is 23
      if (currentDateTime.getHours() >= 23){
          let endDateTime = new Date(currentDateTime.getTime());
          endDateTime.setDate(endDateTime.getDate() + 1);
          return([toLocalIsoString(currentDateTime).split(" ")[0] + " 23:00:00", toLocalIsoString(endDateTime).split(" ")[0] + " 06:59:59", "Night"]);
      }
      // current hour in [0,7)
      else {
          let startDateTime = new Date(currentDateTime.getTime());
          startDateTime.setDate(startDateTime.getDate() - 1);
          return([toLocalIsoString(startDateTime).split(" ")[0] + " 23:00:00", toLocalIsoString(currentDateTime).split(" ")[0] + " 06:59:59", "Night"]);
      }
  }
}


const TimeSelector = ({ data, setData, setLoadingProcess }) => {

  let aHourAgo = new Date();
  aHourAgo.setHours(aHourAgo.getHours() - 1);
  const [startTime, setStartTime] = React.useState(aHourAgo);
  const [endTime, setEndTime] = React.useState(new Date());

  const [queryButtonDisabled, setQueryButtonDisabled] = React.useState(false);
  


  // alart when missing fields
  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const [alertType, setAlertType] = React.useState("warning");
  const [alertMsg, setAlertMsg] = React.useState("");

  const toggleButton = () => {
    setLoadingProcess(true);
    setQueryButtonDisabled(true);
    // console.log(toLocalIsoString(startTime));
    // console.log(toLocalIsoString(endTime));

    fetch("/api/QueryPage/getQueryByDateRange", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "start": toLocalIsoString(startTime), "end": toLocalIsoString(endTime) })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setData(data);
        setAlertMsg("Successful query.");
        setAlertType("success");
        setAlertOpen(true);
        setLoadingProcess(false);
        setQueryButtonDisabled(false);
      })
      .catch((error) => {
        console.log('Error: Failed query.');
        console.log(error);
        setAlertMsg("Failed query.");
        setAlertType("error");
        setAlertOpen(true);
        setLoadingProcess(false);
        setQueryButtonDisabled(false);
      });



  }





  // quick time range menu open state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const quickMenuOpen = Boolean(anchorEl);
  const handleQuickClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenueClose = () => {
    setAnchorEl(null);
  };



  // functions for quick menu time settings
  const lastHourClick = (hoursToMinus) => {
    let currentD = new Date();
    let lastD = new Date();
    lastD.setHours(lastD.getHours() - hoursToMinus);
    setEndTime(currentD);
    setStartTime(lastD);
  };

  const shiftsClick = (shiftName) => {
    if (shiftName==="currentShift"){
      let td = new Date();
      const DTRange = getShiftTimeStrByDate(td);
      setEndTime(new Date(DTRange[1]));
      setStartTime(new Date(DTRange[0]));
    }
    else if (shiftName==="lastShift"){
      let td = new Date();
      td.setHours(td.getHours() - 8);
      const DTRange = getShiftTimeStrByDate(td);
      setEndTime(new Date(DTRange[1]));
      setStartTime(new Date(DTRange[0]));
    }

  };

  const dayUnitClick = (dayName) => {
    if (dayName==="currentDay"){
      let td = new Date();
      const DTRange = [toLocalIsoString(td).split(" ")[0] + " 00:00:00", toLocalIsoString(td).split(" ")[0] + " 23:59:59"];
      setEndTime(new Date(DTRange[1]));
      setStartTime(new Date(DTRange[0]));
    }
    else if (dayName==="lastDay"){
      let td = new Date();
      td.setHours(td.getHours() - 24);
      const DTRange = [toLocalIsoString(td).split(" ")[0] + " 00:00:00", toLocalIsoString(td).split(" ")[0] + " 23:59:59"];
      setEndTime(new Date(DTRange[1]));
      setStartTime(new Date(DTRange[0]));
    }
  };




  return (
    <div >

      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Stack direction="row" spacing={2} sx={{pl:2}}>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
            }}
          />
          <DesktopDateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="End"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
            }}
          />
        </LocalizationProvider> */}

        <TextField
          id="datetime-local-start"
          label="Start"
          type="datetime-local"
          // defaultValue="2017-05-24T10:30"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          value={toLocalIsoString(startTime)}
          onChange={(event) => {
            setStartTime(new Date(event.target.value));
          }}
        />
        <TextField
          id="datetime-local-end"
          label="End"
          type="datetime-local"
          // defaultValue="2017-05-24T10:30"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          value={toLocalIsoString(endTime)}
          onChange={(event) => {
            setEndTime(new Date(event.target.value));
          }}
        />

        <Button
          id="quick-button"
          aria-controls={quickMenuOpen ? 'quick-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={quickMenuOpen ? 'true' : undefined}
          onClick={handleQuickClick}
          variant="contained"
          color="secondary"
          sx={{width:"100px"}}
        >
          Quick
        </Button>

        <Button onClick={toggleButton} variant="contained" color='info' disabled={queryButtonDisabled} sx={{width:"100px"}}>Confirm</Button>
      </Stack>


      
      <Menu
        id="quick-menu"
        anchorEl={anchorEl}
        open={quickMenuOpen}
        onClose={handleMenueClose}
        MenuListProps={{
          'aria-labelledby': 'quick-button',
        }}
      >
        <MenuItem onClick={()=>lastHourClick(1)}>Last Hour</MenuItem>
        <MenuItem onClick={()=>lastHourClick(8)}>Last 8 Hours</MenuItem>
        <Divider />
        <MenuItem onClick={()=>shiftsClick("currentShift")}>Current Shift</MenuItem> 
        <MenuItem onClick={()=>shiftsClick("lastShift")}>Last Shift</MenuItem>
        <Divider />
        <MenuItem onClick={()=>dayUnitClick("currentDay")}>Current Day</MenuItem>
        <MenuItem onClick={()=>dayUnitClick("lastDay")}>Last Day</MenuItem>
      </Menu>


    </div>
  );
}

export default TimeSelector;
