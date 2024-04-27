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
import Summary from './components/Summary';
import AnalysisPage from './components/AnalysisPage';


function App() {

return(
  <Router>
    <TopBar /> 
    <SectionTabs />
    <Routes>
      <Route  path="/" element={<Summary />} />
      <Route  path="/query" element={<QueryPage />} />
      <Route  path="/analysis" element={<AnalysisPage />} />
      <Route  path="/serial" element={<SerialPage />} />

    </Routes>
  </Router>

);



}



export default App;
