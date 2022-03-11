import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport} from '@mui/x-data-grid';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
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
      field: 'content',
      headerName: 'Content',
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: 'Data_Time',
      headerName: 'Data Time',
      width: 150,
      editable: false,
    },
  ];

export default function MyGrid() {
  
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/data1")
      .then((res) => res.json())
      .then((data) => setData(data.msg));//information from server
  }, []);
  
  const rows = data;

  return (
    <div style={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
