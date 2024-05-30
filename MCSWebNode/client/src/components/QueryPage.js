import * as React from 'react';
import './MyGrid.css';
import { DataGrid, 
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
import { AllPagesContext } from '../App';
import Button from '@mui/material/Button';




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

export default function QueryPage() {
  
  // grid rows
  // const [queryPagedata, setQueryPagedata] = React.useState(null);
  const {queryPagedata, setQueryPagedata} = React.useContext(AllPagesContext);

  // grid columns
  const [gridColumns, setGridColumns] = React.useState([]);
  // station and tag mappings; [[a,["tag1","tag2"]], [b,[tag3]]]
  const [stationTagMap, setStationTagMap] = React.useState(new Map());

  
  const [loadingProcess, setLoadingProcess] = React.useState(false);

  

  
  React.useEffect(() => { 
    // get station and tagTitle mapping data
    fetch("/api/QueryPage/stationAndTagTitleMapping")
    .then((res) => res.json())
    .then((data) => {
      let tempStationTagMap = new Map();
      for (const it of data){
        let tempStationName = it.tagName.split(".")[0];
        if (tempStationTagMap.has(tempStationName)){
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
    for (let i=0; i<checked.length; i++){
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
    if (stationTagMap.size > 0){
      for (let i=0; i<stationTagMap.size; i++){
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
        if (!checked[i]){
          for(let j = 0; j < stationTagMapArr[i][1].length; j++){
            tempVisibility[stationTagMapArr[i][1][j]] = false;
          }
        }
      }
      setMyColumnVisibilityModel(tempVisibility);
      
    }

  }, [checked]);


  


  // after get all data, get all columns
  React.useEffect(() => {
    if (queryPagedata) {
      let tempGridColumns = [];

      for (const key in queryPagedata[0]) {
        let value;
        for (let i = 0; i < queryPagedata.length; i++) {
          if (queryPagedata[i][key]) {
            value = queryPagedata[i][key];
            break;
          }
        }
        // dont show id column
        if (key === "id") {
          continue;
        }

        // console.log(key + " - " + data[0][key]);
        if (key === "SerialNumber") {
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
        else if (key === "startTime" || key === "endTime" || (Date.parse(value) && value.includes('T'))) {
          tempGridColumns.push(
            {
              field: key,
              headerName: key,
              width: 180,
              editable: false,
              headerAlign: 'center',
              align: 'center',
              type: 'dateTime',
              valueGetter: ({ value }) => {
                var newValue = value.replace("T", " ").split(".")[0];
                return newValue
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
       
  }, [queryPagedata]);

  
  



  // filter state
  const [filterModel, setFilterModel] = React.useState({items: []});
  // sort state
  const [sortModel, setSortModel] = React.useState([]);
  // disable rule button
  const [disableRuleButton, setDisableRuleButton] = React.useState(-1);



  // customized filter and sorting rules
  const FilterRule1OnClick = () =>{
    setDisableRuleButton(0);
    // only show first which is station 10 operator data
    for (let i=0; i<checked.length; i++){
      checked[i] = false;
    }
    checked[0] = true;
    setChecked([...checked]);

    // filter wait table turn is 0
    setFilterModel({
      items: [
        {
          columnField: '10Op.WaitTableTurn',
          operatorValue: '=',
          value: "0",
        },
      ],
    });

    // sorting total time desc
    setSortModel([{field: "10Op.TotalTime", sort: "desc"}]);


  };

  const FilterRule1 = () => {
    return (
      <Button variant="outlined" sx={{ height: 30, width:150, ml: 5 }} onClick={()=>{FilterRule1OnClick()}} disabled={disableRuleButton===0} >Rule 1</Button>
    );
  };


  // clear rule
  const clearRuleOnClick = () =>{
    setDisableRuleButton(-1);
    // only show first which is station 10 operator data
    for (let i=0; i<checked.length; i++){
      checked[i] = true;
    }
    setChecked([...checked]);

    // filter wait table turn is 0
    setFilterModel({
      items: [],
    });

    // sorting total time desc
    setSortModel([]);


  };
  
  const ClearRule = () => {
    return (
      <Button variant="outlined" sx={{ height: 30, width:150, ml: 5 }} onClick={()=>{clearRuleOnClick()}}>Clear</Button>
    );
  };




  // customize data grid tool bar
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <FilterRule1 />
        <ClearRule />
      </GridToolbarContainer>
    );
  }





  const [pageSize, setPageSize] = React.useState(100);

  // change page
  const navigate = useNavigate();

  return (

    /* 数据表格部分 */
    <div style={{ height:'83vh',  width: '100%'}}>
      <TimeSelector data={queryPagedata} setData={setQueryPagedata} setLoadingProcess={setLoadingProcess} />

      <Box sx={{ flexGrow: 1, height:"100%", marginTop: 1, pl:2 }}>
        <Grid container spacing={1} sx={{ height:"100%" }}>
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
                      control={<Checkbox id={""+index} checked={checked[index]===true||checked[index]===false?checked[index]:true} onChange={handleChildChange} />}
                    />

                  );
                })}
              </Box>
            </div>
            

          </Grid>
          <Grid item xs={10.5}>
            <DataGrid
              rows={queryPagedata || []}
              columns={gridColumns}
              columnVisibilityModel={myColumnVisibilityModel}
              onColumnVisibilityModelChange={(model)=>{setMyColumnVisibilityModel(model);}}
              // filter
              filterModel={filterModel}
              onFilterModelChange={(newFilterModel) => {setFilterModel(newFilterModel); setDisableRuleButton(-1);}}
              // sort
              sortModel={sortModel}
              onSortModelChange={(newSortModel) => {setSortModel(newSortModel); setDisableRuleButton(-1);}}



              density="compact"
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
              // onCellDoubleClick={
              //   (params) => {
              //     console.log(params);
              //     navigate('serial', { state: { id: params.id } });
              //   }
              // }


            />
          </Grid>
        </Grid>
      </Box>
      

    {/* open graph button */}
    {/* <div class="gridButton">
      <Button onClick={toggleDrawer()} variant="contained" color='info'>Open Graph</Button>
    </div>
    <Drawer
        anchor='right'
        open={drawer}
        onClose={toggleDrawer()}
    >
        <Box
          
          sx={{p: 20, width: 1000}}
        >
          <Graph />
        </Box>
    </Drawer> */}
    </div>

  );
  
}

