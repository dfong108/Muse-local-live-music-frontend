import './style.css';
import React from 'react';

import Bands from '../../features/bands/Bands';
import Events from '../../features/events/Events';
import Sidebar from '../../features/sidebar/Sidebar';

const HomePage = () => {

  return (


    <div className='main-container'>
      <div className='side-container'>
        <Sidebar />
      </div>

      <div className='sub-container'>
        <div className='section sub-1'>
          <h3 className='section-title'>BANDS</h3>
          <Bands />
        </div>

        <div className='section sub-2'>
          <h3 className='section-title'>EVENTS</h3>
          <Events />
        </div>
      </div>
    </div>
  )
}

export default HomePage