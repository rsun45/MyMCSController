import React from "react";
// import './App.css';
import TopBar from './components/TopBar';
import SectionTabs from './components/SectionTabs';
import SerialPage from './components/SerialPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import QueryPage from './components/QueryPage';
import ResultPage from './components/ResultPage';
import Summary from './components/Summary';
// import AnalysisPage from './components/AnalysisPage';
import AnalysisAllStationLineChart from './components/AnalysisAllStationLineChart';
import StackBarChartsPage from './components/StackBarChartsPage';
import OperatorTimePage from './components/OperatorTimePage';
import QualityPage from './components/QualityPage';
import AlarmPage from './components/AlarmPage';
import SettingsPage from './components/SettingsPage';
import MaintenancePage from './components/MaintenancePage';
import { CookiesProvider, useCookies } from 'react-cookie'




// store all pages state
export const AllPagesContext = React.createContext();

function App() {

  // setup cookies
  const [cookies, setCookie, removeCookie] = useCookies(['summaryPageChoices']);
  
  if (!cookies.summaryPageChoices || !cookies.summaryPageChoices?.Graph6){
    setCookie('summaryPageChoices', 
      {
        "Graph1": {"name": "SumFaultTime", "header": "All Stations Sum Fault Time (Second)"}, 
        "Graph2": {"name": "AverageCycleTime", "header": "All Stations Average Cycle Time (Second)"},
        "Graph3": {"name": "CurrentShiftPassFailCounts", "header": ""},
        "Graph4": {"name": "RunningPerformance", "header": ""},
        "Graph5": {"name": "Maintenance", "header": "Maintenance"},
        "Graph6": {"name": "ActiveAlarm", "header": "Active Alarm"}
      }, 
      { path:"/" })
  }


  // result page states
  const [resultPageData, setResultPageData] = React.useState(null);
  // query page states
  const [queryPagedata, setQueryPagedata] = React.useState(null);
  // Analysis page states
  const [allLineChartsData, setAllLineChartsData] = React.useState([]);
  // cycle time page states
  const [allColumnChartsData, setAllColumnChartsData] = React.useState([]);
  const [chartTitles, setChartTitles] = React.useState([]);
  // quality page states
  const [allQualityChartsData, setAllQualityChartsData] = React.useState([]);
  // Alarm page states
  const [alarmGridData, setAlarmGridData] = React.useState([]);
  // operator page states
  const [operatorTimeData, setOperatorTimeData] = React.useState([]);
  const [operatorTableTitle, setOperatorTableTitle] = React.useState("");




  return (
    <Router>
      <TopBar />
      <SectionTabs />
      <AllPagesContext.Provider value={{ resultPageData, setResultPageData, queryPagedata, setQueryPagedata, 
        allLineChartsData, setAllLineChartsData, 
        allColumnChartsData, setAllColumnChartsData, chartTitles, setChartTitles,
        allQualityChartsData, setAllQualityChartsData,
        alarmGridData, setAlarmGridData,
        operatorTimeData, setOperatorTimeData, operatorTableTitle, setOperatorTableTitle
       }}>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/analysis" element={<AnalysisAllStationLineChart />} />
          <Route path="/monitor" element={<StackBarChartsPage />} />
          <Route path="/operator" element={<OperatorTimePage />} />
          <Route path="/quality" element={<QualityPage />} />
          <Route path="/query" element={<QueryPage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/serial" element={<SerialPage />} />

        </Routes>
      </AllPagesContext.Provider>
    </Router>

  );



}



export default App;
