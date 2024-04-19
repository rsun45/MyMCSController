import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import './SectionTabs.css';


  
  export default function SectionTabs() {


    const [value, setValue] = React.useState({ activeTab: 'SummaryPage' });

    const handleChange = (event, newValue) => {
      setValue({ activeTab: newValue || 'SummaryPage' });
    };

    React.useEffect(() => {
      let urlPath = window.location.pathname;
      let currentTab = urlPath.split('/').pop();
      if (currentTab === "analysis"){
        currentTab = 'AnalysisPage';
      }
      else if (currentTab === "query"){
        currentTab = 'QueryPage';
      }
      else {
        currentTab = 'SummaryPage';
      }

      setValue({ activeTab: currentTab || 'SummaryPage' });

    }, []);
  
    return (
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={value.activeTab} onChange={handleChange} aria-label="navigation bar">
          <Tab label="Summary" value="SummaryPage" component={Link} to={"/"} />
          <Tab label="Query" value="QueryPage" component={Link} to={"/query"} />
          <Tab label="Analysis" value="AnalysisPage" component={Link} to={"/analysis"} />
        </Tabs>
      </Box>
    );
  }