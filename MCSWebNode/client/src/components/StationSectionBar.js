import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Station10Grid from './Station10Grid';
import Station20Grid from './Station20Grid';
import Station30Grid from './Station30Grid';
import Station40Grid from './Station40Grid';

function TabPanel(props) {
    const { children, value, index, ...other } = props;                             // ...other什么意思     { } = props什么意思
  
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


  export default function StationSectionBar({sendID}) {                         
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [stationData10, setStationData10] = React.useState(null);
    const [stationData20, setStationData20] = React.useState(null);
    const [stationData30, setStationData30] = React.useState(null);
    const [stationData40, setStationData40] = React.useState(null);

    React.useEffect(() => {                          

        let apiStr = "/api/station10/" + sendID;

        fetch(apiStr)
          .then((res) => res.json())
          .then((data) => setStationData10(data));                
      
    }, [sendID]);                                                  

    React.useEffect(() => {
        let apiStr = "/api/station20/" + sendID;

        fetch(apiStr)
          .then((res) => res.json())
          .then((data) => setStationData20(data));
      
    }, [sendID]);
    React.useEffect(() => {
        let apiStr = "/api/station30/" + sendID;

        fetch(apiStr)
          .then((res) => res.json())
          .then((data) => setStationData30(data));
      
    }, [sendID]);
    React.useEffect(() => {
        let apiStr = "/api/station40/" + sendID;

        fetch(apiStr)
          .then((res) => res.json())
          .then((data) => setStationData40(data));
      
    }, [sendID]);
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Station 10" {...a11yProps(0)} />
            <Tab label="Station 20" {...a11yProps(1)} />
            <Tab label="Station 30" {...a11yProps(2)} />
            <Tab label="Station 40" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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
        </TabPanel>
      </Box>
    );
  }