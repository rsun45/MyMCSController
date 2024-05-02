import * as React from 'react';
import './MyGrid.css';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import Graph from './Graph';
// import Box from "@mui/material/Box";
import TimeSelector from './TimeSelector';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import TimeSelectorComp from './TimeSelectorComp';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



// return local datetime string in 'YYYY-MM-DD HH:MM:SS' formate
function toLocalIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      return (num < 10 ? '0' : '') + num;
    };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    ' ' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds());
}

// function getFullTime(params) {
//   return `${params.row.tag_add_dt.substr(0, params.row.tag_add_dt.indexOf('T')) || ''} ${params.row.tag_add_dt.substr(params.row.tag_add_dt.indexOf('T') + 1, params.row.tag_add_dt.length) || ''}`
// }

//表头
// const columns = [
//   {
//     field: 'serialNumber',
//     headerName: 'Serial Number',
//     width: 150,
//     editable: false,
//   },{
//     field: 'PartStatus',
//     headerName: 'Part State',
//     width: 150,
//     editable: false,
//   },{
//     field: 'SourceStation',
//     headerName: 'Source Station',
//     width: 150,
//     editable: false,
//   },{
//     field: 'TargetStation',
//     headerName: 'Target Station',
//     width: 150,
//     editable: false,
//   },{
//     field: 'PartType',
//     headerName: 'Type',
//     width: 100,
//     editable: false,
//   },{
//     field: 'wpcNumber',
//     headerName: 'Wpc Number',
//     width: 100,
//     editable: false,
//   },{
//     field: 'starttime',
//     headerName: 'Start Time',
//     width: 300,
//     editable: false,
//     //这里type暂时选择用dateTime,这样可以显示出秒。之前是date
//     type: 'dateTime',
//     // valueGetter: getFullTime,
//       valueGetter: ({ value }) => {
//       var newDate = new Date(value);
//       newDate.setHours(newDate.getHours()+4);
//       // console.log(newDate.setHours(newDate.getHours() + 5));
//       return newDate}, 
//   },{
//     field: 'endtime',
//     headerName: 'End Time',
//     width: 300,
//     editable: false,
//     //这里type暂时选择用dateTime,这样可以显示出秒。之前是date
//     type: 'dateTime',
//     // valueGetter: getFullTime,
//       valueGetter: ({ value }) => {
//       var newDate = new Date(value);
//       newDate.setHours(newDate.getHours()+4);
//       // console.log(newDate.setHours(newDate.getHours() + 5));
//       return newDate}, 
//   },

// ];

