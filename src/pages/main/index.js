import React from 'react';
import ShowCards from "./components/ShowCards";
import gif1 from './images/gif_1.gif';
import gif2 from './images/gif_2.gif';
import gif4 from './images/gif_1.gif';
import gif5 from './images/gif_2.gif';
import gif6 from './images/gif_3.gif';
import './index.less';

export default function (){
  return (
    <div className="main">
      <ShowCards
        cards={[{
          card: gif4,
          key: 'gif1'
        }, {
          card: gif5,
          key: 'gif2'
        },{
          card: gif6,
          key: 'gif3'
        },{
          card: gif5,
          key: 'gif4'
        },{
          card: gif4,
          key: 'gif5'
        },{
          card: gif6,
          key: 'gif6'
        },]}
        showMax={6}
        imgWidth={15}
        delay={3000}
        keyCode={32}
      />
    </div>
  )
}
