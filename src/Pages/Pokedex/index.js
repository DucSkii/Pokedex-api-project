import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Grid, Card, CardContent, TextField } from '@material-ui/core'
import { useStyles } from './styles'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

const Pokedex = () => {

  const classes = useStyles()
  const [pokemon, setPokemon] = useState(null)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=807')
      .then(response => {
        const newPokemonData = {}
        response.data.results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`
          }
        })
        setPokemon(newPokemonData)
      })
  }, [])

  const handleSearchChange = (e) => {
    setFilter(e.target.value)
  }

  const getPokemonCard = () => {
    if (filter === "") {
      return Object.keys(pokemon).map((key, index) => {
        return (
          <Grid item xs={12} sm={4} key={index}>
            <Link to={`/${pokemon[key].id}`} style={{ textDecoration: 'none' }}>
              <Card className={classes.pokemonCard}>
                <img src={pokemon[key].sprite} alt='' style={{ maxHeight: '100px', padding: '20px' }} />
                <CardContent>{pokemon[key].id}.{pokemon[key].name.charAt(0).toUpperCase() + pokemon[key].name.slice(1)}</CardContent>
                {/* Upper case first letter, slice from second letter and attach */}
              </Card>
            </Link>
          </Grid>
        )
      })
    }
    return Object.keys(pokemon).map((key, index) => {
      if (pokemon[key].name.includes(filter)) {
        return (
          <Grid item xs={12} sm={4} key={index}>
            <Link to={`/${pokemon[key].id}`} style={{ textDecoration: 'none' }}>
              <Card className={classes.pokemonCard}>
                <img src={pokemon[key].sprite} alt='' style={{ maxHeight: '100px', padding: '20px' }} />
                <CardContent>{pokemon[key].id}.{pokemon[key].name.charAt(0).toUpperCase() + pokemon[key].name.slice(1)}</CardContent>
                {/* Upper case first letter, slice from second letter and attach */}
              </Card>
            </Link>
          </Grid>
        )
      }
      return null
    })
  }

  if (!pokemon) {
    return (
      <CircularProgress />
    )
  }
  return (
    <>
      <AppBar position='static' style={{ padding: '0px 20px', display: 'flex', alignItems: 'center' }}>
        <Toolbar>
          <SearchIcon style={{ marginTop: '20px', marginRight: '10px' }} />
          <TextField
            variant='standard'
            label='Pokemon'
            style={{ color: '#fff' }}
            onChange={e => handleSearchChange(e)}
          />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} className={classes.pokedexContainer}>
        {getPokemonCard()}
      </Grid>
    </>
  )
}

export default Pokedex