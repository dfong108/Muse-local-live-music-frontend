import "./style.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { getFullDate, getShortDate, getDate, getDay, getTime } from "../events/Events";

import { useDispatch, useSelector } from "react-redux";
import { updateBand, selectEvent } from "../bands/bandsSlice";




const DisplayCard = ({ type, band, event }) => {
    
    const likeBand = useSelector(updateBand);
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState()
    const [likes, setLikes] = useState(0);
    
    const addLikes = () => {
        let count = band.likes + 1
        console.log(count)
        console.log(band.name)
        setLikes(count)
        dispatch(updateBand({...band, "likes" : count}))
    }
    
    const handleClickedEvent = (e) => {
        const { value } = e.target
        // console.log(event)
        setClicked(event)
        dispatch(selectEvent(event))
    }
    
    switch (type) {
        case "band":
        return (
            < div className="displayCard bandCard">

                <div className="likes" onClick={addLikes}><FontAwesomeIcon icon={ faHeart }/> <h5>{band.likes}</h5></div>
                
                    <Link to= {`/bands/${band._id}`}>
                        <div className="main-content">
                            {/* <img src={band.images ? band.images[0] : band1} 
                                alt={band.name} 
                            /> */}
                            <section className="bandCardInfo">
                                <h1>{band.name}</h1>
                            </section>
                            <section className="genres-section">
                                {
                                    band.genres?.map((genre, i) => (
                                        <p key={i}> {genre} | </p>
                                    ))
                                }
                            </section>
                        </div>
                    </Link>

            </div>
        );
        case "event":
        return (
            <div onClick={handleClickedEvent} className="displayCard eventCard">
                <div className="main-content">
                    <section className="event-time-section">
                        <h1 className="event-time">{ getShortDate(event.startTime) }</h1>
                        <h3 className="event-time">{getTime(event.startTime)} - {getTime(event.endTime)}</h3>
                        <h4>{event.location.name ? event.location.name : 'no address'}</h4>
                    </section>
                    { event.band ? <h3 className="event-band">{event.band.name}</h3> : null }

                    {/* <section className="genres-section">
                        {
                            event.band.genres?.map((genre, i) => (
                                <p key={i}> {genre} | </p>
                            ))
                        }
                    </section> */}
                </div>
            </div>
        );

        default:
        return;
    }
};

export default DisplayCard;
