import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TimeSelectorComp from './TimeSelectorComp';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, 
         GridToolbarDensitySelector,
         GridToolbarContainer, 
         GridToolbarExport,
         GridToolbarColumnsButton,
         GridToolbarFilterButton,
       } from '@mui/x-data-grid';
import { AllPagesContext } from '../App';
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



export default function OperatorTimePage() {

  const [allTagName, setAllTagName] = React.useState([]);
  // const [chartTitles, setChartTitles] = React.useState([]);
  const {operatorTableTitle, setOperatorTableTitle} = React.useContext(AllPagesContext);

  let aHourAgo = new Date();
  aHourAgo.setHours(aHourAgo.getHours() - 1)
  const [startTime, setStartTime] = React.useState(aHourAgo);
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


  
  const [confirmButtonDisable, setConfirmButtonDisable] = React.useState(false);

  
  const [loadingProcess, setLoadingProcess] = React.useState(false);


  React.useEffect(() => {

    fetch("/api/MonitorPage/getStationNumberList")
      .then((res) => res.json())
      .then((data) => setAllTagName(data.result));

    


  }, []);



  
  // dynamic charts
  const {operatorTimeData, setOperatorTimeData} = React.useContext(AllPagesContext);



  const confirmOnClick = () =>{
    setConfirmButtonDisable(true);
    setLoadingProcess(true);

    if (!operatorTableTitle){
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
    

    fetch("/api/OperatorPage/getOperatorDataByTimeAndName", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "tagName": operatorTableTitle, "start": toLocalIsoString(startTime), "end": toLocalIsoString(endTime) })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        
        setOperatorTimeData([...data]);
  
        setConfirmButtonDisable(false);
        setLoadingProcess(false);
        
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





  // get fault time detail

  // fault time detail chart data
  const [faultTimeDetail, setFaultTimeDetail] = React.useState([]);


  // fault time detail fetch api
  const getFaultTimedetail = (serialNumberStr, endDateTimeStr) =>{

    // find last serial number row
    for (let i = 0; i < operatorTimeData.length; i++){
      if (operatorTimeData[i].serial_number === serialNumberStr && i > 0){
        const startDT = operatorTimeData[i-1].ExactTime.replace('T', ' ').split('Z')[0];
        const endDT = endDateTimeStr.replace('T', ' ').split('Z')[0];

        fetch("/api/OperatorPage/getFaultTimeDetailByTimes", {
          method: "POST",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({ "start": startDT, "end": endDT })
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);

            if (data.length === 0){
              setAlertMsg("Cell stop request.");
              setAlertType("info");
              setAlertOpen(true);
              setConfirmButtonDisable(false);
            }
            else {
              setAlertMsg("Fault time details are displaying.");
              setAlertType("success");
              setAlertOpen(true);
              setConfirmButtonDisable(false);
            }
            
            setFaultTimeDetail([...data]);
      
            
          })
          .catch((error) => {
            console.log('Error: Failed query fault time detail.');
            console.log(error);
            setAlertMsg("Failed query fault time detail.");
            setAlertType("error");
            setAlertOpen(true);
            setConfirmButtonDisable(false);
          });

        break;
      }
      else if (operatorTimeData[i].serial_number === serialNumberStr && i === 0){
        // no detail
        setAlertMsg("Cell stop request.");
        setAlertType("info");
        setAlertOpen(true);
        setConfirmButtonDisable(false);
        break;
      }

    }


  };

  // fault detail grid columns
  const faultTimeDetailColumns = [
    {
      field: 'AlarmType',
      headerName: 'Alarm Type',
      width: 200,
      editable: false,
    },
    {
      field: 'AlarmName',
      headerName: 'Alarm Name',
      width: 200,
      editable: false,
    },
    {
      field: 'TagDescription',
      headerName: 'Tag Description',
      width: 450,
      editable: false,
    },
    {
      field: 'Occurrences',
      headerName: 'Occurrences',
      width: 170,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
    },
    {
      field: 'TotalDuration',
      headerName: 'Total Duration',
      width: 170,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
    },
  ];








  
  // grid columns
  const [gridColumns, setGridColumns] = React.useState([]);

  // after get all data, get all columns
  React.useEffect(() => {
    if (operatorTimeData.length > 0) {
      let tempGridColumns = [];


      for (const key in operatorTimeData[0]) {
        let value;
        for (let i = 0; i < operatorTimeData.length; i++) {
          if (operatorTimeData[i][key]) {
            value = operatorTimeData[i][key];
            break;
          }
        }
        // dont show id column
        if (key === "id") {
          continue;
        }

        // console.log(key + " - " + data[0][key]);
        if (key === "serial_number") {
          tempGridColumns.push(
            {
              field: key,
              headerName: key,
              width: 150,
              editable: false,
              headerAlign: 'left',
              align: 'left',
            }
          );
        }
        else if (key === "FaultTime") {
          tempGridColumns.push(
            {
              field: key,
              cellClassName: 'button-layout',
              headerName: key,
              width: 220,
              editable: false,
              headerAlign: 'center',
              align: 'center',
              type: 'number',
            }
          );
        }
        else if (!value) {
          tempGridColumns.push(
            {
              field: key,
              headerName: key,
              width: 150,
              editable: false,
              headerAlign: 'center',
              align: 'center',
            }
          );
        }
        else if (key === "Date") {
          tempGridColumns.push(
            {
              field: key,
              headerName: key,
              width: 180,
              editable: false,
              headerAlign: 'center',
              align: 'center',
              type: 'date',
              valueGetter: ( tempValue ) => {
                // console.log(value);
                var newValue = tempValue.split("T")[0];
                return new Date(newValue)
              },
            }
          );
        }
        else if (key === "ExactTime" || (typeof(value)==="string" && Date.parse(value) && value.includes('T'))) {
          tempGridColumns.push(
            {
              field: key,
              headerName: key,
              width: 180,
              editable: false,
              headerAlign: 'center',
              align: 'center',
              type: 'dateTime',
              valueGetter: ( tempValue ) => {
                var newValue = tempValue.replace("T", " ").split(".")[0];
                return  new Date(newValue)
              },
            }
          );
        }
        else if (+value || +value===0) {
          tempGridColumns.push(
            {
              field: key,
              headerName: key,
              width: 220,
              editable: false,
              headerAlign: 'center',
              align: 'center',
              type: 'number',
            }
          );
        }
        else {
          tempGridColumns.push(
            {
              field: key,
              headerName: key,
              width: 220,
              editable: false,
              headerAlign: 'center',
              align: 'center',
            }
          );
        }
      }
      setGridColumns(tempGridColumns);
    }
       
  }, [operatorTimeData]);




  // customize data grid tool bar
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }




  const [pageSize, setPageSize] = React.useState(100);



  // fult time detail dialog
  const [faultTimeDetailDialogOpen, setFaultTimeDetailDialogOpen] = React.useState(false);
  const handleFaultTimeDetailDialogClose = () => {
    setFaultTimeDetailDialogOpen(false);
  };



  return (
    <Box sx={{ width: '100%' }}>

      <Dialog onClose={handleFaultTimeDetailDialogClose} open={faultTimeDetailDialogOpen} fullWidth maxWidth="xl">
        <DialogTitle>Fault Time Detail</DialogTitle>
        <Box sx={{ height: 400, p: 3 }}>
          {faultTimeDetail.length > 0?
            <DataGrid
              rows={faultTimeDetail || []}
              columns={faultTimeDetailColumns}

              density="compact"
              // Tool Bar
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
              sx={{ ml: 2, mr: 2 }}

            />
            :
            <p>Cell stop request.</p>
          }
        </Box>
        <DialogActions>
          <Button onClick={handleFaultTimeDetailDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>



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
          defaultValue={operatorTableTitle}

          onChange={(event, newValue) => {
            // console.log(newValue);
            setOperatorTableTitle(newValue);
          }}

        />

        
        <Stack direction="row" spacing={2}>
          <TimeSelectorComp startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
          <Button onClick={() => { confirmOnClick(); }} variant="contained" color='info' disabled={confirmButtonDisable} >Confirm</Button>
          <HourglassTopIcon sx={{color:"#666666", pt: 2, display: confirmButtonDisable?'block':'none' }} disabled={confirmButtonDisable}/>
        </Stack>

      </Stack>

      <br/>


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
          rows={operatorTimeData || []}
          columns={gridColumns}


          density="compact"
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

          // autoHeight

          sx={{ ml: 2, mr: 2 }}


          // double click event, show fault time detail
          onCellClick={
            (params) => {
              // console.log(params);
              if (params.field === "FaultTime") {

                getFaultTimedetail(params.row.serial_number, params.row.ExactTime);
                setFaultTimeDetailDialogOpen(true);

              }
              // doubleClickSerialRow(params.row.serial_number);
            }
          }


        />

      </Box>




    </Box>
  );
}