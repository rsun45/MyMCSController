import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Line } from '@ant-design/plots';


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



export default function AnalysisAllStationLineChart() {

  const [data, setData] = React.useState(null);
  const [allTagName, setAllTagName] = React.useState([]);
  const [currentTagName, setCurrentTagName] = React.useState("");

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



  React.useEffect(() => {

    fetch("/api/AnalysisPage/getAllTagNames")
      .then((res) => res.json())
      .then((data) => setAllTagName(data));


  }, []);


  const confirmOnClick = () =>{
    if (!currentTagName){
      setAlertType("warning");
      setAlertMsg("Please select tag name.");
      setAlertOpen(true);
      return;
    }

    fetch("/api/AnalysisPage/getDataAndTimeByTagName", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "tagName": currentTagName, "start": toLocalIsoString(startTime), "end": toLocalIsoString(endTime) })
    })
      .then((res) => res.json())
      .then((data) => {
        for (const it of data){
          it["tag_cont_number"] = Number(it.tag_cont);
        }
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log('Error: Failed query data.');
        console.log(error);
        setAlertMsg("Failed query data.");
        setAlertType("error");
        setAlertOpen(true);
      });


  }


  // line chart config
  const lineChartConfig = {
    data: data,
    xField: 'tag_add_dt',
    yField: 'tag_cont_number',
    xAxis: {
      // type: 'dateTime',
      tickCount: 10,
      // label: {
      //   rotate: 0.2,
      // },
    },
    // yAxis: {
    //     min: minNum,
    // },
    slider: {
      start: 0,
      end: 1,
    },
      
    // },
  };





  return (
    <Box sx={{ width: '100%' }}>
      
      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Stack direction="row" spacing={2}>
        <Autocomplete
          disablePortal
          id="tag_name"
          options={allTagName.map((option) => option.tagName)}
          // getOptionLabel={(option) => option.customer_names}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField required {...params} label="Tag Name" />}

          onChange={(event, newValue) => {
            // console.log(newValue);
            setCurrentTagName(newValue);
          }}

        />
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

        <Button onClick={()=>{confirmOnClick();}} variant="contained" color='info'>Confirm</Button>
      </Stack>

      <br/>

      {data?<Line {...lineChartConfig} />:""}


    </Box>
  );
}