import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Column } from '@ant-design/plots';
import TimeSelectorComp from './TimeSelectorComp';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid from '@mui/material/Grid';
import { AllPagesContext } from '../App';


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



export default function StackBarChartsPage() {

  const [allTagName, setAllTagName] = React.useState([]);
  const [currentTagName, setCurrentTagName] = React.useState("");
  // const [chartTitles, setChartTitles] = React.useState([]);
  const {chartTitles, setChartTitles} = React.useContext(AllPagesContext);

  let aHourAgo = new Date();
  aHourAgo.setHours(aHourAgo.getHours() - 1)
  const [startTime, setStartTime] = React.useState(aHourAgo);
  const [endTime, setEndTime] = React.useState(new Date());

  
  const [baselineValue, setBaselineValue] = React.useState(null);

  
  // const [chartXMin, setChartXMin] = React.useState(0);
  // const [chartXMax, setChartXMax] = React.useState(0);

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


  
  const [confirmButtonDisable, setConfirmButtonDisable] = React.useState(false);


  React.useEffect(() => {

    fetch("/api/MonitorPage/getStationNumberList")
      .then((res) => res.json())
      .then((data) => setAllTagName(data.result));

      
    fetch("/api/MonitorPage/getBaselineValue")
    .then((res) => res.json())
    .then((data) => setBaselineValue(data.baselineValue));


  }, []);



  
  // dynamic charts
  // const [allColumnChartsData, setAllColumnChartsData] = React.useState([]);
  const {allColumnChartsData, setAllColumnChartsData} = React.useContext(AllPagesContext);



  const confirmOnClick = () =>{
    setConfirmButtonDisable(true);

    if (!currentTagName){
      setAlertType("warning");
      setAlertMsg("Please select station.");
      setAlertOpen(true);
      setConfirmButtonDisable(false);
      return;
    }
    else if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())){
      setAlertType("warning");
      setAlertMsg("Please fill date time.");
      setAlertOpen(true);
      setConfirmButtonDisable(false);
      return;
    }
    

    fetch("/api/MonitorPage/getTotalOperationalTimeByStationAndSerial", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "tagName": currentTagName, "start": toLocalIsoString(startTime), "end": toLocalIsoString(endTime) })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        for (const it of data){
          it["getTime"] = new Date(it.dateTime.replace("Z", "")).getTime();
        }
        
        setChartTitles([...chartTitles, currentTagName]);
        setAllColumnChartsData([...allColumnChartsData, data]);
  
        setConfirmButtonDisable(false);
        
      })
      .catch((error) => {
        console.log('Error: Failed query data.');
        console.log(error);
        setAlertMsg("Failed query data.");
        setAlertType("error");
        setAlertOpen(true);
        setConfirmButtonDisable(false);
      });


  }




  const deleteLineChartClick = (index) =>{

    allColumnChartsData.splice(index, 1);
    setAllColumnChartsData([...allColumnChartsData]);
    
    chartTitles.splice(index, 1);
    setChartTitles([...chartTitles]);

  };


  

  // line chart config
  const chartConfig = (inputData) => {
    let annotations = [];
    if (baselineValue){
      annotations = [
        // baseline - Design Cycle
        {
          type: 'text',
          position: ['min', baselineValue],
          content: 'Design Cycle',
          offsetY: -4,
          style: {
            fill: '#F4664A',
            textBaseline: 'bottom',
          },
        },
        {
          type: 'line',
          start: ['min', baselineValue],
          end: ['max', baselineValue],
          style: {
            stroke: '#F4664A',
            lineDash: [2, 2],
          },
        },
      ];
    }
    for (const it of inputData){
      if (it.totalTimeValue){
        annotations.push({
          type: 'dataMarker',
          position: [it.getTime, it.totalTimeValue],
          autoAdjust: false,
          // point : null,
          text: null,
          line: null,
          // line: {
          //   style: { stroke: '#222222', lineWidth: 20, shadowColor: "#ffffff", shadowBlur: 0.5, },
          //   length: 1,
          // },
        });
      }
    }

    return ({
      data: inputData,
      isStack: true,
      // xField: 'dateTime',
      xField: 'getTime',
      yField: 'timeValue',
      seriesField: 'timeFeild',
      xAxis: {
        tickCount: 10,
        tickMethod:"time-cat",
        type: 'linear',
        tickInterval: 11,
        label: {
          formatter: (v) => {
            const date = new Date(Number(v));
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          },
        },
      },
      yAxis: {
        offsetX: -15,
        top: true,
      },
      background: {
        padding: 20,
      },
      color: ({ timeFeild }) => {
        if (timeFeild === 'Input Time') {
          return "#8d32a8";
        }
        else if (timeFeild === 'Output Time') {
          return "#e68f1e";
        }
        else if (timeFeild === 'Machine Time'){
          return "#42a832";
        }
        else if (timeFeild === 'Transfer Time'){
          return "#2d29ab";
        }
        else if (timeFeild === 'Operator Time'){
          return "#edd21f";
        }
        else if (timeFeild === 'FaultTime'){
          return "#d41923";
        }
        else {
          return "#196dd4";
        }
      },
      slider: {
        start: 0,
        // end: 30/(inputData.length/6),
        end: 1,
        formatter: (v) => {
          const date = new Date(Number(v));
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        },
      },
      tooltip: {
        title: (title) => {
          const date = new Date(Number(title));
          const newTitle =  `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          return newTitle;
        },
        customItems: (originalItems) => {
          for (const it of originalItems){
            const date = new Date(Number(it.title));
            const newTitle =  `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            it.title = newTitle;
            if(it.name === "FaultTime"){
              it.value = ""+Math.abs(it.data.timeValue);
            }
          }
          return originalItems;
        },
      },
      label: null,
      annotations,
    })
  };





  return (
    <Box sx={{ width: '100%' }}>
      
      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Stack direction="row" spacing={2} sx={{ml:2}}>
        <Autocomplete
          disablePortal
          id="tag_name"
          options={allTagName}
          // getOptionLabel={(option) => option.customer_names}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField required {...params} label="Station" />}

          onChange={(event, newValue) => {
            // console.log(newValue);
            setCurrentTagName(newValue);
          }}

        />

        
        <Stack direction="row" spacing={2}>
          <TimeSelectorComp startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
          <Button onClick={() => { confirmOnClick(); }} variant="contained" color='info' disabled={confirmButtonDisable} >Confirm</Button>
          <HourglassTopIcon sx={{color:"#666666", pt: 2, display: confirmButtonDisable?'block':'none' }} disabled={confirmButtonDisable}/>
        </Stack>

      </Stack>

      <br/>


      {allColumnChartsData.map((element, index) => {
        return (
          <div key={index} >
            
            <Grid container spacing={1} columns={20} sx={{ p: 1 }} alignItems="center">
              
              <Grid item xs={19}>
                <h2>{chartTitles[index]}</h2>
                {element ? <Column {...chartConfig(element, index)} /> : ""}
              </Grid>

              <Grid item xs={1}>
                <Button sx={{ mt: 1.5 }} onClick={()=>deleteLineChartClick(index)}>
                  <RemoveCircleOutlineIcon />
                </Button>
              </Grid>


            </Grid>
          </div>

        )
      })}



    </Box>
  );
}