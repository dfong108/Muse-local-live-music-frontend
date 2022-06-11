import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const BANDS_URL = 'http://localhost:4000/bands'

const initialState = {
    bands: [],
    sortedBands: [],
    allEvents: [],
    sortedEvents: [],
    selectedEvent : {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}
// ------------------------------------ CREATE ------------------------------------
// ------------------------------------ CREATE ------------------------------------

export const createBand = createAsyncThunk('bands/createBand', async (newBand) => {
    try {
        const response = await axios.post(BANDS_URL, newBand)
        // console.log('----ASYNC THUNK CREATE----')
        console.log(response.data)
        // getBands()
        return response.data
    } catch (error) {
        return error
    }
})

// ------------------------------------ GET ------------------------------------
// ------------------------------------ GET ------------------------------------

export const getBands = createAsyncThunk('bands/getBands', async () => {
    try {
        const response = await axios.get(BANDS_URL)
        // console.log('----ASYNC THUNK GET----')
        // console.log(response.data)
        return response.data
    } catch (error) {
        return(error.message)
    }
})

// ------------------------------------ UPDATE ------------------------------------
// ------------------------------------ UPDATE ------------------------------------

export const updateBand = createAsyncThunk('bands/updateBand', async (band) => {
    const { _id } = band;
    const UPDATE_BANDS_URL = `${BANDS_URL}/${_id}`;
    try {
        // console.log(band)
        const response = await axios.patch( UPDATE_BANDS_URL, band)
        console.log('----ASYNC THUNK UPDATE----')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return(error)
    }
})

// ------------------------- BAND SLICE (in-app functions) -------------------------
// ------------------------- BAND SLICE (in-app functions) -------------------------

export const bandsSlice = createSlice({
    name: 'bands',
    initialState,
    reducers: {
        // ----------- EVENT FILTERS -----------
        filterByBand: (state, action) => {
            console.log('------ FILTER BY BANDS --------')
            state.sortedEvents = state.allEvents
            let tempArray = state.allEvents
            tempArray = state.sortedEvents?.filter(event => {
                return event.band.name === action.payload.filter
            })
            if(!tempArray.length) {
               state.sortedEvents = state.allEvents
            } else { state.sortedEvents = tempArray }
        },
        filterByGenre: (state, action) => {
            const { payload } = action
            let tempBandsArray = state.bands;
            let tempEventsArray = [];
            console.log(payload)
            if(payload) {
                payload.forEach(genre => {
                    // --- FILTER EVENTS
                    state.sortedEvents.filter(event => {
                        if (event.band.genres.includes(genre) && !tempEventsArray.includes(event)){
                            tempEventsArray.push(event)
                        } 
                    })
                    // --- FILTER BANDS
                    let found = tempBandsArray.filter(band => band.genres.includes(genre))
                    console.log(found)
                    found.forEach(foundBand => {
                        tempBandsArray.splice(tempBandsArray.indexOf(foundBand), 1)
                        tempBandsArray.unshift(foundBand)
                    })
                })
            }
            // console.log(tempEventsArray)
            // --- DISPLAY EVENTS
            if(tempEventsArray.length) {
                state.sortedEvents = tempEventsArray
             } else { state.sortedEvents = state.allEvents }
             // --- DISPLAY BANDS
            if(tempBandsArray.length) {
                state.sortedBands = tempBandsArray
                return
             } else if(state.sortedBands[0] != state.bands[0]) {
                 state.sortedBands = state.bands
             }
        },
        selectEvent: (state, action) => {
            const { payload } = action;
            console.log(payload)
            state.selectedEvent =  payload
        },
        resetSelectEvent: (state, action) => {
            console.log('------ SELECTED EVENT RESET ------')
            state.selectedEvent =  {};
        }
    },    
    extraReducers(builder) {
        builder
            .addCase(getBands.pending, (state, action) => {
                    state.status = 'loading'
            })
            .addCase(getBands.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.bands = action.payload
                state.sortedBands = action.payload

                let tempArray = []
                action.payload.forEach(logBand => {
                    logBand.events?.map(event => {
                        let band = logBand
                        let location = event.location
                        let startTime = event.startTime
                        let endTime = event.endTime
                        let id = nanoid()
                        if(new Date(startTime).valueOf() >= new Date().valueOf() || new Date(endTime).getTime() >= new Date().getTime() ) {
                            let newEvent = { band, location, startTime, endTime, id }
                            tempArray.push(newEvent)
                        }
                    })
                })
                state.allEvents = tempArray.sort((a,b) => new Date(a.startTime) - new Date(b.startTime));
                state.sortedEvents = tempArray.sort((a,b) => new Date(a.startTime) - new Date(b.startTime));
            })
            .addCase(getBands.rejected, (state, action) => {
                state.status = 'failed'
                console.log(action.payload)
                state.error = action.error.message
            })
            .addCase(createBand.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log('--- CREATE BAND ----')
                console.log(action.payload)
                getBands()
            })
            .addCase(updateBand.fulfilled, (state, action) => {
                if (!action.payload?._id) {
                    console.log('--- INCOMPLETE UPDATE ----')
                    console.log(action.payload)
                    return
                }

                state.status = 'succeeded'
                console.log('----- BANDSLICE UPDATE -----')
                const { _id } = action.payload
                // const newBands = state.bands
                const newBands = state.bands.filter(band =>  band._id === _id )
                console.log(newBands)
                // console.log(action.payload)
                state.bands.bands = [ action.payload]
                    // if (band._id === action.payload._id) {
                    //     // console.log(action.payload)
                    //     console.log(band.name)
                    //     band = action.payload
                    // } else return 'NO BANDS FOUND'
                // })
                console.log(state.bands.bands)
                getBands()
            })
    }
})

export const { sortByDate, filterByBand, filterByGenre, selectEvent, resetSelectEvent, } = bandsSlice.actions

export const allBands = (state) => state.bands.bands;
export const sortedBands = (state) => state.bands.sortedBands;
export const getBandsStatus = (state) => state.bands.status;
export const getBandsError = (state) => state.bands.error;
export const selectBandsByName = (state, bandName) => {
    return state.bands.bands.find(band => band.name === bandName)
}
export const selectBandById = (state, bandID) => {
    return state.bands.bands.find(band => band._id === bandID)
}

export const allEvents = (state) => state.bands.allEvents;
export const sortedEvents = (state) => state.bands.sortedEvents;
export const selectedEvent = (state) => state.bands.selectedEvent;




export default bandsSlice.reducer;