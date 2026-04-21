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

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


const App = () => {

const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(true)
const [showMessage, setShowMessage] = useState('')
const [loggedInUser, setLoggedInUser] = useState('')
  


useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
},[])


// Logout napin tapahtumankäsittelijä
const logout = () => {
  localStorage.clear()
  setLoggedInUser('')
}
  
  return (
    <div className="App">

      {!loggedInUser && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}

{ loggedInUser && 
      <Router>        
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Link to={'/Customers'} className='nav-link'>Customers</Link>
                <Link to={'/Users'} className='nav-link'>Users</Link>
                <Link to={'/Laskuri'} className='nav-link'>Laskuri</Link>
                <Link to={'/Posts'} className='nav-link'>Typicode posts</Link>
                <button onClick={() => logout()}>Logout</button>
            </Nav>
          </Navbar>
          
          <h2>Northwind Traders</h2>

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Switch>
                <Route path="/Customers"> <CustomerList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} /></Route>

          <Route path="/Users"> <UserList setMessage={setMessage} setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} /></Route>

                <Route path="/Laskuri"> <Laskuri /></Route>
                <Route path="/Posts"> <Posts /></Route>

          </Switch>
           
      </Router>

    }
          
      </div>
  )
}

export default App