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
    field: 'SumFaultTime',
    headerName: 'Sum Fault Time',
    width: 250,
    editable: false,
  },
  
];

export default function SumFaultTimeByStations( {refresh} ) {                    // props这里可以代表所有传过来的信息，然后用props.去调取。注意名字要和传过来的时候一致
  
  // const [pageSize, setPageSize] = React.useState(20);
  // console.log(props)


  const [data, setData] = React.useState([]);

  React.useEffect(() => {                               
    fetch("/api/SumFaultTimeByStations")                           
        .then((res) => res.json())                 
        .then((data) => {setData(data);});             
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

      <BarChartComp barChartData={data} xTitle={"tag_name"} yTitle={"SumFaultTime"} barColor={"#f56767"} />


    </div>
  );
  
}