export default function ResultPage() {

  // grid rows
  const [data, setData] = React.useState(null);
  // grid rows after OK NOK filter
  const [dataAfterFilter, setDataAfterFilter] = React.useState([]);
  // grid columns
  const [gridColumns, setGridColumns] = React.useState([]);
  // station and tag mappings; [[a,["tag1","tag2"]], [b,[tag3]]]
  const [stationTagMap, setStationTagMap] = React.useState(new Map());


  const [loadingProcess, setLoadingProcess] = React.useState(false);


  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [confirmButtonDisable, setConfirmButtonDisable] = React.useState(false);
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

  // click confirm button 
  const confirmOnClick = () => {
    setShowGridIndex(0);
    setLoadingProcess(true);
    setConfirmButtonDisable(true);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      setAlertType("warning");
      setAlertMsg("Please fill date time.");
      setAlertOpen(true);
      setConfirmButtonDisable(false);
      return;
    }


    fetch("/api/ResultPage/getStationStatusByDateRange", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "start": toLocalIsoString(startTime), "end": toLocalIsoString(endTime) })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data);
        // setup dataAfterFilter
        filterOKNOKData(data, showOKNOK);
        setAlertMsg("Successful query.");
        setAlertType("success");
        setAlertOpen(true);
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


  React.useEffect(() => {
    // get station and tagTitle mapping data
    fetch("/api/QueryPage/stationAndTagTitleMapping")
      .then((res) => res.json())
      .then((data) => {
        let tempStationTagMap = new Map();
        for (const it of data) {
          let tempStationName = it.tagName.split(".")[0];
          if (tempStationTagMap.has(tempStationName)) {
            tempStationTagMap.get(tempStationName).push(it.tagTitle);
          }
          else {
            tempStationTagMap.set(tempStationName, [it.tagTitle]);
          }
        }
        setStationTagMap(tempStationTagMap);
        // console.log(tempStationTagMap);
      });

  }, []);




  // bool stack for storing all station tree checks
  const [checked, setChecked] = React.useState([]);

  const chackAll = (event) => {
    for (let i = 0; i < checked.length; i++) {
      checked[i] = event.target.checked;
    }
    setChecked([...checked]);
  };

  const handleChildChange = (event) => {
    checked[Number(event.target.id)] = event.target.checked;
    setChecked([...checked]);
  };


  // after get stationTagMap, set checks bool array
  React.useEffect(() => {
    let tempCheck = [];
    if (stationTagMap.size > 0) {
      for (let i = 0; i < stationTagMap.size; i++) {
        tempCheck.push(true);
      }
    }
    setChecked([...tempCheck]);

  }, [stationTagMap]);


  // grid column Visibility model
  const [myColumnVisibilityModel, setMyColumnVisibilityModel] = React.useState({});
  // after change selection of stations to show, modify grid Visibility model
  React.useEffect(() => {
    if (checked) {
      const stationTagMapArr = [...stationTagMap.entries()];
      let tempVisibility = {};
      for (let i = 0; i < checked.length; i++) {
        if (!checked[i]) {
          tempVisibility[stationTagMapArr[i][0]] = false;
          for (let j = 0; j < stationTagMapArr[i][1].length; j++) {
            tempVisibility[stationTagMapArr[i][1][j]] = false;
          }
        }
      }
      setMyColumnVisibilityModel(tempVisibility);
    }

  }, [checked]);





  // after get all data, get all columns
  React.useEffect(() => {
    if (data) {

      let tempGridColumns = [];
      for (const key in data[0]) {
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
            }
          );
        }
        else {
          tempGridColumns.push(
            {
              field: key,
              headerName: key,
              width: 150,
              editable: false,
              valueGetter: ({ value }) => {
                if (value === 2 || value === "2") {
                  return "OK";
                }
                else if (value === 1 || value === "1") {
                  return "NOK";
                }
                else {
                  return "";
                }
              },
            }
          );
        }
      }
      setGridColumns(tempGridColumns);
    }

  }, [data]);





  // grid number to show
  const [showGridIndex, setShowGridIndex] = React.useState(0);
  const handleGridChange = (event, newGridIndex) => {
    if (newGridIndex !== null) {
      setShowGridIndex(newGridIndex);
    }
  };



  const GridSwitch = () => {
    return (
      <ToggleButtonGroup
        value={showGridIndex}
        exclusive
        onChange={handleGridChange}
        aria-label="Grid Selections"
        sx={{ height: 30, ml: 5 }}
      >
        <ToggleButton value={0} aria-label="Serials Station Status" sx={{ width: 130 }}>
          {"Serials Grid"}
        </ToggleButton>
        <ToggleButton value={1} aria-label="One Serial Data" sx={{ width: 130 }}>
          {"Data Grid"}
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };




  // grid2 rows
  const [data2, setData2] = React.useState(null);
  // grid2 columns
  const [gridColumns2, setGridColumns2] = React.useState([]);

  const doubleClickSerialRow = (serialNumber) => {
    setLoadingProcess(true);
    setShowGridIndex(1);
    fetch("/api/ResultPage/getDataBySerial", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ "serialNumber": serialNumber })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData2(data);
        setAlertMsg("Successful show data grid.");
        setAlertType("success");
        setAlertOpen(true);
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
  };


  // after get all data2, get all columns2
  React.useEffect(() => {
    if (data2) {
      let tempGridColumns = [];
      for (const key in data2[0]) {
        // dont show id column
        if (key === "id") {
          continue;
        }

        tempGridColumns.push(
          {
            field: key,
            headerName: key,
            width: 150,
            editable: false,
          }
        );
      }
      setGridColumns2(tempGridColumns);
    }

  }, [data2]);




  // function for filter data
  const filterOKNOKData = (inputData, inputShowOKNOK) =>{
    if (inputData) {
      if (inputShowOKNOK.length === 2) {
        let tempDataAfterFilter = [];
        for (let i = 0; i < inputData.length; i++) {
          tempDataAfterFilter[i] = inputData[i];
        }
        setDataAfterFilter([...tempDataAfterFilter]);
      }
      else if (inputShowOKNOK.length === 1 && inputShowOKNOK[0] === "OK"){
        let tempDataAfterFilter = [];
        for (let i = 0; i < inputData.length; i++) {
          let ifAdd = true;
          for (const key in inputData[i]){
            if(inputData[i][key] === "1"){
              ifAdd = false;
              break;
            }
          }
          if (ifAdd){
            tempDataAfterFilter.push(inputData[i]);
          }
        }
        setDataAfterFilter([...tempDataAfterFilter]);
      }
      else if (inputShowOKNOK.length === 1 && inputShowOKNOK[0] === "NOK"){
        let tempDataAfterFilter = [];
        for (let i = 0; i < inputData.length; i++) {
          let ifAdd = false;
          for (const key in inputData[i]){
            if(inputData[i][key] === "1"){
              ifAdd = true;
              break;
            }
          }
          if (ifAdd){
            tempDataAfterFilter.push(inputData[i]);
          }
        }
        setDataAfterFilter([...tempDataAfterFilter]);
      }
    }
  };


  // show OK or NOK rows
  const [showOKNOK, setShowOKNOK] = React.useState(["OK", "NOK"]);
  const [checkBoxOKNOK, setCheckBoxOKNOK] = React.useState([true, true]);
  // const handleShowOKNOKChange = (event, newGridIndex) => {
  //   if (newGridIndex.length) {
  //     setShowOKNOK(newGridIndex);

  //     // filter the data
  //     filterOKNOKData(data, newGridIndex);
  //   }
  // };
  
  const handleShowOKNOKChange = (event, str) => {
    let newGridIndex = [...showOKNOK];
    if (newGridIndex.length === 2){
      if (!event.target.checked){
        const index = newGridIndex.indexOf(str);
        if (index !== -1) {
          newGridIndex.splice(index, 1);
        }
      }
    }
    else if (newGridIndex.length === 1){
      if (event.target.checked && newGridIndex[0] !== str){
        newGridIndex.push(str);
      }
    }
    if (newGridIndex.length) {
      let tempArr = [false,false];
      if (newGridIndex.includes("OK")){
        tempArr[0] = true;
      }
      if (newGridIndex.includes("NOK")){
        tempArr[1] = true;
      }
      setCheckBoxOKNOK([...tempArr]);
      setShowOKNOK([...newGridIndex]);

      // filter the data
      filterOKNOKData(data, newGridIndex);
    }
  };


  const OKNOKSwitch = () => {
    return (
      // <ToggleButtonGroup
      //   value={showOKNOK}
      //   onChange={handleShowOKNOKChange}
      //   aria-label="Show OKNOK"
      //   sx={{ height: 30, ml: 5 }}
      // >
      //   <ToggleButton value="OK" aria-label="Show OK Serials" sx={{ width: 130 }}>
      //     {"OK"}
      //   </ToggleButton>
      //   <ToggleButton value="NOK" aria-label="Show NOK Serials" sx={{ width: 130 }}>
      //     {"Show NOK Serials"}
      //   </ToggleButton>
      // </ToggleButtonGroup>
      <Stack direction="row" spacing={2} sx={{ml:4}}>
        <FormControlLabel
          label="OK"
          control={<Checkbox checked={checkBoxOKNOK[0]} onChange={(event)=>{handleShowOKNOKChange(event, "OK")}} />}
        />
        <FormControlLabel
          label="NOK"
          control={<Checkbox checked={checkBoxOKNOK[1]} onChange={(event)=>{handleShowOKNOKChange(event, "NOK")}} />}
        />
      </Stack>
    );
  };







  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <GridSwitch />
        {showGridIndex === 0 ? <OKNOKSwitch /> : null}
      </GridToolbarContainer>
    );
  }

  const [pageSize, setPageSize] = React.useState(100);

  // change page
  const navigate = useNavigate();

  return (

    /* 数据表格部分 */
    <div style={{ height: '83vh', width: '100%' }}>
      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>

      {/* <TimeSelector data={data} setData={setData} setLoadingProcess={setLoadingProcess} /> */}
      <Stack direction="row" spacing={2}>
        <TimeSelectorComp startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
        <Button onClick={() => { confirmOnClick(); }} variant="contained" color='info' disabled={confirmButtonDisable} >Confirm</Button>


      </Stack>

      <Box sx={{ flexGrow: 1, height: "100%", marginTop: 1 }}>
        <Grid container spacing={1} sx={{ height: "100%" }}>
          <Grid item xs={1.5}>
            <div>
              <FormControlLabel
                label="All"
                control={
                  <Checkbox
                    checked={checked.every(value => value === true)}
                    indeterminate={!checked.every(value => value === true) && !checked.every(value => value === false)}
                    onChange={chackAll}
                  />
                }
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
                {[...stationTagMap.entries()].map(([key, value], index) => {
                  return (
                    <FormControlLabel
                      label={key}
                      key={index}
                      control={<Checkbox id={"" + index} checked={checked[index] === true || checked[index] === false ? checked[index] : true} onChange={handleChildChange} />}
                    />

                  );
                })}
              </Box>
            </div>


          </Grid>
          <Grid item xs={10.5}>
            {
              showGridIndex === 0 ?
                <Box sx={{ width:"100%", height: "100%", '& .NOK': { backgroundColor: 'rgb(252, 136, 136)', }, '& .OK': { backgroundColor: 'rgb(135, 250, 145)', }, }}>
                  <DataGrid
                    rows={dataAfterFilter ? dataAfterFilter : []}
                    columns={gridColumns}
                    columnVisibilityModel={myColumnVisibilityModel}
                    onColumnVisibilityModelChange={(model) => { setMyColumnVisibilityModel(model); }}
                    // Tool Bar
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                    slots={{
                      // toolbar: CustomToolbar,
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

                    // double click event
                    onCellDoubleClick={
                      (params) => {
                        // console.log(params.row.serial_number);
                        doubleClickSerialRow(params.row.serial_number);
                      }
                    }

                    // change color for OK and NOK cels
                    getCellClassName={(params) => {
                      if (params.row[params.field] === "2") {
                        return "OK";
                      }
                      else if (params.row[params.field] === "1") {
                        return "NOK";
                      }
                      else {
                        return "";
                      }
                    }}

                  />
                </Box>
                :
                <DataGrid
                  rows={data2 ? data2 : []}
                  columns={gridColumns2}
                  columnVisibilityModel={myColumnVisibilityModel}
                  onColumnVisibilityModelChange={(model) => { setMyColumnVisibilityModel(model); }}
                  // Tool Bar
                  components={{
                    Toolbar: CustomToolbar,
                  }}
                  slots={{
                    // toolbar: CustomToolbar,
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

                />
            }
          </Grid>
        </Grid>
      </Box>


      {/* open graph button */}
      {/* <div class="gridButton">
      <Button onClick={toggleDrawer()} variant="contained" color='info'>Open Graph</Button>
    </div> */}
      {/* <Drawer
        anchor='right'
        open={drawer}
        onClose={toggleDrawer()}
    >
        <Box
          
          sx={{m:5, maxHeight:1000}}
        >
          <Graph />
        </Box>
    </Drawer> */}

    </div>

  );

}

