import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//station 10/20/30..合并
import StationGrid from './StationGrid';
import Station30Grid from './Station30Grid';
import Station40Grid from './Station40Grid';
import { resolveAllPadding } from '@antv/g2plot/lib/utils';

function TabPanel(props) {
    const { children, value, index, ...other } = props;                                             // ...other什么意思     { } = props什么意思

  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  const StationSectionBar = ({sendID}) => {
    //tab click
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
    
    const [dataArr, updateDataArr] = React.useState([]);
    const [data1, setData1] = React.useState(null);

    //let stationName = ["station10","station20","station30","station40"]
    //let dataX = []
  /* let dataX = {}

  React.useEffect(() => {
      let stationName = ["station10","station20","station30","station40"]
      for (let i = 0; i < stationName.length; i++) {
          dataX[i] = []
          let apiStr = "/api/" + stationName[i] + "/" + sendID;
          fetch(apiStr)
            .then((res) => res.json())
            .then((data) => dataX.push(data))
      }
  }, [sendID]); */
  //console.log(typeof dataX)
  //let dataX = []
  let stationName = ["station10","station20","station30","station40"]
      /* for (let i = 0; i < stationName.length; i++) {
          //dataX[i] = []
          let apiStr = "/api/" + stationName[i] + "/" + sendID;
          fetch(apiStr)
            .then((res) => res.json())
            //.then((data) => dataX = [...data])
            //.then((data) => dataX.push(data))
            //return Promise.resolve(timeT);
            
      }
      console.log(dataX) */
      //console.log(Object.keys(dataX))
      //console.log()  
    
    let dataX = [];
    let tempArr = [];
    let urls = stationName.map((str) =>  "/api/" + str + "/" + sendID);

    React.useEffect(() => {

      const getStationData = async () => {
        for (let i = 0; i < stationName.length; i++){
          await fetch(urls[i])
            .then((res) => res.json())
            .then((data) => updateDataArr(dataArr => [...dataArr, data]));
        }

        console.log('123');

        // await fetch(urls[0])
        //     .then((res) => res.json())
        //     .then((data) => {updateDataArr(dataArr => [...dataArr, data])});


      }

      getStationData().catch(console.error);

    
    }, []);
    //console.log(getStationData(urls[0]))
    // const Test = async () => {
    //   for (let i = 0; i < stationName.length; i++){
    //     let x = await getStationData(urls[i]);
    //     dataX.push(x);
    //     // dataX[i] = x;
    //   }
    // }


    // console.log(typeof dataX);
    console.log(dataArr);   //!!!!!!!!!!!!!!!!!!!可能await加循环需要在Promise.all()中书写。 建议换一种写法，参考analysis页面
    

    //dataX.push(Test())
    //console.log(dataX[0])
    //Test()
    /* function getStationData (url) {
      return fetch (url)
              .then(res => res.json())
              .then(data => {
                             return Promise.resolve(data);})
    }
    //console.log(getStationData(urls[0]).json)
    Promise.all(
      // use the urls to create an array of promises
      urls.map(getStationData)
    ).then((dataX) => {
      // When all the promises have been resolved, then this will be executed
      //Here all the promises have been resolved, so you would have an array with the ttTimes
      console.log(dataX);
    })
    //main()
    //console.log(dataX)

   // console.log(getStationData(urls[0]))

    const [stationData10, setStationData10] = React.useState(null);
    setStationData10(getStationData(urls[0]));
    console.log(stationData10) */



    //优化：有几个station?分别去哪里调取数据？写成循环的形式
    /* const [stationData10, setStationData10] = React.useState(null);
    const [stationData20, setStationData20] = React.useState(null);
    const [stationData30, setStationData30] = React.useState(null);
    const [stationData40, setStationData40] = React.useState(null);

    React.useEffect(() => {                          

        let apiStr = "/api/station10/" + sendID;

        fetch(apiStr)
          .then((res) => res.json())
          .then((data) => setStationData10(data)); 
          //.then((data) => dataX.push(data));               
      
    }, [sendID]);                                                  

    React.useEffect(() => {
        let apiStr = "/api/station20/" + sendID;

        fetch(apiStr)
          .then((res) => res.json())
          .then((data) => setStationData20(data));
          //.then((data) => dataX.push(data));
      
    }, [sendID]);

    React.useEffect(() => {
        let apiStr = "/api/station30/" + sendID;

        fetch(apiStr)
          .then((res) => res.json())
          .then((data) => setStationData30(data));
          //.then((data) => dataX.push(data));
      
    }, [sendID]);
    React.useEffect(() => {
        let apiStr = "/api/station40/" + sendID;

        fetch(apiStr)
          .then((res) => res.json())
          .then((data) => setStationData40(data));
          //.then((data) => dataX.push(data));
      
    }, [sendID]); */


    //console.log(stationData10) 

    //station 10,20...数据格式一样
    const nums = [10, 20, 30, 40]
    //const dataX = [stationData10, stationData20, stationData30, stationData40]
    //console.log(data[0])
    const listTabs = nums.map((num) => <Tab label={"Station " + num} {...a11yProps(num / 10 - 1)} />)
    //index 对应a11yProps()里的值
    // console.log(typeof nums);
    // console.log(dataArr);
    const listTabPanels = nums.map((num) => <TabPanel value={value} index={num / 10 - 1}>
                                                   <StationGrid stationData={dataArr[num / 10 - 1]} />
                                            </TabPanel>)

    //station 40数据格式
    /* const nums3 = [40]
    const data3 = [stationData40]
    const listTabs3 = nums3.map((num) => <Tab label={"Station " + num} {...a11yProps(num / 10 - 1)} />)
    const listTabPanels3 = nums3.map((num) => <TabPanel value={value} index={num / 10 - 1}>
                                                  <Station40Grid stationData40={data3[0]}/>       
                                              </TabPanel>) */

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {listTabs}
            {/* <Tab label="Station 10" {...a11yProps(0)} />
            <Tab label="Station 20" {...a11yProps(1)} />
            <Tab label="Station 30" {...a11yProps(2)} />
            <Tab label="Station 40" {...a11yProps(3)} /> */}
          </Tabs>
        </Box>
        {listTabPanels}
        {/* <TabPanel value={value} index={0}>
          <Station10Grid stationData10={stationData10}/>       
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Station20Grid stationData20={stationData20}/>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Station30Grid stationData30={stationData30}/>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Station40Grid stationData40={stationData40}/>
        </TabPanel> */}
      </Box>
    );
  }

  export default StationSectionBar