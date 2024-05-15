import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import EmailSettingsComp from './EmailSettingsComp';

export default function SettingsPage() {

  // tabs states
  const [tabValue, setTabValue] = React.useState("emailSettings");

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue);
  };


  return (
    <div style={{marginLeft:"16px", marginRight:"16px"}}>
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

          <div hidden={tabValue !== "emailSettings"} >
            <EmailSettingsComp />
          </div>

        
          <div hidden={tabValue !== "alarmSettings"} >
            <div style={{marginLeft:"16px", marginRight:"16px"}}>
              <TextField id="outlined-basic" label="Excess Time Email Alarm Threshold (in minutes)" variant="outlined" defaultValue="5" sx={{width:400}} />
              <br/>
              <Button sx={{width:"150px", mt:2}} variant="contained" color='primary' >Save Settings</Button>
            </div>
          </div>


        </Box>

      </Box>
      
    </div>
  );
}
