import React from 'react'
import { useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import './card2.css'

const MyCard = ({cards, rawr}) => {
  const history = useHistory()
  function cardHandler(e){  
  e.preventDefault();
  console.log('Login Form Submitted!');
  

  }

return (
          <div className='center-1 bruh'>
            <img className='m-2' onClick={cardHandler} src={cards.mycollection[0]?.images.small} alt=""></img>
            <img className='m-2' onClick={cardHandler} src={cards.mycollection[1]?.images.small} alt=""></img>
            <img className='m-2 ' onClick={cardHandler} src={cards.mycollection[2]?.images.small} alt=""></img>
            <img className='m-2 ' onClick={cardHandler} src={cards.mycollection[3]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[4]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[5]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[6]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[7]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[8]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[9]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[10]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[11]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[12]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[13]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[14]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[15]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[16]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[17]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[18]?.images.small} alt=""></img>
            <img className='m-2'   onClick={cardHandler} src={cards.mycollection[19]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[20]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[21]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[22]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[23]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[24]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[25]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[26]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[27]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[28]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[29]?.images.small} alt=""></img>
            <img className='m-2  ' onClick={cardHandler} src={cards.mycollection[30]?.images.small} alt=""></img>
          </div>
    )}

export default MyCard