import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { PieChart } from 'react-minimal-pie-chart';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Year: ${label}`}</p>
        <p>{`Average Electric Range: ${payload[0].value} miles`}</p>
      </div>
    );
  }
  return null;
};

const Dashboard = ({ evData }) => {
  // const [evData, setEvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [uniqueYears, setUniqueYears] = useState([]);
  const [bestModel, setBestModel] = useState(null);


const handleYearChange = (event) => {
  const year = event.target.value;
  setSelectedYear(year);

  if (year) {
    const filteredData = evData.filter((item) => item['Model Year'] === year);
    const best = filteredData.reduce((prev, curr) => {
      const prevRange = parseInt(prev['Electric Range'], 10) || 0;
      const currRange = parseInt(curr['Electric Range'], 10) || 0;
      return currRange > prevRange ? curr : prev;
    }, {});
    setBestModel(best);
  } else {
    setBestModel(null);
  }
};

const aggregateByYear = (data) => {
  const aggregated = {};

  data.forEach((item) => {
    const year = item['Model Year'];
    const electricRange = parseInt(item['Electric Range'], 10);

    if (!isNaN(electricRange) && electricRange > 0) {
      if (!aggregated[year]) {
        aggregated[year] = { totalRange: 0, count: 0 };
      }
      aggregated[year].totalRange += electricRange;
      aggregated[year].count += 1;
    }
  });

  return Object.keys(aggregated).map((year) => ({
    name: year,
    averageRange: aggregated[year].totalRange / aggregated[year].count,
  }));
};

useEffect(() => {
  const years = [...new Set(evData.map((item) => item['Model Year']))];
  years.sort((a, b) => a - b);
  setUniqueYears(years);

  const initialFilteredData = evData.filter((item) => item['Model Year'] === "2024");
  const initialBest = initialFilteredData.reduce((prev, curr) => {
    const prevRange = parseInt(prev['Electric Range'], 10) || 0;
    const currRange = parseInt(curr['Electric Range'], 10) || 0;
    return currRange > prevRange ? curr : prev;
  }, {});
  setBestModel(initialBest); // Set the best model for 2024
}, [evData]);

  const chartData = aggregateByYear(evData);

  const totalVehicles = evData.length; 
  const totalMake = new Set(evData.map(item => item['Make'])).size;
  console.log(evData);



  const totalCities = new Set(evData.map(item => item['County'])).size;
  const totalModel = new Set(evData.map(item => item['Model'])).size;
  const totalElectricVehicleype = new Set(evData.map(item => item['Electric Vehicle Type'])).size;
  // const bevcount /s= new Set(evData.map(item => item['Electric Vehicle Type' === "Plug-in Hybrid Electric Vehicle (PHEV)"])).lend;
  // const bevCount = evData.filter(item => item['Electric Vehicle Type'] !== 'Battery Electric Vehicle (BEV)').length;
  // const pbevCount = evData.filter(item => item['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)').length;


  const bevCount = evData.filter(item => item['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)').length;

  const nonBevCount = totalVehicles - bevCount;

  const bevPercentage = ((bevCount / totalVehicles) * 100).toFixed(2);

  const nonBevPercentage = ((nonBevCount / totalVehicles) * 100).toFixed(2);

  const totalCity = new Set(evData.map(item => item['City'])).size;



  const pieData = [
    { name: 'Battery Electric Vehicles (BEV)', value: bevCount, color: '#E38627' },
    { name: 'Other Vehicles', value: nonBevCount, color: '#6A2135' },
  ];




  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Dashboard</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total Vehicles</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{totalVehicles}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Electric Vehicle Type</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{totalElectricVehicleype}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Battery Electric Vehicles (BEV)</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{bevCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Plug-in Hybrid Electric Vehicle (PHEV)</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{nonBevCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Type Of Vehicles Companies</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{totalMake}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Total Module</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{totalModel}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>County</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{totalCities}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>City</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{totalCity}</h1>
        </div>
      </div>
      <div className="charts">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="averageRange" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

        <div className="best-model">
          <h2>Best Model of {selectedYear}</h2>
          <div className="dropdown">
            <select className="mx-0" name="year" id="year" value={selectedYear} onChange={handleYearChange}>
              <option value="">Select a Year</option>
              {uniqueYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {bestModel && (
            <div className="best-model-details mt-2">
              <p><strong>Model:</strong> {bestModel['Model']}</p>
              <p><strong>Company:</strong> {bestModel['Make']}</p>
              <p><strong>Electric Range:</strong> {bestModel['Electric Range']} miles</p>
              <p><strong>Electric Vehicle Type:</strong> {bestModel['Electric Vehicle Type']}</p>
              <p><strong>Clean Alternative Fuel Vehicle (CAFV) Eligibility:</strong> {bestModel['Clean Alternative Fuel Vehicle (CAFV) Eligibility']}</p>
            </div>
          )}
        </div>
     
      </div>
      <div className="charts pieChartss">
        <ResponsiveContainer width="100%" height="100%">
          <h2 className='mt-0'>Electric Vehicle Type:</h2>
          <PieChart
            data={[
              { title: 'Other Vehicles', value: nonBevCount, color: '#6A2135' },
              { title: 'Battery Electric Vehicles (BEV)', value: bevCount, color: '#E38627' },
            ]}
            label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
            labelStyle={{
              fontSize: '4px',
              fontWeight: 'bold',
              fill: '#fff',
            }}
        
            labelPosition={91}
            animate
          />
        </ResponsiveContainer>

      </div>
    </main>
  );
};

export default Dashboard;
