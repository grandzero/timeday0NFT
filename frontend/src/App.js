import React,{useContext, useEffect, useState} from 'react';
import './App.css';
import FAQSection from './FAQSection';
import TimeGrid from "./TimeGrid.jsx";
import moment from "moment";
import WalletContext from "./WalletContext";
import { switchChain, connectWallet } from './services/wallet';
// 0xa1799389e8761229D44Bcac7adFD915c53E66022

function App() {
  const {walletAddress,walletNetwork, walletState, setWalletAddress, setWalletNetwork, setWalletState} = useContext(WalletContext);

  const handleWalletConnect = () => {
    
    (async function(){
     await connectWallet({setWalletAddress, setWalletNetwork, setWalletState});
    })()

  }

  const handleChangeNetwork = () => {
    
    (async function(){
      await switchChain();
    })()

  }
  return (
    
    <div style={{textAlign:"center", overflow:"hidden"}}>
    <h1 style={{color:"white", fontSize:60, marginBottom:0, paddingBottom: 0}}>Tick... Tock...</h1>
    {
      walletState ? 
      <p 
        style={{color:"white", fontSize:30, marginBottom:0, paddingBottom: 0}}>{walletAddress}</p>
      : walletNetwork === process.env.REACT_APP_NETWORK ? 
      <p onClick={handleChangeNetwork} 
        style={{color:"white", fontSize:60, marginBottom:0, paddingBottom: 0, cursor:"pointer"}}>Change Network</p>
      :
      <p onClick={handleWalletConnect}
        style={{color:"white", fontSize:60, marginBottom:0, paddingBottom: 0, cursor:"pointer"}}>CONNECT</p>
    }
    
    <TimeGrid />
    <FAQSection />
    <h1 style={{color:"white", fontSize:120, marginBottom:50, paddingBottom: 0}} className='clock'>{moment().format("HH:mm")}</h1>
    </div>
 
  );
}

export default App;
