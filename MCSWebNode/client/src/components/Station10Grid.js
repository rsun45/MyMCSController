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
    field: 'PartId',
    headerName: 'Part Id',
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
  },
  
];

export default function Station10Grid(/* {stationData10} */ props) {                    // props这里可以代表所有传过来的信息，然后用props.去调取。注意名字要和传过来的时候一致
  
  const [pageSize, setPageSize] = React.useState(20);
  console.log(props)

  return (
    <div style={{ height: 1000,  width: '100%'}}>
      <DataGrid
        rows = {props.stationData10}
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

