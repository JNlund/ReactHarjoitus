import './App.css'
import React, { useState } from 'react'

const Laskuri = (props) => {

    //komponentin tilan määrittely
const [luku, setLuku] = useState(0)

  return (
    <>
        <h3>Luku: {luku}</h3>
      <button onClick={() => setLuku(luku + 1)}>+</button>
        <button onClick={() => setLuku(luku - 1)}>-</button>
        <button onClick={() => setLuku(0)}>reset</button> 
        <button onClick={props.huomio}>huomio!</button>

      </>

  )
}

export default Laskuri
