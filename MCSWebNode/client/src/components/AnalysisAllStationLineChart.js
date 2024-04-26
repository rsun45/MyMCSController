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

  const [allTagName, setAllTagName] = React.useState([]);
  const [currentTagName, setCurrentTagName] = React.useState("");

  const [startTime, setStartTime] = React.useState(new Date());
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

    fetch("/api/AnalysisPage/getAllTagNames")
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
        for (const it of data){
          it["tag_cont_number"] = Number(it.tag_cont);
          it["category"] = currentTagName;
          it["getTime"] = new Date(it.tag_add_dt.replace("Z", "")).getTime();
        }
        // console.log(data);
        
        if (checkedBoxIndex >= 0){
          allLineChartsData[checkedBoxIndex] = [...allLineChartsData[checkedBoxIndex], ...data];
          setAllLineChartsData([...allLineChartsData]);

        }
        else {
          allLineChartsData.push(data);
          setAllLineChartsData([...allLineChartsData]);
  

        }
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
  const [allLineChartsData, setAllLineChartsData] = React.useState([]);
  const [checkedBoxIndex, setCheckedBoxIndex] = React.useState(-1);



  const onCheckBoxChanged = (event, index) => {
    if (checkedBoxIndex===index){
      setCheckedBoxIndex(-1);
    }
    else {
      setCheckedBoxIndex(index);
    }
  };

  const deleteLineChartClick = (index) =>{

    if (checkedBoxIndex===index){
      setCheckedBoxIndex(-1);
    }
    else if (checkedBoxIndex > index){
      setCheckedBoxIndex(checkedBoxIndex-1);
    }

    allLineChartsData.splice(index, 1);
    setAllLineChartsData([...allLineChartsData]);

  };



  // line chart config
  const lineChartConfig = (inputData) => {
    return ({
      data: inputData,
      // xField: 'tag_add_dt',
      xField: 'getTime',
      yField: 'tag_cont_number',
      seriesField: 'category',
      xAxis: {
        tickMethod:"time-cat",
        type: 'linear',
        tickCount: 10,
        label: {
          // rotate: 0.2,
          formatter: (v) => {
            const date = new Date(Number(v));
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            // return v;
          },
        },
      },
      // yAxis: {
      //   type: 'linear',
      // },
      slider: {
        start: 0,
        end: 1,
        formatter: (v) => {
          const date = new Date(Number(v));
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        },
      },
      tooltip: {
        formatter: (datum) => {
          const date = new Date(Number(datum.getTime));
          let dtStr = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          return { name: dtStr, value: datum.tag_cont_number };
        },
        showTitle:false,
      }

    })
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

        
        <Stack direction="row" spacing={2}>
          <TimeSelectorComp startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
          <Button onClick={() => { confirmOnClick(); }} variant="contained" color='info' disabled={confirmButtonDisable} >Confirm</Button>
          <HourglassTopIcon sx={{color:"#666666", pt: 2, display: confirmButtonDisable?'block':'none' }} disabled={confirmButtonDisable}/>
        </Stack>

      </Stack>

      <br/>


      {allLineChartsData.map((element, index) => {
        return (
          <div key={index} >
            
            <Grid container spacing={1} columns={20} sx={{ pt: 1 }} alignItems="center">
              <Grid item xs={1}>
                <Checkbox
                  checked={checkedBoxIndex===index} 
                  onChange={(event)=>onCheckBoxChanged(event, index)}
                />
              </Grid>

              <Grid item xs={18}>
                {element ? <Line {...lineChartConfig(element)} /> : ""}
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