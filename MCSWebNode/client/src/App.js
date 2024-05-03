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


function App() {

return(
  <Router>
    <TopBar /> 
    <SectionTabs />
    <Routes>
      <Route  path="/" element={<Summary />} />
      <Route  path="/result" element={<ResultPage />} />
      <Route  path="/analysis" element={<AnalysisAllStationLineChart />} />
      <Route  path="/monitor" element={<StackBarChartsPage />} />
      <Route  path="/query" element={<QueryPage />} />
      <Route  path="/serial" element={<SerialPage />} />

    </Routes>
  </Router>

);



}



export default App;
