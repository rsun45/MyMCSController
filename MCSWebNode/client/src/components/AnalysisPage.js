import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StationAnalysisCombine from './StationAnalysisCombine';
import AnalysisAllStationLineChart from './AnalysisAllStationLineChart';



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


        

    // stations array
    let stationArr = ["Line Chart", "Other"];

    let tabItems = [];

    for (const [index, value] of stationArr.entries()) {
      tabItems.push(<Tab key={index} label={value} {...a11yProps(index)} />)
    }


  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary" indicatorColor="secondary">
            {tabItems}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AnalysisAllStationLineChart />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1>Other</h1>
        </TabPanel>
      </Box>
    );
  }