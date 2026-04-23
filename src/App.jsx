import React, {useState, useEffect} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import Message from './Message'
import Login from './Login'
import ProductList from './ProductList'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


const App = () => {

const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(true)
const [showMessage, setShowMessage] = useState('')
const [loggedInUser, setLoggedInUser] = useState('')
const [accessLevel, setAccessLevel] = useState(null)

  

useEffect(() => {
  let storedUser = localStorage.getItem("username")
  let storedLevel = localStorage.getItem("accesslevelId") // Haetaan taso
  
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
    setAccessLevel(storedLevel) // Asetetaan taso tilaan
  }
}, [])


// Logout napin tapahtumankäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}
  
  return (
    <div className="App">

     {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} 
                setAccessLevel={setAccessLevel} />}

{ loggedInUser && 
      <Router>        
                        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
              <Link to={'/Customers'} className='nav-link'>Customers</Link>
              <Link to={'/Products'} className='nav-link'>Products</Link>
              
              <Link to={'/Users'} className='nav-link'>Users</Link>
              
              <Link to={'/Laskuri'} className='nav-link'>Laskuri</Link>
              <Link to={'/Posts'} className='nav-link'>Typicode posts</Link>
              <button onClick={() => logout()}>Logout</button>
          </Nav>
        </Navbar>
          
          <h2>Northwind Traders</h2>

          {showMessage && <Message message={message} isPositive={isPositive} />}

         
                 <Routes>
    {/* Etusivu */}
    <Route path="/" element={<h3>Tervetuloa!</h3>} />

    <Route
      path="/Customers"
      element={
        <CustomerList
          setMessage={setMessage}
          setIsPositive={setIsPositive}
          setShowMessage={setShowMessage}
        />
      }
    />

    <Route
      path="/Products"
      element={
        <ProductList
          setMessage={setMessage}
          setIsPositive={setIsPositive}
          setShowMessage={setShowMessage}
        />
      }
    />

    <Route
      path="/Users"
      element={
        accessLevel == 1 ? (
          <UserList
            setMessage={setMessage}
            setIsPositive={setIsPositive}
            setShowMessage={setShowMessage}
          />
        ) : (
          <h2 style={{ color: "red" }}>Pääsy kielletty</h2>
        )
      }
    />

    <Route path="/Laskuri" element={<Laskuri />} />
    <Route path="/Posts" element={<Posts />} />
  </Routes>
           
      </Router>

    }
          
      </div>
  )
}

export default App