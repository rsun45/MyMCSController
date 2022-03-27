import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Station10Analysis from './Station10Analysis';
import Station20Analysis from './Station20Analysis';
import Station30Analysis from './Station30Analysis';
import Station40Analysis from './Station40Analysis';



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
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





  
  export default function AnalysisPage() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    

    const [stationData10AllData, setStationData10AllData] = React.useState(null);
    const [stationData20AllData, setStationData20AllData] = React.useState(null);
    const [stationData30AllData, setStationData30AllData] = React.useState(null);
    const [stationData40AllData, setStationData40AllData] = React.useState(null);

    
        

    React.useEffect(() => {                          

        const fetchData10 = async () => {
            await fetch("/api/station10-allData")
            .then((res) => res.json())
            .then((data) => setStationData10AllData(data));
          }

        const fetchData20 = async () => {
            await fetch("/api/station20-allData")
            .then((res) => res.json())
            .then((data) => setStationData20AllData(data));
          }

        const fetchData30 = async () => {
            await fetch("/api/station30-allData")
            .then((res) => res.json())
            .then((data) => setStationData30AllData(data));
          }
          
        const fetchData40 = async () => {
            await fetch("/api/station40-allData")
            .then((res) => res.json())
            .then((data) => setStationData40AllData(data));
          }

          // call the function
        fetchData10()
            // make sure to catch any error
            .catch(console.error);

        fetchData20().catch(console.error);
        
        fetchData30().catch(console.error);
        
        fetchData40().catch(console.error);
      
      
    }, []);                                                  

    // React.useEffect(() => {
    //     let apiStr = "/api/station20-allData";

    //     fetch(apiStr)
    //       .then((res) => res.json())
    //       .then((data) => setStationData20AllData(data));
      
    // }, []);
    // React.useEffect(() => {
    //     let apiStr = "/api/station30-allData";

    //     fetch(apiStr)
    //       .then((res) => res.json())
    //       .then((data) => setStationData30AllData(data));
      
    // }, []);
    // React.useEffect(() => {
    //     let apiStr = "/api/station40-allData";

    //     fetch(apiStr)
    //       .then((res) => res.json())
    //       .then((data) => setStationData40AllData(data));
      
    // }, []);









  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary" indicatorColor="secondary">
            <Tab label="Station 10" {...a11yProps(0)} />
            <Tab label="Station 20" {...a11yProps(1)} />
            <Tab label="Station 30" {...a11yProps(2)} />
            <Tab label="Station 40" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Station10Analysis stationData10AllData={stationData10AllData}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Station20Analysis stationData20AllData={stationData20AllData}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Station30Analysis stationData30AllData={stationData30AllData}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Station40Analysis stationData40AllData={stationData40AllData}/>
        </TabPanel>
      </Box>
    );
  }