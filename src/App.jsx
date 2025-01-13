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
  const [evData, setEvData] = useState([]); // State to hold the electric vehicle data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Function to toggle sidebar visibility
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv');
        if (!response.ok) {
          throw new Error('Data fetch failed');
        }

        const data = await response.text();
        const parsedData = parseCSV(data);
        setEvData(parsedData); // Store parsed data in state
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false once data is fetched
        console.log("Data fetching complete:", evData);  // Debugging to check data
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount

  // CSV parsing logic
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

  // Handling loading and error states
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
          {/* Route for Home component */}
          <Route path="/" element={loading ? <div>Loading data...</div> :<Home evData={evData} />} />
          
          {/* Route for Vehicles component */}
          <Route path="/vehicles" element={loading ? <div>Loading data...</div> :<Vehicles evData={evData} />} />
          <Route path="/categories" element={loading ? <div>Loading data...</div> :<Categories evData={evData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
