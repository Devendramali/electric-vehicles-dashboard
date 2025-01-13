import React from 'react';

const Categories = ({ evData }) => {
  const groupedByType = evData.reduce((acc, vehicle) => {
    const type = vehicle['Electric Vehicle Type'];
    const Make = vehicle['Make'];
    if (!acc[type]) {
      acc[type] = new Set(); 
    }
    acc[type].add(vehicle.Model);
    return acc;
  }, {});

  return (
    <main className="main-container vehicles">
      <div className="main-title">
        <h3>Categories Dashboard</h3>
      </div>

      <div className="categories mt-3">
          <div className="row">
        {Object.keys(groupedByType).map((type, index) => (
            <div className="col-lg-6">
                <div key={index} className="category">
                    <h4>{type}</h4>
                    <ol>
                    {[...groupedByType[type]].map((model, idx) => (
                        <li key={idx}>{model}</li>
                    ))}
                    </ol>
                </div>
            </div>
        ))}
        </div>
      </div>
    </main>
  );
};

export default Categories;
