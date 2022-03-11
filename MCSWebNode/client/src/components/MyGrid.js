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
    sortable: false,
  },
  {
    field: 'tag_add_dt',
    headerName: 'Add Date',
    width: 300,
    editable: false,
  },
  {
    field: 'controller_ip',
    headerName: 'Controller_IP',
    width: 300,
    editable: false,
  },
  {
    field: 'category_id',
    headerName: 'Category_ID',
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
  
  const rows = data;

  const [pageSize, setPageSize] = React.useState(20);
  
  return (
    <div style={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={rows}
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
