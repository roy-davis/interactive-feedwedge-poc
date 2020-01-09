import React from 'react';
import './App.css';
import InteractiveForm from "./components/InteractiveForm/";

function App() {

    let farm_walk = [{ name: '56', cover: 2650, ha: 1.76 },
                    { name: '33', cover: 2375, ha: 2.83 },
                    { name: '35', cover: 2375, ha: 2.63 },
                    { name: '55', cover: 2375, ha: 2.57 },
                    { name: '26', cover: 2125, ha: 2.94 },
                    { name: '30', cover: 2125, ha: 1.45 },
                    { name: '16', cover: 2025, ha: 1.54 },
                    { name: '23', cover: 1975, ha: 1.66 },
                    { name: '40', cover: 1975, ha: 1.59 },
                    { name: '15', cover: 1950, ha: 2.09 },
                    { name: '18', cover: 1950, ha: 2.14 },
                    { name: '13', cover: 1900, ha: 2.68 },
                    { name: '19', cover: 1900, ha: 1.59 },
                    { name: '22', cover: 1825, ha: 1.78 },
                    { name: '21', cover: 1800, ha: 1.59 },
                    { name: '32', cover: 1800, ha: 1.47 },
                    { name: '41', cover: 1800, ha: 1.67 },
                    { name: '6', cover: 1800, ha: 2.20 },
                    { name: '11', cover: 1775, ha: 1.98 },
                    { name: '17', cover: 1775, ha: 2.58 },
                    { name: '20', cover: 1750, ha: 1.58 },
                    { name: '12', cover: 1700, ha: 2.08 },
                    { name: '38', cover: 1700, ha: 1.85 },
                    { name: '45', cover: 1700, ha: 1.90 },
                    { name: '46', cover: 1700, ha: 1.75 },
                    { name: '49', cover: 1700, ha: 1.48 },
                    { name: '51', cover: 1700, ha: 2.14 },
                    { name: '28', cover: 1650, ha: 2.42 },
                    { name: '24', cover: 1625, ha: 2.99 },
                    { name: '57', cover: 1525, ha: 1.72 },
                    { name: '34', cover: 1500, ha: 1.71 },
                    { name: '42', cover: 1500, ha: 2.68 },
                    { name: '54', cover: 1500, ha: 1.96 },
                    { name: '1', cover: 1450, ha: 1.59 },
                    { name: '36', cover: 1450, ha: 2.14 },
                    { name: '53', cover: 1450, ha: 1.66 },
                    { name: '37', cover: 1425, ha: 1.85 },
                    { name: '48', cover: 1425, ha: 1.71 },
                    { name: '27', cover: 1400, ha: 2.64 },
                    { name: '43', cover: 1400, ha: 2.51 },
                    { name: '25', cover: 1350, ha: 1.92 },
                    { name: '31', cover: 1350, ha: 1.42 },
                    { name: '47', cover: 1350, ha: 1.59 },
                    { name: '5', cover: 1325, ha: 0.65 },
                    { name: '39', cover: 1300, ha: 1.76 },
                    { name: '10', cover: 1250, ha: 1.98 },
                    { name: '3', cover: 1250, ha: 1.49 },
                    { name: '50', cover: 1225, ha: 1.32 },
                    { name: '4', cover: 1175, ha: 0.22 },
                    { name: '9', cover: 1150, ha: 2.38 },
                 ];



  return (
    <div className="App">
      <InteractiveForm cover_data={farm_walk} />
    </div>
  );
}

export default App;


