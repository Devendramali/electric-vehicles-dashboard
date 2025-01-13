import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./component/Home";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import Vehicles from "./component/Vehicles";
import Categories from "./component/Categories";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [evData, setEvData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv');
        if (!response.ok) {
          throw new Error('Data fetch failed');
        }

        const data = await response.text();
        const parsedData = parseCSV(data);
        setEvData(parsedData); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
        console.log("Data fetching complete:", evData);  
      }
    };

    fetchData();
  }, []); 

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
      const row = line.split(',');
      let obj = {};
      row.forEach((item, index) => {
        obj[headers[index]] = item.trim();
      });
      return obj;
    });
  };

  if (loading) {
    return <div>Loading data, please wait...</div>;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <Routes>
          <Route path="/" element={loading ? <div>Loading data...</div> :<Home evData={evData} />} />
          <Route path="/vehicles" element={loading ? <div>Loading data...</div> :<Vehicles evData={evData} />} />
          <Route path="/categories" element={loading ? <div>Loading data...</div> :<Categories evData={evData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
