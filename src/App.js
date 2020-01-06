import React from 'react';
import './App.css';
import FeedWedge from "./components/FeedWedge/";

function App() {

    let farm_walk = [{ name: '1', value: 3500 }, 
                 { name: '2', value: 3200 },
                 { name: '3', value: 3000 },
                 { name: '4', value: 2800 },
                 ];

    let growth = 100;
    let pre = 3500;
    let post = 1500;

  return (
    <div className="App">
  		<header>
  		</header>
  		<div className="content">
  			<FeedWedge covers={farm_walk} growth={growth} post={post} pre={pre} />
  		</div>
    </div>
  );
}

export default App;
