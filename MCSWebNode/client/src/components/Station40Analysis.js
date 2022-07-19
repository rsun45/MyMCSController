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
    field: 'id',
    headerName: 'Serial Number',
    width: 250,
    editable: false,
  },{
    field: 'TagStatus',
    headerName: 'Reject Code',
    width: 450,
    editable: false,
  },{
    field: 'CycleTime',
    headerName: 'Cycle Time',
    width: 250,
    editable: false,
  },
  
];


function dhm(ms){
  const days = Math.floor(ms / (24*60*60*1000));
  const daysms = ms % (24*60*60*1000);
  const hours = Math.floor(daysms / (60*60*1000));
  const hoursms = ms % (60*60*1000);
  const minutes = Math.floor(hoursms / (60*1000));
  const minutesms = ms % (60*1000);
  const sec = Math.floor(minutesms / 1000);

let temp ="";
if(days!==0){
  temp += days + "day(s) "
}
else if(hours!==0){
  temp += hours + "hour(s) "
}
else if(minutes!==0){
  temp += minutes + "minute(s) "
}
else if(sec!==0){
  temp += sec + "minute(s) "
}

return temp;
}

const calculateCT = ( t1, t2) => {
  let time1 = new Date(t1);
  let time2 = new Date(t2);
  let diff = time2.getTime() - time1.getTime();

  return dhm(diff);


}


export default function Station40Analysis({stationData40AllData}) {
  
  let data = [];

  let lastTime = null;
  let cycleTime = "N/A";
  if (stationData40AllData != null){
      for(let i = 0; i < stationData40AllData.length; i++) {

          if (stationData40AllData[i].tagName === "RejectCode"){
              if (lastTime != null){
                cycleTime = calculateCT(lastTime, stationData40AllData[i].EndTime);
              }
              else {
                cycleTime = "N/A";
              }
              
              lastTime = stationData40AllData[i].EndTime;

            let temp = {id:stationData40AllData[i].id, SerialNumber:stationData40AllData[i].SerialNumber, TagStatus:stationData40AllData[i].tagValue, CycleTime:cycleTime};
            data.push(temp);
          }

      }
  }


  const [pageSize, setPageSize] = React.useState(20);


  return (
    <div style={{ height: 1000,  width: '100%'}}>
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

        // checkboxSelection
        disableSelectionOnClick

        


      />
    </div>
  );
  
}

