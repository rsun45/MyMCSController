import React from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function ActiveAlarmSummaryComp({refresh}) {
  

  const [activeAlarm, setActiveAlarm] = React.useState([]);

  React.useEffect(() => {

    const fetchData = async () => { fetch("/api/AlarmPage/getAlarmActivityForWeb")                            
      .then((res) => res.json())                  
      .then((data) => {
        // console.log(data.alarmContent);
        setActiveAlarm([...data.alarmContent]);
        
      });    
    }
    
    fetchData();


  }, [refresh]);

  const columns = [
    {
      field: 'TagName',
      headerName: 'Tag Name',
      width: 150,
      editable: false,
    }, {
      field: 'TotalDuration',
      headerName: 'Total Duration (Minutes)',
      width: 150,
      editable: false,
      type:"number",
      headerAlign: 'center',
      align: 'center'
    }, {
      field: 'EventTime',
      headerName: 'Event Time',
      width: 150,
      editable: false,
      type: 'dateTime',
      valueGetter: (value) => value && new Date(value),
    }, {
      field: 'TagDescription',
      headerName: 'Tag Description',
      width: 200,
      editable: false,
    }, 

  ];


  return (
    <div style={{ height: "80%"}}>
      <DataGrid
        rows={activeAlarm}
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
