import React from "react";
import './App.css';
import TopBar from './components/TopBar';
import SectionTabs from './components/SectionTabs';


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  return (
    <div className="App">
      <TopBar />
      <SectionTabs />
    </div>
  );
}

export default App;
