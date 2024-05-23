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
import { QualityGraphComp } from './QualityGraphComp';


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



export default function QualityPage() {

  const [allTagName, setAllTagName] = React.useState([]);
  const [currentTagName, setCurrentTagName] = React.useState("");

  let aHourAgo = new Date();
  aHourAgo.setHours(aHourAgo.getHours() - 1)
  const [startTime, setStartTime] = React.useState(aHourAgo);
  const [endTime, setEndTime] = React.useState(new Date());

  
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

    fetch("/api/QualityPage/getValueTagTitle")
      .then((res) => res.json())
      .then((data) => setAllTagName(data));


  }, []);


  const confirmOnClick = () =>{
    setConfirmButtonDisable(true);

    if (!currentTagName){
      setAlertType("warning");
      setAlertMsg("Please select tag name.");
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
    

    fetch("/api/AnalysisPage/getDataAndTimeByTagName", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "tagName": currentTagName, "start": toLocalIsoString(startTime), "end": toLocalIsoString(endTime) })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          let sum = 0;
          for (const it of data) {
            sum += Number(it.tag_cont);
          }
          const average = sum / data.length;

          for (const it of data) {
            it["tag_cont_number"] = Number(it.tag_cont);
            it["category"] = currentTagName;
            it["getTime"] = new Date(it.tag_add_dt.replace("Z", "")).getTime();
            it["diffByAverage"] = Number(it.tag_cont) - average;
          }
        }
        
        // if (data.length > 0) {
        //   for (const it of data) {
        //     it["tag_cont_number"] = Number(it.tag_cont);
        //   }
        // }
        // console.log(data);
        
        allQualityChartsData.push(data);
        setAllQualityChartsData([...allQualityChartsData]);
  
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



  // dynamic line charts
  // const [allQualityChartsData, setAllQualityChartsData] = React.useState([]);
  const {allQualityChartsData, setAllQualityChartsData} = React.useContext(AllPagesContext);




  const deleteLineChartClick = (index) =>{


    allQualityChartsData.splice(index, 1);
    setAllQualityChartsData([...allQualityChartsData]);

  };



  // line chart config
  const chartConfig = (inputData) => {
    let maxDiff = Math.abs(inputData[0]?.diffByAverage);
    for (const it of inputData){
      if (maxDiff < Math.abs(it.diffByAverage)){
        maxDiff = Math.abs(it.diffByAverage);
      }
    }


    return ({
      data: inputData,
      
      binField: 'diffByAverage',
      binWidth: maxDiff/10,

    })
  };





  return (
    <Box sx={{ width: '100%' }}>
      
      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Stack direction="row" spacing={2} sx={{pl:2}}>
        <Autocomplete
          disablePortal
          id="tag_name"
          options={allTagName.map((option) => option.tagTitle)}
          // getOptionLabel={(option) => option.customer_names}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField required {...params} label="Tag Name" />}

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


      {allQualityChartsData.map((element, index) => {
        return (
          <div key={index} >
            
            <Grid container spacing={1} columns={20} sx={{ pt: 1, ml:2 }} alignItems="center">

              <Grid item xs={18}>
                {element ? <Histogram {...chartConfig(element)} /> : ""}
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