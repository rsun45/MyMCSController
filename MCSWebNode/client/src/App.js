import React from "react";
import './App.css';
import TopBar from './components/TopBar';
import SectionTabs from './components/SectionTabs';
import SerialPage from './components/SerialPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {

return(
  <Router>
    <TopBar /> 
    <Routes>
      <Route  path="/" element={<SectionTabs />} />
      <Route  path="/serial" element={<SerialPage />} />

    </Routes>
  </Router>

);



}



export default App;
