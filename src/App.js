import React, { Component } from 'react';
import Car from "./Car";
import './css/App.css';
import SimpleTable from './components/SimpleTable';


function App() {
  return (
    <div className="App">
    	<div className="wrapper">
			<header className="header">Ficticius Clean - Limpeza</header>
			<aside className="aside aside-l"></aside>
			<aside className="aside aside-r"></aside>
			<Car className="main"></Car>
		</div>
      <SimpleTable></SimpleTable>
    </div>
  );

  
}

export default App;
