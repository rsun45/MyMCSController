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



export default function QualityGraphComp( { lowLimit, highLimit, data, modifyLowerOrUpperByIndex, index }) {
  // console.log(data);

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



  
  // calculate mean
  let total = 0;
  for (const it of data){
    total += it.tag_cont_number;
  }
  const [mean, setMean] = React.useState(total/data.length);

  const getCPK = (l, u, m, data) =>{
    if (l==="" || u==="" || m===""){
      return "NA";
    }
    l = Number(l);
    u = Number(u);
    m = Number(m);
    if (isNaN(l) || isNaN(u) || isNaN(m)){
      return "NA";
    }

    let sqrSum = 0;
    for (const it of data){
      sqrSum += (it.tag_cont_number - m)*(it.tag_cont_number - m)
    }
    const sd = Math.sqrt(sqrSum/data.length)

    return Math.round( Math.min((u-m)/(3*sd), (m-l)/(3*sd)) *10000)/10000 ;

  };



  // chart config
  const chartConfig = () => {
    // console.log(data);
    // keep min and max value for calculating interval
    // let maxV = data[0].tag_cont_number;
    // let minV = data[0].tag_cont_number;

    // for (const it of data){
    //   if (minV > it.tag_cont_number){
    //     minV = it.tag_cont_number;
    //   }
    //   if (maxV < it.tag_cont_number){
    //     maxV = it.tag_cont_number;
    //   }
    // }

    // low and high lines
    const annotations = [
      // {
      //   type: 'line',
      //   start: [0, 0],
      //   end: [13, 0],
      //   style: {
      //     stroke: '#F4664A',
      //     lineWidth: 3,
      //     lineDash: [10, 2],
      //     shadowColor: "white",
      //     shadowBlur: 5,
      //   },
      // },
      {
        type: 'text',
        position: [1, 1],
        content: '辅助文本',
        style: {
          fill: 'red',
        },
        top:true
      }
    ];


    return ({
      data: data,
      binField: 'tag_cont_number',
      // binWidth: (maxV-minV)/15,
      // channel: 'count',
      binNumber: 15,
      xAxis: {
        label: {
          // rotate: 0.2,
          formatter: (v) => {
            const round5 = Math.round(Number(v)*100000)/100000;
            return `${round5}`;
            // return v;
          },
        },
      },

    })
  };




  return (
    <Box sx={{ width: '100%' }}>
      
      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <h2>{data ? data[0].tagTitle : ""}</h2>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField variant="outlined" value={lowLimit}
            label="Lower Limit"
            
            onChange={(event)=>{modifyLowerOrUpperByIndex(event.target.value, "lower", index);}}
            />

        </Grid>
        <Grid item xs={3}>
          <TextField variant="outlined" value={highLimit}
            label="Upper Limit"
            
            onChange={(event)=>{modifyLowerOrUpperByIndex(event.target.value, "upper", index);}}
            />
        </Grid>
        <Grid item xs={3}>
          <TextField variant="outlined" value={Math.round(mean*10000)/10000}
            label="Mean Value"
            InputProps={{
              readOnly: true,
            }} />
        </Grid>
        <Grid item xs={3}>
          <TextField variant="outlined" value={getCPK(lowLimit, highLimit, mean, data)}
            label="CPK Value"
            InputProps={{
              readOnly: true,
            }} />
        </Grid>
      </Grid>

      <br />

      <Histogram {...chartConfig()} />

    </Box>
  );
}