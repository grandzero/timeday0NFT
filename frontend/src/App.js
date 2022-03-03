import React,{useEffect, useState} from 'react';
import './App.css';
import FAQSection from './FAQSection';
import TimeGrid from "./TimeGrid.jsx";
import moment from "moment";
import {checkIfWalletIsConnected, connect} from "./services/getData"; 
// 0xa1799389e8761229D44Bcac7adFD915c53E66022

function App() {
  const [isConnected, setIsConnected] = useState("Connect");
  useEffect(()=>{
    (async function(){
      await checkIfWalletIsConnected((address)=>setIsConnected(address))
    })()
  },[])

  const handleWalletConnect = () => {
    if(isConnected !== "Connect")return;
    (async function(){
     await connect((address)=>setIsConnected(address));
    })()

  }
  return (
    <div style={{textAlign:"center", overflow:"hidden"}}>
    <h1 style={{color:"white", fontSize:60, marginBottom:0, paddingBottom: 0}}>Tick... Tock...</h1>
    <p onClick={handleWalletConnect} style={{color:"white", fontSize:isConnected === "Connect" ? 60 : 30, marginBottom:0, paddingBottom: 0, cursor:isConnected === "Connect" && "pointer"}}>{isConnected}</p>
    <TimeGrid />
    <FAQSection />
    <h1 style={{color:"white", fontSize:120, marginBottom:50, paddingBottom: 0}} className='clock'>{moment().format("HH:mm")}</h1>
    </div>
  );
}

export default App;
