import './style.css';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { allBands, allEvents, sortedEvents, sortByDate } from "../bands/bandsSlice";
import { addDays, addHours, format } from "date-fns";
import DisplayCard from '../displayCard/DisplayCard';


// --------------- DATE FORMATING --------------------

      export const getFullDate = (x) => {
        return format(new Date(x), "eee, LLL d h:mm a");
      };
      export const getShortDate = (x) => {
        return format(new Date(x), "eee, LLL dd");
      };
      export const getDate = (x) => {
        return format(new Date(x), "dd");
      };
      export const getDay = (x) => {
        return format(new Date(x), "eee");
      };
      export const getTime = (x) => {
        return format(new Date(x), "h:mm a");
      };


const Events = () => {
  const dispatch = useDispatch();

  const events = useSelector(allEvents)
  const sorted = useSelector(sortedEvents)


  return (
    <div className='eventsContainer'>
      {
        sorted
        ? (
          sorted?.map(event => (
            <div key={event.id}>
              <DisplayCard key={event.id} type='event' event={event} />
            </div>
          ))
        )
        : <p>EVENTS LOADING</p>
      }
    </div>
  )
}

export default Events