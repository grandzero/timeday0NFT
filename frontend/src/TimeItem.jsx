import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';

function TimeItem({intVal}) {
  function time_convert(num)
 {   
  const hours = Math.floor(num / 60);  
  const minutes = num % 60;
  return `${hours < 10 ? "0" + hours : hours}:${minutes <10 ? "0" + minutes : minutes }`;         
}
  return (
    <Grid onClick={()=>{
      alert(intVal);
    }} style={{cursor:"pointer" ,padding:15, textAlign:"center", border:"1px solid white", borderRadius:10, margin:25}} item xs={2}>
      <p style={{color:"white"}}>{time_convert(intVal)}</p>
      
    </Grid>
  );
}

export default TimeItem;

