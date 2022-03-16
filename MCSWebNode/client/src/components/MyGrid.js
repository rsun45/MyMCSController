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
];

export default function MyGrid() {
  
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/fakeData02")
      .then((res) => res.json())
      .then((data) => setData(data));//注意：之前这里是data.msg（之前JSON里有msg: []）
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

