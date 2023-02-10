import React from 'react'
import './Popup.css'
import card_1 from './gif_1.gif'
import card_2 from './gif_2.gif'
import card_3 from './gif_3.gif'

function Popup(props) {
  return (props.trigger) ?(
    <div className='popup'>
      <div className='popup-inner'>
        <img src={card_1} 
            className="App-card" alt="back"/>
      </div>
    </div>
  ):"";
}

export default Popup
