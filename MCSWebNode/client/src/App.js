import React from "react";
import './App.css';
import TopBar from './components/TopBar';


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  return (
    <div className="App">
    <TopBar />,
        <p>
          Hello world.
          {data}
        </p>
    </div>
  );
}

export default App;
