import React from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function MaintenanceSummaryComp({refresh}) {
  

  const [maintenanceData, setMaintenanceData] = React.useState([]);

  React.useEffect(() => {

    fetch("/api/MaintenancePage/getAllMaintenance")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        for (let i=0; i<data.length; i++){
          data[i].id = i;
        }
        setMaintenanceData([...data]);

      });


  }, [refresh]);

  const columns = [
    {
      field: 'TagName',
      headerName: 'Tag Name',
      width: 170,
      editable: false,
    },
    {
      field: 'Percentage',
      headerName: 'Percentage',
      type: 'string',
      width: 80,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (value) => {
        const preset = Number(value.row.PresetNumber);
        const current = Number(value.row.CurrentNumber);
        return Math.round((current/preset)*100) + "%";
      },
    },
    {
      field: 'CurrentNumber',
      headerName: 'Current',
      type: 'number',
      width: 80,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
    },
    {
      field: 'PresetNumber',
      headerName: 'Preset',
      width: 80,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      type: 'number',
    },
  ];


  return (
    <div style={{ height: "80%"}}>
      <DataGrid
        rows={maintenanceData}
        columns={columns}
        density="compact"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pageSizeOptions={[100]}
        disableRowSelectionOnClick
        // autoHeight
        sx={{fontSize: "12px"}}
        hideFooter
      />
      
    </div>
  );
}
