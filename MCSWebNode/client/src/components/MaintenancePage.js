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
  
  // force to refresh
  const [refresh, setRefresh] = React.useState(true);
  // refresh timer
  const [refreshTimer, setRefreshTimer] = React.useState(0);

  // get refresh duration time
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





  const [maintenanceData, setMaintenanceData] = React.useState([]);

  React.useEffect(() => {

    fetch("/api/MaintenancePage/getAllMaintenance")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMaintenanceData([...data]);

      });


  }, [refresh]);


  return (
    <div style={{marginLeft:"16px", marginRight:"16px"}}>
      <h2>Maintenance</h2>

      <div style={{marginLeft:"32px", marginRight:"32px",}}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h3>Schedule</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Preset</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Current</h3>
          </Grid>
          <Grid item xs={3}>
            <h3>Duration  of Last Maintenance</h3>
          </Grid>
        </Grid>


          {maintenanceData.map((element, index) => {
            return (
              <Grid container key={index} sx={{pt:2}}>
                <Grid item xs={3}>
                  <TextField variant="outlined" defaultValue={element.TagName} sx={{ width: 400 }}
                    InputProps={{
                      readOnly: true,
                    }} />
                </Grid>
                <Grid item xs={3}>
                  <TextField variant="outlined" defaultValue={element.PresetNumber} sx={{ width: 400 }}
                    InputProps={{
                      readOnly: true,
                    }} />
                </Grid>
                <Grid item xs={3}>
                  <TextField variant="outlined" 
                    defaultValue={element.CurrentNumber + "  (" + (Math.round(Number(element.CurrentNumber)/Number(element.PresetNumber)*10000)/100) + "%)"} sx={{ width: 400 }}
                    InputProps={{
                      readOnly: true,
                    }} />
                </Grid>
                {/* <Grid item xs={3}>
                  <TextField variant="outlined" 
                    defaultValue={element.DurationMinute? element.DurationMinute + " Minutes" : "N/A"} sx={{ width: 400 }}
                    InputProps={{
                      readOnly: true,
                    }} />
                </Grid> */}
                <Grid item xs={3}>
                  <TextField variant="outlined" 
                    defaultValue={element.MaintenanceTime? Math.round(Number(element.MaintenanceTime)/60 * 100) / 100 + " Minutes" : "N/A"} sx={{ width: 400 }}
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
