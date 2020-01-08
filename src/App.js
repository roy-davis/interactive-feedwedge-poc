import React from 'react';
import './App.css';
import FeedWedge from "./components/FeedWedge/";

function App() {

    let farm_walk = [{ name: '56', cover: 2650 },
                    { name: '33', cover: 2375 },
                    { name: '35', cover: 2375 },
                    { name: '55', cover: 2375 },
                    { name: '26', cover: 2125 },
                    { name: '30', cover: 2125 },
                    { name: '16', cover: 2025 },
                    { name: '23', cover: 1975 },
                    { name: '40', cover: 1975 },
                    { name: '15', cover: 1950 },
                    { name: '18', cover: 1950 },
                    { name: '13', cover: 1900 },
                    { name: '19', cover: 1900 },
                    { name: '22', cover: 1825 },
                    { name: '21', cover: 1800 },
                    { name: '32', cover: 1800 },
                    { name: '41', cover: 1800 },
                    { name: '6', cover: 1800 },
                    { name: '11', cover: 1775 },
                    { name: '17', cover: 1775 },
                    { name: '20', cover: 1750 },
                    { name: '12', cover: 1700 },
                    { name: '38', cover: 1700 },
                    { name: '45', cover: 1700 },
                    { name: '46', cover: 1700 },
                    { name: '49', cover: 1700 },
                    { name: '51', cover: 1700 },
                    { name: '28', cover: 1650 },
                    { name: '24', cover: 1625 },
                    { name: '57', cover: 1525 },
                    { name: '34', cover: 1500 },
                    { name: '42', cover: 1500 },
                    { name: '54', cover: 1500 },
                    { name: '1', cover: 1450 },
                    { name: '36', cover: 1450 },
                    { name: '53', cover: 1450 },
                    { name: '37', cover: 1425 },
                    { name: '48', cover: 1425 },
                    { name: '27', cover: 1400 },
                    { name: '43', cover: 1400 },
                    { name: '25', cover: 1350 },
                    { name: '31', cover: 1350 },
                    { name: '47', cover: 1350 },
                    { name: '5', cover: 1325 },
                    { name: '39', cover: 1300 },
                    { name: '10', cover: 1250 },
                    { name: '3', cover: 1250 },
                    { name: '50', cover: 1225 },
                    { name: '4', cover: 1175 },
                    { name: '9', cover: 1150 },
                 ];

    let growth = 100;
    let pre = 2500;
    let post = 1500;
    let days = 7;
    let grazing_rate = 2;

  return (
    <div className="App">
  		<div className="content">
  			<FeedWedge covers={farm_walk} growth={growth} post={post} pre={pre} />
        <div>
          <p><input type="checkbox" className="add_target" />Add Pre-grazing target of <input type="number" value={post} /> kg/DM</p>
          <p>and Post-grazing target of <input type="number" value={pre} /> kg/DM</p>
        </div>
        <div>
          <p><input type="checkbox" className="add_growth" />Add growth <input type="number" value={days} /> days at <input type="number" value={growth} /> kg/DM/day</p>
        </div>
        <div>
          <p><input type="checkbox" className="estimate_grazings" />Estimate paddocks grazed at <input type="number" value={grazing_rate} /><select><option>ha/day</option></select></p>
        </div>
        <div>

          <p><input type="checkbox" className="estimate_deficit" />Estimate feed deficits/surplus</p>
        </div>
  		</div>

    <label class="custom_checkbox">Three
      <input type="checkbox"  />
      <span class="checkmark"></span>
    </label>

    </div>
  );
}

export default App;


