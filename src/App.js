import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// PART 1: Expanded Data Collection
const initialLaptops = [
  { id: 1, model: "MacBook Pro", serial: "APP-990", status: "Available" },
  { id: 2, model: "Dell XPS 15", serial: "DEL-112", status: "Assigned" },
  { id: 3, model: "HP EliteBook", serial: "HP-445", status: "In Repair" },
  { id: 4, model: "Lenovo ThinkPad", serial: "LEN-778", status: "Available" },
  { id: 5, model: "ASUS Zenbook", serial: "ASU-552", status: "Available" }
];

export default function App() {
  const [assets, setAssets] = useState(initialLaptops);

  // CRUD Operations 
  const addAsset = (item) => setAssets([...assets, { ...item, id: Date.now() }]);
  const deleteAsset = (id) => setAssets(assets.filter(a => a.id !== id));
  const updateStatus = (id) => {
    setAssets(assets.map(a => a.id === id ? { ...a, status: "Updated" } : a));
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

function Inventory({ assets, onDelete, onUpdate, onAdd }) {
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");

  const handleAdd = () => {
    if (model && serial) {
      onAdd({ model, serial, status: "Available" });
      setModel("");
      setSerial("");
    } else {
      alert("Please fill in both Model and Serial Number");
    }
  };

  return (
    <div>
      <h2>Laptop Management</h2>
      <div style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Laptop Model" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          style={{ marginRight: '5px' }}
        />
        <input 
          placeholder="Serial Number" 
          value={serial} 
          onChange={(e) => setSerial(e.target.value)} 
          style={{ marginRight: '5px' }}
        />
        <button onClick={handleAdd} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
          Add Laptop
        </button>
      </div>
      
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Model</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Serial</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{asset.model}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{asset.serial}</td>
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
      <p style={{ color: '#666' }}>Project Group: SE411 - Part 1</p>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>Nawaf Faisal AlShiagy</strong> - 221110015</li>
        <li><strong>Abdulilah AlMutairy</strong> - 11223344</li>
        <li><strong>[Third Member Name]</strong> - [ID]</li>
      </ul>
      <p style={{ color: 'red', fontSize: '0.9rem' }}>* Note: Project requires a group of three.</p>
    </div>
  );
}