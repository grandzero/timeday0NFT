import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import TimeItem from "./TimeItem";
import InputModal from './InputModal';
import WalletContext from './WalletContext';
import {ethers} from "ethers";

function TimeGrid() {
const [loadedItems, setLoadedItems] = React.useState(0);
const [inputModal, setInputModal] = React.useState(false);
const [intValue, setIntValue] = React.useState();
const [input, setInput] = React.useState("");
const {contract, walletAddress} = React.useContext(WalletContext);
// useEffect(()=>{
//   (async function(){
//     let result = await contract.methods.tokenURI(2).call();
//     console.log(result);
  
//   })()
// },[]);


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
                {getArray().map(item => <TimeItem  setInputModal={(id) => {
                  setIntValue(id);
                  setInputModal(true)
                }} intVal={item} key={item} />)}
                   
      <Grid item xs={12} style={{width:"100%", textAlign:"center", padding:15, margin:0}}>
      <p onClick={handleLoadMore} style={{color:"white", textAlign:"right", marginRight:15, textDecoration:"underline", cursor:"pointer"}}>Load More...</p>
      </Grid>

      <Grid item xs={12} style={{width:"100%", textAlign:"center", padding:15, margin:0}}>
      <InputModal 
      open={inputModal}
      handleClose={()=>{
          setInputModal(false);
          intValue.loadingFalse(); 
      }}
      input={input}
      setInput={setInput}
      handleMint={()=>{
        (async function(){
          intValue.loadingTrue()
        
          try{
            let tx = await contract.claim(intValue.value,{value:ethers.utils.parseEther(input)})
            let receipt = await tx.wait();
            //await contract.methods.claim(intValue.value).send({value: ethers.utils.parseEther(input), from:walletAddress});
            intValue.loadingFalse(false);
          }catch(error){
            console.log(error);
            intValue.loadingFalse(false);
          }
          
          //window.location.reload();
        })()
        setInputModal(false); 
        setInput("");
      }} 
      
      />
      </Grid>
    </Grid>
  );
}

export default TimeGrid;

