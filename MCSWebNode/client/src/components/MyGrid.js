import * as React from 'react';
import './MyGrid.css';
import { DataGrid, 
         GridToolbarDensitySelector,
         GridToolbarContainer, 
         GridToolbarExport,
         GridToolbarColumnsButton,
         GridToolbarFilterButton,
       } from '@mui/x-data-grid';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Graph from './Graph';
import Box from "@mui/material/Box";


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

function getFullTime(params) {
  return `${params.row.tag_add_dt.substr(0, params.row.tag_add_dt.indexOf('T')) || ''} ${params.row.tag_add_dt.substr(params.row.tag_add_dt.indexOf('T') + 1, params.row.tag_add_dt.length) || ''}`
}

//表头
const columns = [
  {
    field: 'tagName',
    headerName: 'Tag Name',
    width: 150,
    editable: false,
  },
  {
    field: 'tag_cont',
    headerName: 'Tag',
    width: 400,
    editable: false,
  },
  {
    field: 'tag_add_dt',
    headerName: 'Add Date',
    width: 500,
    editable: false,
    //这里type暂时选择用dateTime,这样可以显示出秒。之前是date
    //type: 'dateTime',
    valueGetter: getFullTime,
    /* valueGetter: ({ value }) => {
      var newDate = new Date(value);
      newDate.setHours(newDate.getHours() + 5);
      // console.log(newDate.setHours(newDate.getHours() + 5));
      return newDate}, */
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 300,
    editable: false,
  },
];

export default function MyGrid() {
  
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/data02")
      .then((res) => res.json())
      .then((data) => setData(data));//information from server
  }, []);

  //console.log(typeof(data[0].tag_add_dt))

  // drawer for graph
  const [drawer, setDrawer] = React.useState(false);

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawer(!drawer);
  };

  const [pageSize, setPageSize] = React.useState(20);

  return (
    <div style={{ height: 1000,  width: '100%'}}>
      <DataGrid
        rows = {data}
        columns={columns}
        //Tool Bar
        components={{
          Toolbar: CustomToolbar,
        }}
        //分页
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[20, 50]}
        pagination

        // checkboxSelection
        disableSelectionOnClick


      />
    <div class="gridButton">
      <Button onClick={toggleDrawer()} variant="contained" color='info'>Open Graph</Button>
    </div>
    <Drawer
        anchor='right'
        open={drawer}
        onClose={toggleDrawer()}
    >
        <Box
          /* 可以再调整 */
          sx={{p: 20, width: 1000}}
        >
          <Graph />
        </Box>
    </Drawer>
    </div>
  );
  
}

