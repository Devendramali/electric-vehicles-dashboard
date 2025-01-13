import React, { useState } from 'react';

const Vehicles = ({ evData }) => {
  const [selectedMake, setSelectedMake] = useState(''); 

  
  const uniqueMakes = [...new Set(evData.map(vehicle => vehicle.Make))];


const modelCounts = selectedMake
? evData
    .filter(vehicle => vehicle.Make === selectedMake)
    .reduce((acc, vehicle) => {
      const model = vehicle.Model;
      if (!acc[model]) {
        acc[model] = {
          Model: model,
          Year: vehicle['Model Year'],
          ElectricRange: vehicle['Electric Range'] || 'N/A',
          Count: 0,
        };
      }
      acc[model].Count += 1;
      return acc;
    }, {})
: {};
const modelCountsArray = Object.values(modelCounts);

    

  return (
    <main className="main-container vihicles">
      <div className="main-title">
        <h3>Vehicles Dashboard</h3>
      </div>


      <div className="filter-section">
        <label htmlFor="make-select"><strong>Select Manufacture Industry:</strong></label>
            <select
            id="make-select"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            >
            <option value="">-- Select a Make --</option>
            {uniqueMakes.map((make, index) => (
                <option key={index} value={make}>{make}</option>
            ))}
            </select>
        </div>

     
      {selectedMake && modelCountsArray.length > 0 && (
        <div className="table-container">
          <h4>Models of : {selectedMake}</h4>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>#</th>
                <th>Model</th>
                <th>Model Year</th>
                <th>Electric Range (miles)</th>
                <th>Total Count</th>
              </tr>
            </thead>
            <tbody>
              {modelCountsArray.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.Model}</td>
                  <td>{item.Year}</td>
                  <td>{item.ElectricRange || 'N/A'}</td>
                  <td>{item.Count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    
      {selectedMake && modelCountsArray.length === 0 && (
        <p>No models found for the selected make.</p>
      )}
    </main>
  );
};

export default Vehicles;
