import React, { useState } from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'

const App = () => {

  //komponentin tilan määrittely
const [showLaskuri, setShowLaskuri] = useState(false)

const huomio = () => {
  alert("huomio!")
}

  return (
    <div className="App">
      <h1>hello from React!</h1>
      
      {showLaskuri && <Laskuri huomio={huomio} />}
      {!showLaskuri && <button onClick={() => setShowLaskuri(true)}>näytä laskuri</button>}
      {showLaskuri && <button onClick={() => setShowLaskuri(false)}>piilota laskuri</button>}

      <Viesti teksti="Tämä on viesti!" />

      </div>

  )
}

export default App
