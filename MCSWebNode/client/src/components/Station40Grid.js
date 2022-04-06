import * as React from 'react';
import './MyGrid.css';
import { DataGrid, 
         GridToolbarDensitySelector,
         GridToolbarContainer, 
         GridToolbarExport,
         GridToolbarColumnsButton,
         GridToolbarFilterButton,
       } from '@mui/x-data-grid';



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
    field: 'SerialNumber',
    headerName: 'Serial Number',
    width: 250,
    editable: false,
  },{
    field: 'tagName',
    headerName: 'Tag Name',
    width: 250,
    editable: false,
  },{
    field: 'TagStatus',
    headerName: 'Tag Status',
    width: 250,
    editable: false,
  },{
    field: 'tagValue',
    headerName: 'Tag Value',
    width: 250,
    editable: false,
  },
  
];

export default function Station40Grid({stationData40}) {
  
  console.log(stationData40)


  const [pageSize, setPageSize] = React.useState(20);


  return (
    <div style={{ height: 1000,  width: '100%'}}>
      <DataGrid
        rows = {stationData40}
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
    </div>
  );
  
}

