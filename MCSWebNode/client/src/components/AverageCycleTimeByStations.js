import * as React from 'react';
import { DataGrid, 
         GridToolbarDensitySelector,
         GridToolbarContainer, 
         GridToolbarExport,
         GridToolbarColumnsButton,
         GridToolbarFilterButton,
       } from '@mui/x-data-grid';

import BarChartComp from './BarChartComp';

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
    field: 'tag_name',
    headerName: 'Station Name',
    width: 250,
    editable: false,
  },{
    field: 'avgCycleTime',
    headerName: 'Average Cycle Time',
    width: 250,
    editable: false,
  },
  
];

export default function AverageCycleTimeByStations( {refresh} ) {                    // props这里可以代表所有传过来的信息，然后用props.去调取。注意名字要和传过来的时候一致
  
  const [data, setData] = React.useState([]);
  
  const [baselineValue, setBaselineValue] = React.useState(null);

  React.useEffect(() => {                               
    fetch("/api/AverageCycleTimeByStations")                           
        .then((res) => res.json())                 
        .then((data) => {setData(data); });       
        


    fetch("/api/MonitorPage/getBaselineValue")
      .then((res) => res.json())
      .then((data) => setBaselineValue(data.baselineValue));


    }, [refresh]);

  return (
    <div style={{ height: '90%',  width: '100%'}}>
      {/* <DataGrid
        rows = {data}
        columns={columns}
        //Tool Bar
        components={{
          Toolbar: CustomToolbar,
        }}
        // checkboxSelection
        disableSelectionOnClick

      /> */}


      <BarChartComp barChartData={data} xTitle={"tag_name"} yTitle={"avgCycleTime"} baselineValue={baselineValue}/>



    </div>
  );
  
}

