import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

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


const TimeSelector = ({ data, setData, setLoadingProcess }) => {

  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());


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
      })
      .catch((error) => {
        console.log('Error: Failed query.');
        console.log(error);
        setAlertMsg("Failed query.");
        setAlertType("error");
        setAlertOpen(true);
        setLoadingProcess(false);
      });



  }



  return (
    <div >

      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Stack direction="row" spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
            }}
          />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="End"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
            }}
          />
        </LocalizationProvider>

        <Button onClick={toggleButton} variant="contained" color='info'>Query</Button>
      </Stack>


    </div>
  );
}

export default TimeSelector;
