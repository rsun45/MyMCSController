import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Line } from '@ant-design/plots';
import TimeSelectorComp from './TimeSelectorComp';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Checkbox from '@mui/material/Checkbox';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid from '@mui/material/Grid';
import { AllPagesContext } from '../App';
import { Histogram } from '@ant-design/plots';


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



export default function QualityGraphComp( { lowLimit, highLimit, data }) {
  console.log(data);

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



  // convert data
  const [low, setLow] = React.useState(lowLimit);
  const [high, setHigh] = React.useState(highLimit);
  // calculate mean
  let total = 0;
  for (const it of data){
    total += it.tag_cont_number;
  }
  const [mean, setMean] = React.useState(total/data.length);



  // chart config
  const chartConfig = () => {
    // keep min and max value for calculating interval
    let maxV = data[0].tag_cont_number;
    let minV = data[0].tag_cont_number;

    for (const it of data){
      if (minV > it.tag_cont_number){
        minV = it.tag_cont_number;
      }
      if (maxV < it.tag_cont_number){
        maxV = it.tag_cont_number;
      }
    }

    // low and high lines
    // let annotations = [
    //   {
    //     type: 'line',
    //     start: ['min', 'median'],
    //     end: ['max', 'median'],
    //     style: {
    //       stroke: '#F4664A',
    //       lineWidth: 3,
    //       lineDash: [10, 2],
    //       shadowColor: "white",
    //       shadowBlur: 5,
    //     },
    //   },
    // ];


    return ({
      data: data,
      binField: 'tag_cont_number',
      binWidth: (maxV-minV)/15,
      // annotations,

    })
  };





  return (
    <Box sx={{ width: '100%' }}>
      
      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <h2>{data?data[0].tagTitle:""}</h2>

      <Histogram {...chartConfig()} />

    </Box>
  );
}