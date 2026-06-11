import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


const App = () => {
  const [budget, setBudget] = useState('');
  const [fuelType, setFuelType] = useState('Petrol');
  const [familySize, setFamilySize] = useState("4");
  const [usageType, setUsageType] = useState('City');

  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get('http://localhost:3000/api/recommend'{
        params: {
          budget,
          fuelType,
          familySize,
          usageType
        }
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  }

  return (
    <div className='container'>
      <div className='form-card'>
        <h2>AI Car Recommendation Assistant</h2>
        <p>Find the best car for your needs</p>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Budget ($)</label>
            <input
              type='number'
              placeholder='Enter your budget'
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label>Fuel Type</label>
            <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
              <option value='Petrol'>Petrol</option>
              <option value='Diesel'>Diesel</option>
              <option value='Electric'>Electric</option>
              <option value='Hybrid'>Hybrid</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Family Size</label>
            <select value={familySize} onChange={(e) => setFamilySize(e.target.value)}>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8+">8+</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Usage Type:</label>
            <select value={usageType} onChange={(e) => setUsageType(e.target.value)}>
              <option value='City'>City</option>
              <option value='Highway'>Highway</option>
              <option value='Off-road'>Off-road</option>
              <option value='Mixed'>Mixed</option>
            </select>
          </div>

          <button type='submit' className='submit-btn'>Get Recommendations</button>
        </form>

        {recommendations.length > 0 && (
          <div className='recommendations'>
            <h3>Recommended Cars:</h3>
            {recommendations.map((car)=>(
              <div key ={car.id} className='car-card'>
                <img src={car.image} alt={car.name} className='car-image' />
                <h4>{car.name}</h4>
                <p>Price: ${car.price}</p>
                <p>Fuel Type: {car.fuelType}</p>
                <p>Family Size: {car.familySize}</p>
                <p>Usage Type: {car.usageType}</p>
                <p>Mileage: {car.mileage}</p>
                <p>Safety: {car.safetyRatings}</p>
              </div>
            ))}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default App;