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

//表头
const columns = [
  { field: 'id', 
    headerName: 'ID', 
    width: 90,
    editable: false,
  },
  {
    field: 'tag_cont',
    headerName: 'Tag',
    width: 150,
    editable: false,
  },
  {
    field: 'tag_add_dt',
    headerName: 'Add Date',
    width: 300,
    editable: false,
    type: 'dateTime',
    valueGetter: ({ value }) => {
      var newDate = new Date(value);
      newDate.setHours(newDate.getHours() + 5);
      // console.log(newDate.setHours(newDate.getHours() + 5));
      return newDate},
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 300,
    editable: false,
  },
  {
    field: 'tagName',
    headerName: 'Tag Name',
    width: 300,
    editable: false,
  },
];

export default function MyGrid() {
  
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/fakeData02")
      .then((res) => res.json())
      .then((data) => setData(data.msg));//information from server
  }, []);



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
        <Graph />
      </Drawer>
    </div>
  );
  
}

