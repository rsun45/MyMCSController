import * as React from 'react';
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

// top 5 reject nuts
//表头
const columns = [
  {
    field: 'tagName',
    headerName: 'Tag Name',
    width: 250,
    editable: false,
  },{
    field: 'rejectCount',
    headerName: 'Reject Count',
    width: 250,
    editable: false,
  },
  
];

export default function SummaryFailGrid({shiftData}) {                    // props这里可以代表所有传过来的信息，然后用props.去调取。注意名字要和传过来的时候一致
  
  // const [pageSize, setPageSize] = React.useState(20);
  console.log(shiftData);

  return (
    <div style={{ height: '100%',  width: '100%'}}>
      <DataGrid
        rows = {shiftData}
        columns={columns}
        //Tool Bar
        components={{
          Toolbar: CustomToolbar,
        }}
        //分页
        // pageSize={pageSize}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        // rowsPerPageOptions={[20, 50]}
        // pagination

        // checkboxSelection
        disableSelectionOnClick

        


      />
    </div>
  );
  
}

