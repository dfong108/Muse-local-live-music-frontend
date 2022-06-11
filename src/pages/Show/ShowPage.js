import "./style.css";
// import "../../assets/"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allBands, getBands, getBandsStatus, updateBand, selectBandById, selectBandsByName, sortedEvents } from "../../features/bands/bandsSlice";
import { LoremIpsum } from "react-lorem-ipsum";
import { useLoadScript, GoogleMap } from '@react-google-maps/api';

import Map from '../../features/map/Map';
import DisplayCard from "../../features/displayCard/DisplayCard";

import MediaIcons from "../../features/media-icons/MediaIcons";


// const queryParams = new URLSearchParams(window.location.search)
// console.log(queryParams.get('name'))

const ShowPage = () => {

  const dispatch = useDispatch();
  const { id, bandName }  = useParams();

  console.log(id)
  console.log(bandName)

  // const thisBand = useSelector((state) => selectBandById(state, id))
  const thisBand = useSelector((state) => {
    if(id) return selectBandById(state, id)
    if(bandName) return selectBandsByName(state, bandName)
  })

  const theseEvents = useSelector(sortedEvents)?.filter(event => event.band._id === thisBand._id)


// -------------------------- SET UP BAND DATA --------------------------
// -------------------------- SET UP BAND DATA --------------------------
  
  const [likes, setLikes] = useState(0);

  const addLikes = () => {
    let count = thisBand.likes + 1
    console.log(count)
    console.log(thisBand.name)
    setLikes(count)
    dispatch(updateBand({ ...thisBand, likes : count }))
  }
    
  console.log(thisBand);
 

// -------------------------- SET UP MAP DATA --------------------------
// -------------------------- SET UP MAP DATA --------------------------
const mapRef = useRef(GoogleMap);
const { isLoaded  } = useLoadScript({
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
  // libraries: ["places"]
});
    

  const { lat } = thisBand?.events[0].location; 
  const { lng } = thisBand?.events[0].location; 
  const mapCenter =  { lat, lng }
  // console.log(mapCenter)

  return (
    <>
      {thisBand ? (
        <div className="band-page">

{/* --------------------------- BAND INFO (top half) --------------------------- */}
          <div className="page-half page-top-half">
            {/* ----------- Media ----------- */}
              <section className="quarter media-quarter">
                  {thisBand.images[0] 
                    ? (
                        <LazyLoadImage
                          className="band-img"
                          src={thisBand.images[0]}
                          alt={`a picture of ${thisBand.name}`}
                        />
                    ) : (
                        <LazyLoadImage
                          className="band-img"
                          // src={"../../assets/band1.jpg"}
                          src="https://images.unsplash.com/photo-1484876065684-b683cf17d276?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          alt=""
                        />
                  )}
              </section>
              <div className="section-divider"></div>
            {/* ----------- Biography ----------- */}
              <section className="quarter bio-quarter">
                  <div className="page-header">
                    <span className="band-name">
                      <h3 className="title">{thisBand?.name}</h3>
                    </span>
                    <MediaIcons links={thisBand.mediaLinks} />
                  </div>

                  <div className="biography">
                    <div>
                      <p>{thisBand?.biography}</p>
                      <LoremIpsum p={2} />
                    </div>
                      <div className="interact">
                        <button className="follow-button">Follow</button>
                        <div className="show-likes" onClick={addLikes}><FontAwesomeIcon icon={ faHeart }/> <h5>{thisBand.likes}</h5></div>
                      </div>
                  </div>
              </section>
          </div>

{/* --------------------------- EVENTS & MAP (bottom half) --------------------------- */}
          <div className="page-half page-bottom-half">
            {/* ----------- Map ----------- */}
              <section className="quarter map-quarter">
                { !isLoaded 
                  ? <div>Loading Map...</div> 
                  : <Map 
                      events={thisBand.events}
                      defaultZoom={14}
                      defaultCenter = {mapCenter}
                    />
                }
                
              </section>
            {/* ----------- Events ----------- */}
            {/* ----------- Events ----------- */}
              <section className="quarter events-quarter">
                {theseEvents?.map((event) => (
                  <div className="displayCard-holder">
                    <DisplayCard key={event.id} type="event" event={event} />
                  </div>
                ))}
              </section>
          </div>

        </div>
      ) : (
        <h2>"loading"</h2>
      )}
    </>
  );
};

export default ShowPage;
