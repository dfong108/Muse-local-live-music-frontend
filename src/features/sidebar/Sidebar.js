import './style.css';
import Map from '../map/Map';
import { useLoadScript } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sortedEvents, selectedEvent, resetSelectEvent } from '../bands/bandsSlice';
import { Link } from 'react-router-dom';
import Filter from './filters/Filters'



const Sidebar = () => {
    const [bands, setBands] = useState([]);
    
// ------- LOAD MAP ACCESS & SETUP ---------

    const { isLoaded  } = useLoadScript({
      googleMapsApiKey: 'AIzaSyBugMXwDHrB8nyOp1ekm086PfCuWrQU2W0',
      // googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
      libraries: ["places"]
    });

    const events = useSelector(sortedEvents);



  return (
    <div className='sidebar'>
      <Filter />
      <div className='map-container'>
        { !isLoaded ? <div>Loading Map...</div> 
              : <Map defaultZoom={12} events={events} />
        }
      </div>
    </div>
  )
}

export default Sidebar