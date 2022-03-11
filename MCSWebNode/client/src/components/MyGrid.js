import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';



  const columns1 = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'content',
      headerName: 'Content',
      width: 150,
      editable: false,
    },
    {
      field: 'Data_Time',
      headerName: 'Data Time',
      width: 150,
      editable: false,
    },
  ];

//   const rows1 = [
//     { id: 1, content:'test 1', Data_Time:'3/10/2022 18:21:00'},
//     { id: 2, content:'test 2', Data_Time:'3/10/2022 18:21:10'},
//     { id: 3, content:'test 3', Data_Time:'3/10/2022 18:21:20'},
//     { id: 4, content:'test 4', Data_Time:'3/10/2022 18:21:30'},
//     { id: 5, content:'test 5', Data_Time:'3/10/2022 18:21:40'},
//     { id: 6, content:'test 6', Data_Time:'3/10/2022 18:21:50'},

// ];


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function MyGrid() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/data1")
      .then((res) => res.json())
      .then((data) => setData(data.msg));
  }, []);
  
  const rows1 = data;

  
  return (
    <div style={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={rows1}
        columns={columns1}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
