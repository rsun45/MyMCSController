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
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

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


  
  // force to refresh
  const [refresh, setRefresh] = React.useState(true);
  // refresh timer
  const [refreshTimer, setRefreshTimer] = React.useState(0);
  // refresh alarm activity
  React.useEffect(() => {

    // get all lines names and refresh time
    const getAllProjectNames = async () => {
      fetch("/api/GetAllLinesNames")
      .then((res) => res.json())
      .then((data) => {
        setRefreshTimer(Number(data.refreshTimer));
      });
    }
    getAllProjectNames();


  }, []);
  // when got refresh timer
  React.useEffect(() => {

    if (refreshTimer > 0) {
      const reloadData = () => {
        console.log("reload in " + refreshTimer);
        setRefresh(refresh => {
          return !refresh;
        });

      };

      const intervalId = setInterval(() => {
        reloadData();
      }, refreshTimer);

      return () => clearInterval(intervalId);
    }

  }, [refreshTimer]);




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
      cellClassName: 'button-layout',
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
    }, {
      field: 'TotalDuration',
      headerName: 'Total Duration',
      width: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
    }, 

  ];

  //表头
  const activeAlarmColumns = [
    {
      field: 'ControllerIP',
      headerName: 'Controller IP',
      width: 250,
      editable: false,
    }, {
      field: 'TagName',
      headerName: 'Tag Name',
      width: 250,
      editable: false,
    }, {
      field: 'TagDescription',
      headerName: 'Tag Description',
      width: 300,
      editable: false,
    }, {
      field: 'EventTime',
      headerName: 'Event Time',
      width: 200,
      editable: false,
      type: 'dateTime',
    }, {
      field: 'TotalDuration',
      headerName: 'Total Duration (Minutes)',
      width: 200,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
    }, 

  ];



  // get active alarm
  const [alarmActivityContent, setAlarmActivityContent] = React.useState([]);
  React.useEffect( () => {
    const fetchData = async () => { fetch("/api/AlarmPage/getAlarmActivityForWeb")                            
      .then((res) => res.json())                  
      .then((data) => {
        // console.log(data.alarmContent);
        setAlarmActivityContent([...data.alarmContent]);
        
      });    
    }
    
    fetchData();
        
  }, [refresh]);


  // active alarm switch
  const [isActiveAlarmHidden, setisActiveAlarmHidden] = React.useState("hidden");
  const [isActiveHistoryHidden, setisActiveHistoryHidden] = React.useState("visible");
  
  const [activeAlarmButtonName, setActiveAlarmButtonName] = React.useState("Active Alarm");
  const [activeAlarmButtonColor, setActiveAlarmButtonColor] = React.useState("#ed5551");

  const clickActiveAlarmButton = () =>{
    if (isActiveAlarmHidden === "hidden"){
      setisActiveAlarmHidden("visible");
      setisActiveHistoryHidden("hidden");
      setActiveAlarmButtonName("History");
      setActiveAlarmButtonColor("#ba0202");
    }
    else {
      setisActiveAlarmHidden("hidden");
      setisActiveHistoryHidden("visible");
      setActiveAlarmButtonName("Active Alarm");
      setActiveAlarmButtonColor("#ed5551");
    }
  }



  // occurrence detail dialog
  const [occurrenceDialogOpen, setOccurrenceDialogOpen] = React.useState(false);
  const handleOccurrenceDialogClose = () => {
    setOccurrenceDialogOpen(false);
  };




  return (

    /* 数据表格部分 */
    <div style={{ width: '100%' }}>

      <Dialog onClose={handleOccurrenceDialogClose} open={occurrenceDialogOpen} fullWidth maxWidth="xl">
        <DialogTitle>Occurrence Detail</DialogTitle>
        <Box sx={{ height: 400, p: 3 }}>
          <p>Coming soon.</p>
        </Box>
        <DialogActions>
          <Button onClick={handleOccurrenceDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <Stack direction="row" spacing={2} sx={{pl:2}}>
        <div style={{ padding:"16px", visibility: isActiveHistoryHidden}} > 
          <Stack direction="row" spacing={2}>
            <TimeSelectorComp startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
            <Button onClick={() => { confirmOnClick(); }} variant="contained" color='info' disabled={confirmButtonDisable} >Confirm</Button>
          </Stack>
        </div>

        <Divider orientation="vertical" variant="middle" flexItem />

        <div style={{ paddingTop:"16px", paddingLeft: "20px"}} >
          <Button sx={{height:"56px", width:"160px", backgroundColor: activeAlarmButtonColor, '&:hover': {backgroundColor: '#7d3836'}}} onClick={() => { clickActiveAlarmButton(); }} variant="contained" >{activeAlarmButtonName}</Button>
        </div>

      </Stack>

      <br />

      <div style={{ padding: "16px" }} hidden={isActiveHistoryHidden === "hidden"} >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 200,
          }}
        >

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 200,
            }}
            sx={{
              '& .button-layout': {
                backgroundColor: '#fcdad4',
                color: '#000000',
                fontWeight: '500',
                borderRadius: '5px',
                boxShadow: 2,
                '&:hover': { backgroundColor: '#fac1b6' },
              },
            }}
          >
            <DataGrid
              rows={alarmGridData}
              columns={columns}
              density="compact"
              // autoHeight
              // Tool Bar
              // components={{
              //   Toolbar: CustomToolbar,
              // }}
              slots={{
                toolbar: CustomToolbar,
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

              // click event, show fault time detail
              onCellClick={
                (params) => {
                  // console.log(params);
                  if (params.field === "Occurrences") {

                    setOccurrenceDialogOpen(true);

                  }
                }
              }

            />
          </Box>
        </div>
      </div>

      <div style={{ padding: "8px", margin: "8px" }} hidden={isActiveAlarmHidden === "hidden"} >


        <DataGrid
          rows={alarmActivityContent}
          columns={activeAlarmColumns}
          density="compact"
          // autoHeight
          // Tool Bar
          // components={{
          //   Toolbar: CustomToolbar,
          // }}
          slots={{
            toolbar: CustomToolbar,
          }}
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

