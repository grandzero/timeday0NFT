import React from 'react';
import './App.css';
import FAQSection from './FAQSection';
import TimeGrid from "./TimeGrid.jsx";

 
function App() {
  return (
    <div style={{textAlign:"center", overflow:"hidden"}}>
    <h1 style={{color:"white", fontSize:60, marginBottom:0, paddingBottom: 0}}>Tick... Tock...</h1>
    <TimeGrid />
    <FAQSection />
    <h1 style={{color:"white", fontSize:120, marginBottom:50, paddingBottom: 0}} className='clock'>12:34</h1>
    </div>
  );
}

export default App;
