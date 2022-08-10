import './style.css';
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sortedEvents, selectedEvent, resetSelectEvent } from '../bands/bandsSlice';
import Facebook from '../media-icons/Facebook';
import { useLoadScript, GoogleMap, Marker, MarkerClusterer, DirectionsRenderer } from '@react-google-maps/api';


const Map = ({ events, defaultZoom, defaultCenter }) => {
// const Map = ({ events, defaultCenter }) => {

    const dispatch = useDispatch();
    const mapRef = useRef(GoogleMap);
    const center = useMemo(() => ({lat: 44, lng: -80}), []);
    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const newSelectedEvent = useSelector(selectedEvent);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);
    const [mapZoom, setMapZoom] = useState(10)
    const [selected, setSelected] = useState()

    // ---------------------------- SET MAP TO USER LOCATION ----------------------------

    function setCurrentLocation() {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
                defaultCenter
                ? setCoordinates(defaultCenter)
                : setCoordinates({ lat: latitude, lng: longitude })
                // console.log({ latitude, longitude })
                // setCoordinates({ lat: latitude, lng: longitude })
        })
    }
    useEffect(() => {
        setCurrentLocation()
    }, [])

    // ---------------------------- HANDLE SELECT EVENTS ----------------------------
    // useCallback(() => resetMap(), [newSelectedEvent])

    useEffect(() => {
        console.log(newSelectedEvent)
        // newSelectedEvent && panMap(newSelectedEvent)
        setSelected(newSelectedEvent)
        
        setTimeout(() => {
            panMap(newSelectedEvent)
        }, 2000)
    }, [selected])

    function panMap(event) {
        if(!event.location || event === selected) return;

        console.log('----- PAN -----')
        const { lat, lng } = event.location;
        mapRef.current?.panTo({ lat, lng})
        // setTimeout( () => mapRef.current?.panTo({ lat, lng}) , 1000)
        setSelected(event);
        setTimeout(dispatch(resetSelectEvent), 3000);
        console.log(event.band.name)
    }

    function resetMap() {
        console.log('----- RESET -----')
        dispatch(resetSelectEvent());
        // console.log(coordinates)
        // setTimeout(() => {
        //     mapRef.current?.panTo(coordinates)
        // }, 10000000)
        // if(coordinates) setTimeout(() => mapRef.current?.panTo(coordinates), 10000000)
        
        // coordinates && setTimeout(setCoordinates(coordinates), 10000)
        } 
    // ------------------------------ MAP SETTINGS ------------------------------

    const options = useMemo(() => (
        {
            disableDefaultUI: true,
            clickableIcons: false,
        }), [])

    // const options = {
    //     disableDefaultUI: true,
    //     clickableIcons: false,
    // }

    return (
        <GoogleMap 
            zoom={defaultZoom ? defaultZoom : mapZoom} 
            center={defaultCenter ? defaultCenter : coordinates} 
            mapContainerStyle={{width: '100%', height: '100%', marginBottom: "0", position: "absolute"}} 
            options={{options}}
            onLoad={onLoad}
            // onCenterChanged={(e) => console.log(e)}
            // onBoundsChanged={(e) => console.log(e)}
        >   
            {
                events?.map(event => {
                    const { lat, lng } = event.location;
                    return (
                        <Marker 
                            key={event.id} 
                            position={{ lat, lng }}
                            // icon="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                        />
                    )

                })
            }
            <Marker position={coordinates} icon='./icons8-musical-notes-48.png' />
        </GoogleMap>


    )

}

export default Map;
