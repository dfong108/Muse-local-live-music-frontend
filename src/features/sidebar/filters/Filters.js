import './style.css';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allBands, allEvents, filterByBand, filterByGenre } from '../../bands/bandsSlice'

const Filters = () => {
  const dispatch = useDispatch()

  const [filter, setFilter] = useState(null)

  const bands = useSelector(allBands)
  const events = useSelector(allEvents)

  // ------------------ HANDLE FUNCTIONS ------------------

  const handleFilterByBand = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    console.log(`name...${name}`)
    console.log(`value...${value}`)
    let newFilter = { "type": name, "filter": value }
    console.log(newFilter)
    setFilter( newFilter )
    dispatch(filterByBand(newFilter))
  }

  let genresArray = [];

  const handleFilterByGenre = (e) => {
    const { value, checked } = e.target

    console.log('checked...' + checked)
    console.log('value...' + value)

    checked 
      ? genresArray.push(value)
      : genresArray.splice(genresArray.indexOf(value), 1)

    // console.log(genresArray)
    dispatch(filterByGenre(genresArray))
  }

  return (
    <div className='filters-container'>
      {/* --------------------------- FILTER BANDS --------------------------- */}
      {/* <span>Filter Bands</span> */}
{/*------------ Filter by genre */}
      {/* <section className='filter-sub filter-bands'>
        <label htmlFor='filterBands' /> Genres
        <select name='filterBands'>
          <option name='filerBands' value={null}>Select a genre</option>
          <option name='Funk'>Funk</option>
          <option name='Jazz'>Jazz</option>
          <option name='MowTown'>Mowtown</option>
          <option name='Pop'>Pop</option>
          <option name='Reggae'>Reggae</option>
          <option name='Rock'>Rock</option>
          <option name='Soul'>Soul</option>
        </select>
      </section> */}

      {/* --------------------------- FILTER EVENTS --------------------------- */}
      {/* --------------------------- FILTER EVENTS --------------------------- */}
      {/* --------------------------- FILTER EVENTS --------------------------- */}
      <span>Filters</span>

      <section className='filter-sub filter-events'>
{/*------------ Filter by band */}
        <div>
          <label htmlFor='filterByBand'> Bands 
            <select name="filterByBand" onChange={handleFilterByBand}>
              <option name="filterEvents-byBand" value={null}>Select a Band</option>
              {
                bands?.map((band) => (
                  <option key={band._id} name="filterEvents-byBand" value={band.name}>{band.name}</option>
                ))
              }
            </select>
          </label>
        </div>
{/*------------ Filter by day of the week */}
        {/* <div>
          <label htmlFor='filterEvents-byDayofTheWeek'> Days of the Week
              
          
          </label>
        </div> */}
{/*------------ Filter by genre */}
        <h3>Genres</h3>
        <div className='filterByGenres'>
          <label htmlFor='filterByGenres' />
              <div className='genre-option'>funk<input onChange={handleFilterByGenre} type="checkbox" name="genres" value="funk" /></div>
              <div className='genre-option'>pop<input onChange={handleFilterByGenre} type="checkbox" name="genres" value="pop" /></div>
              <div className='genre-option'>rock<input onChange={handleFilterByGenre} type="checkbox" name="genres" value="rock" /></div>
              <div className='genre-option'>soul<input onChange={handleFilterByGenre} type="checkbox" name="genres" value="soul" /></div>
              <div className='genre-option'>reggae<input onChange={handleFilterByGenre} type="checkbox" name="genres" value="reggae" /></div>
              <div className='genre-option'>jazz<input onChange={handleFilterByGenre} type="checkbox" name="genres" value="jazz" /></div>
              <div className='genre-option'>mowtown<input onChange={handleFilterByGenre} type="checkbox" name="genres" value="mowtown" /></div>
        </div>

      </section>
    </div>
  )
}

export default Filters