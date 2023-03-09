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

export default function OptionalFunction1(/* {stationData10} */ props) {                    // props这里可以代表所有传过来的信息，然后用props.去调取。注意名字要和传过来的时候一致
  
  // const [pageSize, setPageSize] = React.useState(20);
  // console.log(props)


  const [data, setData] = React.useState(null);

  React.useEffect(() => {                               
    fetch("/api/top-5-reject-nuts")                           
        .then((res) => res.json())                 
        .then((data) => setData(data));             
    }, []);



  return (
    <div style={{ height: '81%',  width: '100%'}}>
      <DataGrid
        rows = {data}
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

