import React from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton, 
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}


export default function EmailSettingsComp({}) {
  const [emailGridData, setEmailGridData] = React.useState([]);
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


  // when modify start or end time
  const handleStartTimeChange = (params, newValue) => {
      // Update the row data with the new time
      const updatedRows = emailGridData.map((row) =>
        row.id === params.id ? { ...row, startTime: newValue } : row
      );

      // console.log(updatedRows);
      setEmailGridData(updatedRows);
  };
  const handleEndTimeChange = (params, newValue) => {
      // Update the row data with the new time
      const updatedRows = emailGridData.map((row) =>
        row.id === params.id ? { ...row, endTime: newValue } : row
      );

      // console.log(updatedRows);
      setEmailGridData(updatedRows);
  };

  // grid columns
  const columns = [
    {
      field: 'emailAddress',
      headerName: 'Email for receiving',
      width: 250,
      editable: true,
    },
    {
      field: 'reportTo',
      headerName: 'Production report',
      type: 'boolean',
      width: 180,
      editable: true,
    },
    {
      field: 'alarmTo',
      headerName: 'Alarm report',
      type: 'boolean',
      width: 180,
      editable: true,
    },
    {
      field: 'scheduledMaintenanceTo',
      headerName: 'Scheduled maintenance',
      type: 'boolean',
      width: 180,
      editable: true,
    },
    {
      field: 'qualityRejectTo',
      headerName: 'Quality reject',
      type: 'boolean',
      width: 180,
      editable: true,
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      width: 160,
      editable: true,
      renderCell: (params) => {
        // console.log(params);
        return <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker value={dayjs(params.value, "HH:mm:ss")} onChange={(newValue) => handleStartTimeChange(params, newValue.format('HH:mm:ss')) } />
          </LocalizationProvider>
        </div>
      },
      type: 'time',
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      width: 160,
      editable: true,
      renderCell: (params) => {
        return <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker value={dayjs(params.value, "HH:mm:ss")} onChange={(newValue) => handleEndTimeChange(params, newValue.format('HH:mm:ss')) } />
          </LocalizationProvider>
        </div>
      },
      type: 'time',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Delete',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // delete row 
  const handleDeleteClick = (id) => () => {
    setEmailGridData(emailGridData.filter((row) => row.id !== id));
  };
  // update row
  const updateRow = (newRow) => {
    console.log(newRow);
    for (const it of emailGridData){
      if (it.id === newRow.id){
        it.emailAddress = newRow.emailAddress;
        it.reportTo = newRow.reportTo;
        it.alarmTo = newRow.alarmTo;
        it.scheduledMaintenanceTo = newRow.scheduledMaintenanceTo;
        it.qualityRejectTo = newRow.qualityRejectTo;
      }
    }
    setEmailGridData([...emailGridData]);
  };

  // customize tool bar
  const handleAddRowClick = () => {
    const id = emailGridData[emailGridData.length-1].id + 1;
    setEmailGridData([...emailGridData, { "id": id, "emailAddress": '', "reportTo": 0, "alarmTo": 0, "scheduledMaintenanceTo": 0, "qualityRejectTo": 0, "startTime": "", "endTime": "" }]);
  };
  const AddRow = () => {
    return (
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRowClick}>
        Add Email Address
      </Button>
    );
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <AddRow />
      </GridToolbarContainer>
    );
  }



  // save email settings
  const onSaveClick = async () =>{
    await timeout(200);

    // console.log(emailGridData);
    let reportToStr = "";
    let alarmToStr = "";
    let scheduledMaintenanceToStr = "";
    let qualityRejectToStr = "";

    let emailsTimeRange = {};

    for (const it of emailGridData){
      emailsTimeRange[it.emailAddress] = { "startTime": it.startTime, "endTime": it.endTime };

      if (it.reportTo){
        reportToStr += it.emailAddress.trim() + ",";
      }
      if (it.alarmTo){
        alarmToStr += it.emailAddress.trim() + ",";
      }
      if (it.scheduledMaintenanceTo){
        scheduledMaintenanceToStr += it.emailAddress.trim() + ",";
      }
      if (it.qualityRejectTo){
        qualityRejectToStr += it.emailAddress.trim() + ",";
      }
    }
    

    fetch("/api/settings/saveEmailConfigs", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "reportTo": reportToStr.substring(0, reportToStr.length - 1), 
                              "alarmTo": alarmToStr.substring(0, alarmToStr.length - 1), 
                              "scheduledMaintenanceTo": scheduledMaintenanceToStr.substring(0, scheduledMaintenanceToStr.length - 1), 
                              "qualityRejectTo": qualityRejectToStr.substring(0, qualityRejectToStr.length - 1),
                              "emailsTimeRange": emailsTimeRange
                            })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setAlertType("success");
        setAlertMsg("Settings are saved.");
        setAlertOpen(true);
      })
      .catch((error) => {
        setAlertType("error");
        setAlertMsg("Cannot save settings.");
        setAlertOpen(true);
        console.log('Error: cannot save email settings.');
        console.log(error);
      }); 



  };



  // get grid data
  React.useEffect( () => {
    const fetchData = async () => { fetch("/api/settings/getEmailGridData")                            
      .then((res) => res.json())                  
      .then((data) => {
        // console.log(data.emailGridData);
        setEmailGridData([...data.emailGridData]);
      });    
    }
    
    fetchData();
        
  }, []);




  // test sending emails
  const sendTest = async () =>{
    await timeout(200);
    
    let sendTo = "";

    for (const it of emailGridData){
      sendTo += it.emailAddress.trim() + ",";
    }
    

    fetch("/api/settings/testsending", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "sendTo": sendTo.substring(0, sendTo.length - 1) })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success === "success") {
          console.log(data)
          setAlertType(data.success);
          setAlertMsg("Test eamil is sent to " + sendTo);
          setAlertOpen(true);
        }
        else {
          console.log(data)
          setAlertType(data.success);
          setAlertMsg("Test eamil failed to send to " + sendTo);
          setAlertOpen(true);
        }
      })
      .catch((error) => {
        setAlertType("error");
        setAlertMsg("Cannot send test email.");
        setAlertOpen(true);
        console.log('Error: cannot send test email.');
        console.log(error);
      }); 


  }







  return (
    <div style={{marginLeft:"16px", marginRight:"16px", width:"1500px", }}>

      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <DataGrid
        rows={emailGridData}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        // Tool Bar
        components={{
          Toolbar: CustomToolbar,
        }}
        editMode="row" 
        onRowEditStop={(params, event) => {
          updateRow(params.row);
        }}
        pageSizeOptions={[20, 50, 100]}
        disableRowSelectionOnClick
      />
      
      <Stack direction="row" spacing={2} sx={{pt:2}}>
        <Box sx={{ width: 240 }}> <Button sx={{width:"150px", fontSize: 12,}} size="small" onClick={() => { sendTest(); }} variant="outlined" color='info' >test sending</Button> </Box>
        <Box sx={{ width: 170 }}> <Button sx={{width:"150px", fontSize: 12,}} size="small" onClick={() => { console.log("test"); }} variant="outlined" color='info' >test production</Button> </Box>
        <Box sx={{ width: 170 }}> <Button sx={{width:"150px", fontSize: 12,}} size="small" onClick={() => { console.log("test"); }} variant="outlined" color='info' >test alarm</Button> </Box>
        <Box sx={{ width: 170 }}> <Button sx={{width:"150px", fontSize: 12,}} size="small" onClick={() => { console.log("test"); }} variant="outlined" color='info' >test maintenance</Button> </Box>
        <Box sx={{ width: 170 }}> <Button sx={{width:"150px", fontSize: 12,}} size="small" onClick={() => { console.log("test"); }} variant="outlined" color='info' >test quality</Button> </Box>
      </Stack>

      <br />
      

      <Button sx={{width:"150px", mt:4}} onClick={() => { onSaveClick(); }} variant="contained" color='primary' >Save Settings</Button>
    </div>
  );
}
