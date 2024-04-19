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


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

// function getFullTime(params) {
//   return `${params.row.tag_add_dt.substr(0, params.row.tag_add_dt.indexOf('T')) || ''} ${params.row.tag_add_dt.substr(params.row.tag_add_dt.indexOf('T') + 1, params.row.tag_add_dt.length) || ''}`
// }

//表头
const columns = [
  {
    field: 'serialNumber',
    headerName: 'Serial Number',
    width: 150,
    editable: false,
  },{
    field: 'PartStatus',
    headerName: 'Part State',
    width: 150,
    editable: false,
  },{
    field: 'SourceStation',
    headerName: 'Source Station',
    width: 150,
    editable: false,
  },{
    field: 'TargetStation',
    headerName: 'Target Station',
    width: 150,
    editable: false,
  },{
    field: 'PartType',
    headerName: 'Type',
    width: 100,
    editable: false,
  },{
    field: 'wpcNumber',
    headerName: 'Wpc Number',
    width: 100,
    editable: false,
  },{
    field: 'starttime',
    headerName: 'Start Time',
    width: 300,
    editable: false,
    //这里type暂时选择用dateTime,这样可以显示出秒。之前是date
    type: 'dateTime',
    // valueGetter: getFullTime,
      valueGetter: ({ value }) => {
      var newDate = new Date(value);
      newDate.setHours(newDate.getHours()+4);
      // console.log(newDate.setHours(newDate.getHours() + 5));
      return newDate}, 
  },{
    field: 'endtime',
    headerName: 'End Time',
    width: 300,
    editable: false,
    //这里type暂时选择用dateTime,这样可以显示出秒。之前是date
    type: 'dateTime',
    // valueGetter: getFullTime,
      valueGetter: ({ value }) => {
      var newDate = new Date(value);
      newDate.setHours(newDate.getHours()+4);
      // console.log(newDate.setHours(newDate.getHours() + 5));
      return newDate}, 
  },
  
];

export default function QueryPage() {
  
  // grid rows
  const [data, setData] = React.useState(null);
  // grid columns
  const [gridColumns, setGridColumns] = React.useState([]);
  // station and tag mappings; {a:["tag1","tag2"], b:[tag3]}
  const [stationTagMap, setStationTagMap] = React.useState({});

  
  React.useEffect(() => { 
    // get station and tagTitle mapping data
    fetch("/api/QueryPage/stationAndTagTitleMapping")
    .then((res) => res.json())
    .then((data) => {
      let tempStationTagMap = {};
      for (const it of data){
        let tempStationName = it.tagName.split(".")[0];
        if (tempStationTagMap.hasOwnProperty(tempStationName)){
          tempStationTagMap[tempStationName].push(it.tagTitle);
        }
        else {
          tempStationTagMap[tempStationName] = [it.tagTitle];
        }
      }
      setStationTagMap(tempStationTagMap);
      // console.log(tempStationTagMap);
    });  
      
    // get all rows from database
    // fetch("/api/QueryPage/getQuery")
    //     .then((res) => res.json())
    //     .then((data) => {setData(data);});  
        

  }, []);

  // after get all data, get all columns
  React.useEffect(() => { 
    if (data){           
      let tempGridColumns = [];
      for (const key in data[0]) {
        // dont show id column
        if (key === "id"){
          continue;
        }
        
        // console.log(key + " - " + data[0][key]);
        tempGridColumns.push(
          {
            field: key,
            headerName: key,
            width: 150,
            editable: false,
          }
        );
      }
      setGridColumns(tempGridColumns);
    }
       
  }, [data]);

  
  



  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );



  const [pageSize, setPageSize] = React.useState(100);

  // change page
  const navigate = useNavigate();

  return (

    /* 数据表格部分 */
    <div style={{ height:'83vh',  width: '100%'}}>
      <TimeSelector data={data} setData={setData} />

      <Box sx={{ flexGrow: 1, height:"100%", marginTop: 1 }}>
        <Grid container spacing={1} sx={{ height:"100%" }}>
          <Grid item xs={1}>
            <div>
              <FormControlLabel
                label="Parent"
                control={
                  <Checkbox
                    checked={checked[0] && checked[1]}
                    indeterminate={checked[0] !== checked[1]}
                    onChange={handleChange1}
                  />
                }
              />
              {children}
            </div>
            

          </Grid>
          <Grid item xs={11}>
              <DataGrid
                rows={data}
                columns={gridColumns}
                //Tool Bar
                components={{
                  Toolbar: CustomToolbar,
                }}
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
                    console.log(params);
                    navigate('serial', { state: { id: params.id } });
                  }
                }


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

