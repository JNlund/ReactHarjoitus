import './App.css'
import React, { useState, useEffect } from 'react'


const Posts = () => {

    //komponentin tilan määrittely
const [posts, setPosts] = useState([])

useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json()) //muutetaan json data javascriptiksi
    .then(json => setPosts(json))
},[]
)

  return (
    <>
        <h2>Posts from typicode</h2>

        {
            posts && posts.map(p => <p key={p.id}>{p.title}</p>)
        }

      </>

  )
}

export default Posts
