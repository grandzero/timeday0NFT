import React,{useContext, useEffect, useState} from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import {ownerOfFunction} from "./services/getData";
import WalletContext from './WalletContext';
import { CircularProgress } from '@mui/material';
function TimeItem({intVal, setInputModal}) {
    const [isOwned, setIsOwned] = useState(true);
    const [loading, setLoading] = useState(false);
    const {walletState, contract} = useContext(WalletContext);
  function time_convert(num)
 {   
  const hours = Math.floor(num / 60);  
  const minutes = num % 60;
  return `${hours < 10 ? "0" + hours : hours}:${minutes <10 ? "0" + minutes : minutes }`;         
}

useEffect(()=>{
    !loading && (async function(){
       let result;
       try{
           result =  await ownerOfFunction({contract, id: intVal});
           if(result){
            setIsOwned(true);
           }
           else setIsOwned(false);
        }catch(error){setIsOwned(false);}
      
    })()
},[contract,intVal, loading])
  return (
    <Grid onClick={()=>{
      if(!isOwned && walletState && !loading){
        setInputModal({value: intVal, loadingTrue: () => setLoading(true), loadingFalse: ()=> setLoading(false)});
      }
    }
      } style={{cursor:"pointer" ,padding:15, textAlign:"center", border:isOwned ? "1px solid grey" :"1px solid white" , borderRadius:10, margin:25}} item xs={2}>
      <p style={{color:isOwned ? "grey" :"white"}}>{loading ? <CircularProgress/> : time_convert(intVal)}</p>
      
    </Grid>
  );
}

export default TimeItem;

