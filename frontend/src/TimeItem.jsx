import React,{useEffect, useState} from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import {ownerOfFunction} from "./services/getData";

function TimeItem({intVal, contract, setInputModal}) {
    const [isOwned, setIsOwned] = useState(false);
    const [loading, setLoading] = useState(true);
    
  function time_convert(num)
 {   
  const hours = Math.floor(num / 60);  
  const minutes = num % 60;
  return `${hours < 10 ? "0" + hours : hours}:${minutes <10 ? "0" + minutes : minutes }`;         
}

useEffect(()=>{
    (async function(){
       let result;
       try{
           result =  await ownerOfFunction({contract, id: intVal});
           result && setIsOwned(true);
        }catch(error){}
        setLoading(false);
    })()
},[contract,intVal])
   
  return (
    <Grid onClick={()=>!isOwned && !loading && setInputModal(true)} style={{cursor:"pointer" ,padding:15, textAlign:"center", border:isOwned ? "1px solid grey" :"1px solid white" , borderRadius:10, margin:25}} item xs={2}>
      <p style={{color:isOwned ? "grey" :"white"}}>{time_convert(intVal)}</p>
      
    </Grid>
  );
}

export default TimeItem;

