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
      width: 150,
      editable: true,
    },
    {
      field: 'alarmTo',
      headerName: 'Alarm report',
      type: 'boolean',
      width: 150,
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
      width: 150,
      editable: true,
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
    setEmailGridData([...emailGridData, { "id": id, "emailAddress": '', "reportTo": 0, "alarmTo": 0, "scheduledMaintenanceTo": 0, "qualityRejectTo": 0 }]);
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

    for (const it of emailGridData){
      if (it.reportTo){
        reportToStr += it.emailAddress.trim() + ","
      }
      if (it.alarmTo){
        alarmToStr += it.emailAddress.trim() + ","
      }
      if (it.scheduledMaintenanceTo){
        scheduledMaintenanceToStr += it.emailAddress.trim() + ","
      }
      if (it.qualityRejectTo){
        qualityRejectToStr += it.emailAddress.trim() + ","
      }
    }
    

    fetch("/api/settings/saveEmailConfigs", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "reportTo": reportToStr.substring(0, reportToStr.length - 1), 
                              "alarmTo": alarmToStr.substring(0, alarmToStr.length - 1), 
                              "scheduledMaintenanceTo": scheduledMaintenanceToStr.substring(0, scheduledMaintenanceToStr.length - 1), 
                              "qualityRejectTo": qualityRejectToStr.substring(0, qualityRejectToStr.length - 1)
                            })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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

  return (
    <div style={{marginLeft:"16px", marginRight:"16px", width:"1000px"}}>

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

      <br />

      <Button sx={{width:"150px"}} onClick={() => { onSaveClick(); }} variant="contained" color='primary' >Save Settings</Button>
    </div>
  );
}
