import * as React from 'react';
import { DataGrid, 
         GridToolbarDensitySelector,
         GridToolbarContainer, 
         GridToolbarExport,
         GridToolbarColumnsButton,
         GridToolbarFilterButton,
       } from '@mui/x-data-grid';

import TimeSelectorComp from './TimeSelectorComp';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
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


export default function AlarmPage() {
  
  // grid rows
  // const [queryPagedata, setQueryPagedata] = React.useState(null);
  const {alarmGridData, setAlarmGridData} = React.useContext(AllPagesContext);
  // confirm button click ability
  const [confirmButtonDisable, setConfirmButtonDisable] = React.useState(false);
  // alart
  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const [alertType, setAlertType] = React.useState("warning");
  const [alertMsg, setAlertMsg] = React.useState("");


  
  let aHourAgo = new Date();
  aHourAgo.setHours(aHourAgo.getHours() - 1)
  const [startTime, setStartTime] = React.useState(aHourAgo);
  const [endTime, setEndTime] = React.useState(new Date());


  
  const confirmOnClick = () =>{
    setConfirmButtonDisable(true);
    setLoadingProcess(true);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())){
      setAlertType("warning");
      setAlertMsg("Please fill date time.");
      setAlertOpen(true);
      setConfirmButtonDisable(false);
      return;
    }
    

    fetch("/api/AlarmPage/getAlarmHistory", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "start": toLocalIsoString(startTime), "end": toLocalIsoString(endTime) })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAlarmGridData(data);
        setLoadingProcess(false);
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




  // alarm grid 
  const [loadingProcess, setLoadingProcess] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(100);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        {/* <GridToolbarDensitySelector /> */}
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  //表头
  const columns = [
    {
      field: 'AlarmType',
      headerName: 'Alarm Type',
      width: 250,
      editable: false,
    }, {
      field: 'AlarmName',
      headerName: 'Alarm Name',
      width: 250,
      editable: false,
    }, {
      field: 'TagDescription',
      headerName: 'Tag Description',
      width: 300,
      editable: false,
    }, {
      field: 'Occurrences',
      headerName: 'Occurrences',
      width: 150,
      editable: false,
    }, {
      field: 'TotalDuration',
      headerName: 'Total Duration',
      width: 150,
      editable: false,
    }, 

  ];



  return (

    /* 数据表格部分 */
    <div style={{ width: '100%'}}>
      
      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Stack direction="row" spacing={2} sx={{pl:2}}>

        <Stack direction="row" spacing={2}>
          <TimeSelectorComp startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
          <Button onClick={() => { confirmOnClick(); }} variant="contained" color='info' disabled={confirmButtonDisable} >Confirm</Button>
        </Stack>

      </Stack>

      <br />

      <div style={{ padding:"16px"}}>
        <DataGrid
          rows={alarmGridData}
          columns={columns}
          density="compact"
          autoHeight
          // Tool Bar
          components={{
            Toolbar: CustomToolbar,
          }}
          slots={{
            // toolbar: CustomToolbar,
            loadingOverlay: LinearProgress,
          }}
          loading={loadingProcess}
          //分页
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 100]}
          pagination

          // checkboxSelection
          disableSelectionOnClick

        />
      </div>




    </div>

  );
  
}

