import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import EmailSettingsComp from './EmailSettingsComp';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

export default function SettingsPage() {

  // setting values
  const [settingJson, setSettingJson] = React.useState({});

  // tabs states
  const [tabValue, setTabValue] = React.useState("emailSettings");

  
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

  

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // get setting values
  React.useEffect( () => {
    const fetchData = async () => { fetch("/api/settings/getValues")                            
      .then((res) => res.json())                  
      .then((data) => {
        setSettingJson(data);
      });    
    }
    
    fetchData();
        
  }, []);

  // save email settings
  const onSaveClick = async () =>{
    await timeout(200);

    fetch("/api/settings/saveSettingValues", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify(settingJson)
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


  return (
    <div style={{marginLeft:"16px", marginRight:"16px"}}>

      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      <h2>Settings</h2>

      <Box
        sx={{
          borderRadius: 1,
          p: 2,
          boxShadow: 0,
          border:'1px solid #d4d4d4',
          height:"75vh"
        }}
      >
        <Box
          sx={{ flexGrow: 1, display: 'flex', height: "100%" }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={handleTabsChange}
            aria-label="settings tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Email" value="emailSettings" />
            <Tab label="Alarm" value="alarmSettings" />
          </Tabs>

          <div hidden={tabValue !== "emailSettings"} style={{width:"100%", overflow: "auto"}} >
            <EmailSettingsComp />
          </div>

        
          <div hidden={tabValue !== "alarmSettings"} style={{width:"100%", overflow: "auto", paddingTop:"16px"}} >
            <div style={{marginLeft:"16px", marginRight:"16px"}}>
              <TextField id="outlined-basic" label="Excess Time Email Alarm Threshold (in minutes)" variant="outlined" 
                value={Math.round(settingJson.alarmThreshold/60 * 100) / 100} sx={{width:400}} 
                onChange={(event)=>{setSettingJson({...settingJson, "alarmThreshold": event.target.value*60})}}
              />
              <br/>
              <Button sx={{width:"150px", mt:2}} variant="contained" color='primary' onClick={() => {onSaveClick();}} >Save Settings</Button>
            </div>
          </div>


        </Box>

      </Box>
      
    </div>
  );
}