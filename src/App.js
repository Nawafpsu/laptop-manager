import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

// This is where your Eclipse server is running
const API_URL = "http://localhost:8080/v1/laptops";

export default function App() {
  const [assets, setAssets] = useState([]);

  // 1. GET: Load laptops from the Database when the page opens
  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = () => {
    axios.get(API_URL)
      .then(res => {
        // If your Java returns a Page object, use res.data.content
        // If it returns a List/Iterable, use res.data
        setAssets(Array.isArray(res.data) ? res.data : res.data.content);
      })
      .catch(err => console.error("Is your Eclipse server running?", err));
  };

  // 2. POST: Save a new laptop to the Database
  const addAsset = (item) => {
    const laptopData = {
      model: item.model,
      serialNumber: item.serial, // Matches your Java field name
      status: "Available"
    };

    axios.post(API_URL, laptopData)
      .then(() => fetchLaptops()) // Refresh the list from the server
      .catch(err => alert("Failed to save to Database"));
  };

  // 3. DELETE: Remove from Database
  const deleteAsset = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => fetchLaptops())
      .catch(err => console.error("Delete failed", err));
  };

  // 4. PUT: Update Status in Database
  const updateStatus = (id) => {
    // Finds the current laptop to send its data back with a new status
    const laptopToUpdate = assets.find(a => a.id === id);
    if (laptopToUpdate) {
      const updatedData = { ...laptopToUpdate, status: "Updated" };
      axios.put(`${API_URL}/${id}`, updatedData)
        .then(() => fetchLaptops());
    }
  };

  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <nav style={{ marginBottom: '20px', borderBottom: '2px solid #EEE', paddingBottom: '10px' }}>
          <Link to="/" style={{ marginRight: '15px', fontWeight: 'bold' }}>Inventory</Link>
          <Link to="/about" style={{ fontWeight: 'bold' }}>About Team</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <Inventory assets={assets} onDelete={deleteAsset} onUpdate={updateStatus} onAdd={addAsset} />
          } />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// --- UI COMPONENTS (Inventory and About) ---

function Inventory({ assets, onDelete, onUpdate, onAdd }) {
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");

  const handleAdd = () => {
    if (model && serial) {
      onAdd({ model, serial });
      setModel("");
      setSerial("");
    } else {
      alert("Please fill in both Model and Serial Number");
    }
  };

  return (
    <div>
      <h2>Laptop Management (Full-Stack)</h2>
      <div style={{ marginBottom: '20px' }}>
        <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} style={{ marginRight: '5px' }} />
        <input placeholder="Serial" value={serial} onChange={(e) => setSerial(e.target.value)} style={{ marginRight: '5px' }} />
        <button onClick={handleAdd} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
          Add Laptop
        </button>
      </div>
      
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Model</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Serial Number</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{asset.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{asset.model}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{asset.serialNumber}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{asset.status}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button onClick={() => onUpdate(asset.id)} style={{ marginRight: '5px' }}>Update</button>
                <button onClick={() => onDelete(asset.id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Team Members</h2>
      <p style={{ color: '#666' }}>Project Group: SE411 - Full Stack Integration</p>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>Nawaf Faisal AlShiagy</strong> - 221110015</li>
        <li><strong>Abdullah Alzahrani</strong> - 220110436</li>
        <li><strong>Rayan Aljadhai</strong> - 220110707</li>
      </ul>
    </div>
  );
}