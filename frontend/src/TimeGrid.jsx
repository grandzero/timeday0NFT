import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import TimeItem from "./TimeItem";


function TimeGrid() {
const [loadedItems, setLoadedItems] = React.useState(20);
const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      autoplaySpeed:1000*60,
      slidesToScroll: 1,
      autoplay: true,
      centerMode:true
    };
  
  function time_convert(num)
 { 
  const hours = Math.floor(num / 60);  
  const minutes = num % 60;
  return `${hours < 10 ? "0" + hours : hours}:${minutes <10 ? "0" + minutes : minutes }`;         
}

  const getArray = () => {
    /*let orderedArr = Array.from(Array(1440).keys());
    let now = new Date();
    let hour = new Date(now).getHours();
    let minutes = new Date(now).getMinutes();
    let total = hour*60 + minutes;
    let splittedPart = orderedArr.splice(total);
    let result = [...splittedPart, ...orderedArr];

    console.log(result);
    return result;*/
    return Array.from(Array(loadedItems).keys());
  }

  const handleLoadMore = () => {
    setLoadedItems(prev => prev+20);
    window.scrollTo(0,document.body.scrollHeight);
  }
  return (
  
    <Grid container  direction="row"
      alignItems="center"
        justifyContent="center" 
          style={{width:"100%", textAlign:"right", padding:15, margin:0}}>
                {getArray().map(item => <TimeItem intVal={item} key={item} />)}
                   
      <Grid item xs={12} style={{width:"100%", textAlign:"center", padding:15, margin:0}}>
      <p onClick={handleLoadMore} style={{color:"white", textAlign:"right", marginRight:15, textDecoration:"underline", cursor:"pointer"}}>Load More...</p>
      </Grid>

      <Grid item xs={12} style={{width:"100%", textAlign:"center", padding:15, margin:0}}>
        
      </Grid>
    </Grid>
  );
}

export default TimeGrid;

