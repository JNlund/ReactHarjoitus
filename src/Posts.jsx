import './App.css'
import React, { useState, useEffect } from 'react'


const Posts = () => {

    //komponentin tilan määrittely
const [posts, setPosts] = useState([])
const [showPosts, setShowPosts] = useState(false)

useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json()) //muutetaan json data javascriptiksi
    .then(json => setPosts(json))
},[]
)

  return (
    <>
        <h2 onClick={() => setShowPosts(!showPosts)}>Posts from typicode</h2>

        {
            showPosts &&posts && posts.map(p =>
                <div key={p.id} className="post">
                    <h3>{p.title}</h3>
                    <h5>User ID: {p.userId}</h5>
                    <p>{p.body}</p>
                </div>
            )
            
        }

      </>

  )
}

export default Posts
