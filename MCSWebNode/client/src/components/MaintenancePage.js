import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import EmailSettingsComp from './EmailSettingsComp';

export default function MaintenancePage() {

  const [maintenanceData, setMaintenanceData] = React.useState([]);

  React.useEffect(() => {

    fetch("/api/MaintenancePage/getAllMaintenance")
      .then((res) => res.json())
      .then((data) => {
        setMaintenanceData([...data]);

      });


  }, []);


  return (
    <div style={{marginLeft:"16px", marginRight:"16px"}}>
      <h2>Maintenance</h2>

      <div style={{marginLeft:"32px", marginRight:"32px",}}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <h3>Schedule</h3>
          </Grid>
          <Grid item xs={4}>
            <h3>Preset</h3>
          </Grid>
          <Grid item xs={4}>
            <h3>Current</h3>
          </Grid>
        </Grid>


          {maintenanceData.map((element, index) => {
            return (
              <Grid container key={index} sx={{pt:2}}>
                <Grid item xs={4}>
                  <TextField variant="outlined" defaultValue={element.TagName} sx={{ width: 400 }}
                    InputProps={{
                      readOnly: true,
                    }} />
                </Grid>
                <Grid item xs={4}>
                  <TextField variant="outlined" defaultValue={element.PresetNumber} sx={{ width: 400 }}
                    InputProps={{
                      readOnly: true,
                    }} />
                </Grid>
                <Grid item xs={4}>
                  <TextField variant="outlined" defaultValue={element.CurrentNumber} sx={{ width: 400 }}
                    InputProps={{
                      readOnly: true,
                    }} />
                </Grid>
              </Grid>
            )

          })}




      </div>

      
    </div>
  );
}
