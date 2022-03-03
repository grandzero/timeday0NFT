import React, { useEffect } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import TimeItem from "./TimeItem";
import InputModal from './InputModal';
import {ethers} from "ethers";
function TimeGrid() {
const [loadedItems, setLoadedItems] = React.useState(0);
const [contract, setContract] = React.useState();
const [inputModal, setInputModal] = React.useState(false);
const [intValue, setIntValue] = React.useState();
const [input, setInput] = React.useState("");
useEffect(()=>{
  (async function(){
    var url = 'https://rpc-mumbai.matic.today';
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let abi = ["function ownerOf(uint256 tokenId) external view returns (address owner)"];
    let contract = new ethers.Contract("0xa1799389e8761229D44Bcac7adFD915c53E66022", abi, signer);
    setContract(contract);
  
  })()
},[loadedItems]);

  const getArray =() => {
    
    let items = [];
    for(let i = loadedItems; i<loadedItems+20; ++i){
      items.push(i);
    }

    return items;
  }

  const handleLoadMore = () => {
    setLoadedItems(prev => prev+20);
  }
  return (
  
    <Grid container  direction="row"
      alignItems="center"
        justifyContent="center" 
          style={{width:"100%", textAlign:"right", padding:15, margin:0}}>
                {getArray().map(item => <TimeItem setInputModal={(id) => {
                  setIntValue(id);
                  setInputModal(true)
                }} contract={contract} intVal={item} key={item} />)}
                   
      <Grid item xs={12} style={{width:"100%", textAlign:"center", padding:15, margin:0}}>
      <p onClick={handleLoadMore} style={{color:"white", textAlign:"right", marginRight:15, textDecoration:"underline", cursor:"pointer"}}>Load More...</p>
      </Grid>

      <Grid item xs={12} style={{width:"100%", textAlign:"center", padding:15, margin:0}}>
      <InputModal 
      open={inputModal}
      handleClose={()=>{
          setInputModal(false); 
      }}
      input={input}
      setInput={setInput}
      handleMint={()=>{
        console.log("input as MATIC is : ", input);
        console.log("Tokenid is : ", intValue);
        setInputModal(false); 
        setInput("");
      }} 
      
      />
      </Grid>
    </Grid>
  );
}

export default TimeGrid;

