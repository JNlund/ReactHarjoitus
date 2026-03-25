import './App.css'
import React, { useState } from 'react'

//propsi otettu vastaan suoraan nimellä huomio, eikä props-objektina 
const Laskuri = (huomio) => {

    //komponentin tilan määrittely
const [luku, setLuku] = useState(0)

  return (
    <>
        <h3>Luku: {luku}</h3>
      <button onClick={() => setLuku(luku + 1)}>+</button>
        <button onClick={() => setLuku(luku - 1)}>-</button>
        <button onClick={() => setLuku(0)}>reset</button> 
        <button onClick={huomio}>huomio!</button>

      </>

  )
}

export default Laskuri
