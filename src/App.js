import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Pokedex from './Pages/Pokedex'
import Pokemon from './Pages/Pokemon'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/:pokemonId' component={Pokemon} />
        <Route exact path='/' component={Pokedex} />
      </Switch>
    </div>
  )
}

export default App
