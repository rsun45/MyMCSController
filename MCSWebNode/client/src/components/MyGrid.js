import * as React from 'react';
import './MyGrid.css';
import { DataGrid, 
         GridToolbarDensitySelector,
         GridToolbarContainer, 
         GridToolbarExport,
         GridToolbarColumnsButton,
         GridToolbarFilterButton,
       } from '@mui/x-data-grid';

// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import Graph from './Graph';
// import Box from "@mui/material/Box";
import TimeSelector from './TimeSelector';
import { useNavigate } from "react-router-dom"


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

// function getFullTime(params) {
//   return `${params.row.tag_add_dt.substr(0, params.row.tag_add_dt.indexOf('T')) || ''} ${params.row.tag_add_dt.substr(params.row.tag_add_dt.indexOf('T') + 1, params.row.tag_add_dt.length) || ''}`
// }

//表头
const columns = [
  {
    field: 'PartState',
    headerName: 'Part State',
    width: 150,
    editable: false,
  },{
    field: 'SerialNumber',
    headerName: 'Serial Number',
    width: 150,
    editable: false,
  },{
    field: 'SourceStationId',
    headerName: 'Source StationId',
    width: 150,
    editable: false,
  },{
    field: 'TargetStationId',
    headerName: 'Target StationId',
    width: 150,
    editable: false,
  },{
    field: 'Type',
    headerName: 'Type',
    width: 100,
    editable: false,
  },{
    field: 'WpcNumber',
    headerName: 'Wpc Number',
    width: 100,
    editable: false,
  },{
    field: 'StartTime',
    headerName: 'Start Time',
    width: 300,
    editable: false,
    //这里type暂时选择用dateTime,这样可以显示出秒。之前是date
    type: 'dateTime',
    // valueGetter: getFullTime,
      valueGetter: ({ value }) => {
      var newDate = new Date(value);
      newDate.setHours(newDate.getHours()+4);
      // console.log(newDate.setHours(newDate.getHours() + 5));
      return newDate}, 
  },{
    field: 'EndTime',
    headerName: 'End Time',
    width: 300,
    editable: false,
    //这里type暂时选择用dateTime,这样可以显示出秒。之前是date
    type: 'dateTime',
    // valueGetter: getFullTime,
      valueGetter: ({ value }) => {
      var newDate = new Date(value);
      newDate.setHours(newDate.getHours()+4);
      // console.log(newDate.setHours(newDate.getHours() + 5));
      return newDate}, 
  },
  
];

export default function MyGrid() {
  
  const [data, setData] = React.useState(null);

  React.useEffect(() => {                           //useEffect(() => {}, []这里空的，表示只渲染一次)      
    fetch("/api/data01")                            //  fetch(地址)
        .then((res) => res.json())                  //    .then(response => response.json())
        .then((data) => setData(data));             //    .then(data => console.log(data));  
                                                    //最简单的用法是只提供一个参数用来指明想 fetch() 到的资源路径，然后返回一个包含响应结果的 promise（一个 Response 对象）。
                                                    //当然它只是一个 HTTP 响应，而不是真的 JSON。为了获取JSON的内容，我们需要使用 json() 方法（该方法返回一个被解析为JSON格式的promise对象，这可以是任何可以由JSON表示的东西 - 一个object，一个array，一个string，一个number...
    }, []);

  //console.log(data);

  // drawer for graph
  // const [drawer, setDrawer] = React.useState(false);

  // const toggleDrawer = () => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }

  //   setDrawer(!drawer);
  // };

  const [pageSize, setPageSize] = React.useState(20);

  // change page
  const navigate = useNavigate();

  return (

    /* 数据表格部分 */
    <div style={{ height: 1000,  width: '100%'}}>
      <TimeSelector data={data} setData={setData} />
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

        // double click event
        onCellDoubleClick={
          (params) => {
            //console.log(params);
            navigate('serical', { state: {id:params.id} });
          }
        }


      />

    {/* open graph button */}
    {/* <div class="gridButton">
      <Button onClick={toggleDrawer()} variant="contained" color='info'>Open Graph</Button>
    </div>
    <Drawer
        anchor='right'
        open={drawer}
        onClose={toggleDrawer()}
    >
        <Box
          
          sx={{p: 20, width: 1000}}
        >
          <Graph />
        </Box>
    </Drawer> */}
    </div>

  );
  
}

