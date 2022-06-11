import "./style.css";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { sortedBands, getBandsStatus, getBands, selectBandsByName } from "./bandsSlice";

import DisplayCard from "../displayCard/DisplayCard";


const Bands = () => {

    const dispatch = useDispatch();
    const bands = useSelector(sortedBands);
    const bandsStatus = useSelector(getBandsStatus);

    const [displayBands, setDisplayBands] = useState(bands)

   console.log(bands)

    useEffect(() => {
        setDisplayBands(bands)
        if (bandsStatus === 'idle') {
            dispatch(getBands())
        }
    }, [])

    return (
        <div className="bandsContainer">
            {
                bands
                ? (
                    bands?.map((band, i) => (
                    <DisplayCard key={band._id} type="band" band={band} />
                    ))
                ) : <h1>Loading Bands....</h1>
            }
        </div>
    )
};

export default Bands;
