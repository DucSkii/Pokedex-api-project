import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

const Pokemon = () => {

  const location = useLocation()
  const pokemonId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
  const [pokemon, setPokemon] = useState(undefined)
  const [fullImageUrl, setFullImageUrl] = useState(null)

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(response => {
        const { data } = response
        setPokemon(data)
      }).catch(error => {
        setPokemon(false)
      })
    setFullImageUrl(`https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  // waiting for useEffect to update pokemon
  if (pokemon === undefined) {
    return (
      <CircularProgress />
    )
  }
  if (pokemon === false) {
    return (
      <>
        <Typography>Pokemon not found</Typography>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button variant='contained' style={{ margin: '20px', padding: '10px', backgroundColor: '#fff' }}>Return to pokedex</Button>
        </Link>
      </>
    )
  }
  if (pokemon !== undefined && pokemon) {
    return (
      <div>
        <Typography variant='h1'>{pokemon.id}.{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Typography>
        <img src={fullImageUrl} alt='' style={{ maxHeight: '500px' }} />
        <Typography variant='h2'>Pokemon Info</Typography>
        <Typography variant='h5'>Height: {pokemon.height}</Typography>
        <Typography variant='h5'>Weight: {pokemon.weight}lbs</Typography>
        <Typography variant='h5'>
          Type: {pokemon.types.map((type, index) => {
          return (
            <span key={index}>{type.type.name}, </span>
          )
        })}
        </Typography>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button variant='contained' style={{ margin: '20px', padding: '10px', backgroundColor: '#fff' }}>Return to pokedex</Button>
        </Link>
      </div>
    )
  }
}

export default Pokemon