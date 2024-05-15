import React from "react";
import './TopBar.css';
import logo from '../img/logo-final.png';
import Clock from 'react-live-clock';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SettingsComp from './SettingsComp';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function TopBar() {

  // alart when missing fields
  // const [alertOpen, setAlertOpen] = React.useState(false);
  // const handleAlertClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setAlertOpen(false);
  // };

  // const [alertType, setAlertType] = React.useState("warning");
  // const [alertMsg, setAlertMsg] = React.useState("");

  // settings dialog
  // const [openDialog, setOpenDialog] = React.useState(false);
  // const handleClickOpenDialog = () => {
  //   setOpenDialog(true);
  // };
  // const handleCloseDialog = (event, reason) => {
  //   if (reason && reason === "backdropClick") 
  //       return;
  //   setOpenDialog(false);
  // };

  // settings states
  const [reportSendTo, setReportSendTo] = React.useState("");


  // get settings values
  // React.useEffect( () => {
  //   const fetchData = async () => { fetch("/api/settings/getEmailReportSettings")                            
  //     .then((res) => res.json())                  
  //     .then((data) => {
  //       setReportSendTo(data.emailReportSendTo);
  //     });    
  //   }
    
  //   fetchData();
        
  // }, []);


  // when click save button in settings dialog
  // const saveSettings = () =>{
  //   fetch("/api/settings/saveEmailConfigs", {
  //     method: "POST",
  //     headers: {"Content-Type": "application/JSON"},
  //     body: JSON.stringify({"emailReportSendTo":reportSendTo}) 
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       setAlertType("success");
  //       setAlertMsg("Settings are saved.");
  //       setAlertOpen(true);
  //     })
  //     .catch((error) => {
  //       setAlertType("error");
  //       setAlertMsg("Cannot save settings.");
  //       setAlertOpen(true);
  //       console.log('Error: cannot save email settings.');
  //       console.log(error);
  //     }); 

    
  //   setOpenDialog(false);
  // };


  return (
    <div className="TopBar">
      {/* <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar> */}

      <a href="/">
        <img src={logo}  alt="MACHINE CONTROL SOLUTION"  height="70%" />
      </a>


      <div style={{float: "right", paddingTop:"12px"}}>
        <Clock 
          style={{margin:"25px", color:"white" }}
          format={'dddd, MMMM Do YYYY, h:mm:ss a'}
          ticking={true} />

          
        {/* <IconButton aria-label="settings" onClick={() => { handleClickOpenDialog(); }} >
          <SettingsIcon sx={{ color: "#ffffff", '&:hover': {color: "#ababab"} }}/>
        </IconButton> */}
      </div>


      {/* <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="true"
        maxWidth='lg'
        disableEscapeKeyDown="true"
      >

        <DialogContent
          sx={{ height: 500 }}>
          <SettingsComp reportSendTo={reportSendTo} setReportSendTo={setReportSendTo} setAlertType={setAlertType} setAlertMsg={setAlertMsg} setAlertOpen={setAlertOpen} />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={()=>{saveSettings();}}>Save</Button>
          <Button onClick={handleCloseDialog} color="warning" autoFocus>Cancel</Button>
        </DialogActions>


      </Dialog> */}

    </div>
  );
}
