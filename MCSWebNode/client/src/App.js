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
import QualityPage from './components/QualityPage';
import AlarmPage from './components/AlarmPage';
import SettingsPage from './components/SettingsPage';
import MaintenancePage from './components/MaintenancePage';




// store all pages state
export const AllPagesContext = React.createContext();

function App() {

  // result page states
  const [resultPageData, setResultPageData] = React.useState(null);
  // query page states
  const [queryPagedata, setQueryPagedata] = React.useState(null);
  // Analysis page states
  const [allLineChartsData, setAllLineChartsData] = React.useState([]);
  const [analysisChartsParam, setAnalysisChartsParam] = React.useState([]); // e.g. [{min:3},{min:0},...]
  // cycle time page states
  const [allColumnChartsData, setAllColumnChartsData] = React.useState([]);
  const [chartTitles, setChartTitles] = React.useState([]);
  // quality page states
  const [allQualityChartsData, setAllQualityChartsData] = React.useState([]);
  // Alarm page states
  const [alarmGridData, setAlarmGridData] = React.useState([]);




  return (
    <Router>
      <TopBar />
      <SectionTabs />
      <AllPagesContext.Provider value={{ resultPageData, setResultPageData, queryPagedata, setQueryPagedata, 
        allLineChartsData, setAllLineChartsData, analysisChartsParam, setAnalysisChartsParam, 
        allColumnChartsData, setAllColumnChartsData, chartTitles, setChartTitles,
        allQualityChartsData, setAllQualityChartsData,
        alarmGridData, setAlarmGridData
       }}>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/analysis" element={<AnalysisAllStationLineChart />} />
          <Route path="/monitor" element={<StackBarChartsPage />} />
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
