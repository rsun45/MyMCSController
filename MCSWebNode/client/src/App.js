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




// store all pages state
export const AllPagesContext = React.createContext();

function App() {

  // result page states
  const [resultPageData, setResultPageData] = React.useState(null);
  // query page states
  const [queryPagedata, setQueryPagedata] = React.useState(null);
  // Analysis page states
  const [allLineChartsData, setAllLineChartsData] = React.useState([]);
  // cycle time page states
  const [allColumnChartsData, setAllColumnChartsData] = React.useState([]);





  return (
    <Router>
      <TopBar />
      <SectionTabs />
      <AllPagesContext.Provider value={{ resultPageData, setResultPageData, queryPagedata, setQueryPagedata, allLineChartsData, setAllLineChartsData, allColumnChartsData, setAllColumnChartsData }}>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/analysis" element={<AnalysisAllStationLineChart />} />
          <Route path="/monitor" element={<StackBarChartsPage />} />
          <Route path="/query" element={<QueryPage />} />
          <Route path="/serial" element={<SerialPage />} />

        </Routes>
      </AllPagesContext.Provider>
    </Router>

  );



}



export default App;
