import * as React from 'react';
import { DataGrid, 
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
  
  const [pageSize, setPageSize] = React.useState(20);

  return (
    <div style={{ height: 1000, width: '100%' }}>
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

        checkboxSelection
        disableSelectionOnClick

      />
    </div>
  );
  
}

