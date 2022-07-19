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
/* const columns = [
  {
    field: 'SerialNumber',
    headerName: 'Serial Number',
    width: 250,
    editable: false,
  },{
    field: 'tagName',
    headerName: 'Tag Name',
    width: 250,
    editable: false,
  },{
    field: 'TagStatus',
    headerName: 'Tag Status',
    width: 250,
    editable: false,
  },
  
]; */

//const columns;

export default function StationGrid(/* {stationData10} */ {stationData}) {                    // props这里可以代表所有传过来的信息，然后用props.去调取。注意名字要和传过来的时候一致
  // console.log(indexNum);
  const [pageSize, setPageSize] = React.useState(20);

  console.log(stationData);
  
  let columns = [];
  if (stationData!== undefined && stationData !== null && (stationData[0].tagName === "RejectCode" || stationData[0].tagName === "ScannerCode" )){
    //station 40的情况
    columns = [
      {
        field: 'SerialNumber',
        headerName: 'Serial Number',
        width: 250,
        editable: false,
      },{
        field: 'tagName',
        headerName: 'Tag Name',
        width: 250,
        editable: false,
      },{
        field: 'TagStatus',
        headerName: 'Tag Status',
        width: 250,
        editable: false,
      },{
        field: 'tagValue',
        headerName: 'Tag Value',
        width: 250,
        editable: false,
      },
      
    ];

  }
  else if (stationData!== undefined && stationData !== null && stationData[0].TagStatus === "" && (stationData[0].tagName !== "RejectCode" && stationData[0].tagName !== "ScannerCode" )){
    //station 30的情况
      columns = [
        {
          field: 'SerialNumber',
          headerName: 'Serial Number',
          width: 250,
          editable: false,
        },{
          field: 'tagName',
          headerName: 'Tag Name',
          width: 250,
          editable: false,
        },{
          field: 'tagValue',
          headerName: 'Tag Value',
          width: 250,
          editable: false,
        },
        
      ];
  }
  else if (stationData!== undefined && stationData !== null && (stationData[0].TagStatus.toUpperCase() === "OK" || stationData[0].TagStatus.toUpperCase() === "NOK")){
    //station 10的情况
      columns = [
      {
        field: 'SerialNumber',
        headerName: 'Serial Number',
        width: 250,
        editable: false,
      },{
        field: 'tagName',
        headerName: 'Tag Name',
        width: 250,
        editable: false,
      },{
        field: 'TagStatus',
        headerName: 'Tag Status',
        width: 250,
        editable: false,
      },
      
    ];
  }

  return (
    <div style={{ height: 1000,  width: '100%'}}>
      <DataGrid
        rows = {stationData}
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

