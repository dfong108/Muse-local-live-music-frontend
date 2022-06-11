import './style.css';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import Facebook from './Facebook';
import Instagram from './Instagram';
import Spotify from './Spotify';
import Twitter from './Twitter';
import TikTok from './TitkTok';
import Venmo from './Venmo';

const MediaIcons = ({ links }) => {
  let icons;

  if(links) {

    icons = Object.entries(links).map(([mediaType, thisLink]) => {
  
      switch (mediaType) {
        case "facebook":
          return <div key={nanoid()} className='icon-box' onClick={ () => window.open(thisLink, '_blank') }><Facebook /></div>
          break;
        case "instagram":
          return <div key={nanoid()} className='icon-box' onClick={ () => window.open(thisLink, '_blank') }><Instagram /></div>
          break;
        case "spotify":
          return <div key={nanoid()} className='icon-box' onClick={ () => window.open(thisLink, '_blank') }><Spotify /></div>
          break;
        case "tiktok":
          return <div key={nanoid()} className='icon-box' onClick={ () => window.open(thisLink, '_blank') }><TikTok /></div>
          break;
        case "twiiter":
          return <div key={nanoid()} className='icon-box' onClick={ () => window.open(thisLink, '_blank') }><Twitter /></div>
          break;
        case "venmo":
          return <div key={nanoid()} className='icon-box' onClick={ () => window.open(thisLink, '_blank') }><Venmo /></div>
          break;
      
        default: return
          break;
      }
    })
  }

  return (
    <div key={nanoid()} className='media-icon-container'>
      {icons}

      {/* <Facebook />
      <Instagram />
      <Spotify />
      <Twitter />
      <TikTok />
      <Venmo /> */}

    </div>
  )
}

export default MediaIcons