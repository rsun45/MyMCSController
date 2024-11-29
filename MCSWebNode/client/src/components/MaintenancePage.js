import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

  // first loading icon
  const [firstLoading, setFirstLoading] = React.useState(true);

  React.useEffect(() => {

    fetch("/api/MaintenancePage/getAllMaintenance")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setFirstLoading(false);
        setMaintenanceData([...data]);

      });


  }, [refresh]);


  // duration history records dialog
  const [durationHistoryDialogOpen, setDurationHistoryDialogOpen] = React.useState(false);
  const handleDurationHistoryDialogClose = () => {
    setDurationHistoryDialogOpen(false);
  };

  // maintenance duration history records state
  const [maintenanceDurationHistoryRecords, setMaintenanceDurationHistoryRecords] = React.useState([]);

  // get maintenance duration history from API
  const clickHistoryButton = () => {
    
    fetch("/api/MaintenancePage/getMaintenanceDurationHistory")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMaintenanceDurationHistoryRecords([...data.MaintenanceDurationHistory]);
        setMaxPageNum(data.MaintenanceDurationHistory.length);
        setHistoryPagecontent(data.MaintenanceDurationHistory[0]);
      });

  };


  // history dialog content state
  const [historyPagecontent, setHistoryPagecontent] = React.useState({});
  // max page number
  const [maxPageNum, setMaxPageNum] = React.useState(0);

  const [page, setPage] = React.useState(1);
  const handlePageNumberChange = (event, value) => {
    setHistoryPagecontent(maintenanceDurationHistoryRecords[value-1]);
    setPage(value);
  };


  return (
    <div style={{ marginLeft: "16px", marginRight: "16px" }}>

      <Dialog onClose={handleDurationHistoryDialogClose} open={durationHistoryDialogOpen} fullWidth maxWidth="xl">
        <DialogTitle>Maintenanc Duration History</DialogTitle>
        <Box sx={{ height: "65vh", p: 3 }}>
          <Stack sx={{ height: "100%",}} display="flex" alignItems="center"  spacing={2}>
            <h2>{historyPagecontent?.shiftTitle}</h2>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h3>Schedule</h3>
              </Grid>
              <Grid item xs={6}>
                <h3>Duration  of Maintenance</h3>
              </Grid>
            </Grid>
            {historyPagecontent?.records?.length>0?historyPagecontent.records.map((element, index) => {
              return (
                <Grid container key={index} sx={{ pt: 2 }}>
                  <Grid item xs={6}>
                    <TextField variant="outlined" value={element.TagName} sx={{ width: 400 }}
                      InputProps={{
                        readOnly: true,
                      }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField variant="outlined"
                      value={element?.MaintenanceTime ? Math.round(Number(element.MaintenanceTime) / 60 * 100) / 100 + " Minutes" : "N/A"} sx={{ width: 400 }}
                      InputProps={{
                        readOnly: true,
                      }} />
                  </Grid>
                </Grid>
              )

            })
            :
            null
            }

            <Pagination count={maxPageNum} page={page} siblingCount={5} onChange={handlePageNumberChange} />
          </Stack>
        </Box>
        <DialogActions>
          <Button onClick={handleDurationHistoryDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>



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
            <div style={{display: "flex"}}>
              <h3>Duration  of Last Maintenance</h3>
              <Button sx={{ml:2, fontSize:20, fontWeight: "bold"}} variant="text" onClick={()=>{ clickHistoryButton(); setDurationHistoryDialogOpen(true); }}>History</Button>
            </div>
          </Grid>
        </Grid>


        {
          firstLoading ?

            <Box display="flex" alignItems="center" justifyContent="center" sx={{height: "60vh"}}>
              <HourglassTopIcon fontSize="large" sx={{ color: "#666666", pt: 2, display: 'block' }} />
            </Box>
            :

            maintenanceData.map((element, index) => {
              return (
                <Grid container key={index} sx={{ pt: 2 }}>
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
                      defaultValue={element.CurrentNumber + "  (" + (Math.round(Number(element.CurrentNumber) / Number(element.PresetNumber) * 10000) / 100) + "%)"} sx={{ width: 400 }}
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
                      defaultValue={element.MaintenanceTime ? Math.round(Number(element.MaintenanceTime) / 60 * 100) / 100 + " Minutes" : "N/A"} sx={{ width: 400 }}
                      InputProps={{
                        readOnly: true,
                      }} />
                  </Grid>
                </Grid>
              )

            })

          }




      </div>

      
    </div>
  );
}
