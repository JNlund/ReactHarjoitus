import React, { useState, useEffect } from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit' 

const UserList = ({ setMessage, setIsPositive, setShowMessage }) => {

    // Tilamuuttujat
    const [users, setUsers] = useState([])
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [muokattavaUser, setMuokattavaUser] = useState(null)
    const [refresh, setRefresh] = useState(false)

    // Haetaan käyttäjät tietokannasta
  useEffect(() => {
    const token = localStorage.getItem('token')
    UserService.getAll(token)
        .then(res => {
            // Jos res.data on olemassa, käytetään sitä. Muuten tyhjä lista.
            setUsers(res.data || []) 
        })
        .catch(error => {
            console.error("Virhe haettaessa käyttäjiä:", error)
            setUsers([]) // Jos virhe, asetetaan tyhjä lista ettei kaadu
        })
}, [lisäystila, muokkaustila, refresh]) // Päivittää listan kun lisäys tai muokkaus sulkeutuu

    // Käyttäjän poisto
    const deleteUser = (user) => {
        let vastaus = window.confirm(`Haluatko varmasti poistaa käyttäjän ${user.username}?`)

        if (vastaus) {
            const token = localStorage.getItem('token')
            UserService.remove(user.userId, token)
                .then(res => {
                    setMessage(`Käyttäjä ${user.username} poistettu!`)
                    setIsPositive(true)
                    setShowMessage(true)
                    
                    // Päivitetään lista heti ruudulla
                    setUsers(users.filter(u => u.userId !== user.userId))

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 5000)
                })
                .catch(error => {
                    setMessage("Virhe käyttäjän poistossa.")
                    setIsPositive(false)
                    setShowMessage(true)
                    setTimeout(() => setShowMessage(false), 5000)
                })
        }
    }

    // Muokkaustilaan siirtyminen
    const editUser = (u) => {
        setMuokattavaUser(u)
        setMuokkaustila(true)
    }

    return (
        <div>
            <h1>Users</h1>

            <button className="btn btn-primary" onClick={() => setLisäystila(true)}>Add New User</button>

            {/* Käyttäjän lisäyslomake  */}
            {lisäystila && <UserAdd 
                setLisäystila={setLisäystila} 
                setMessage={setMessage} 
                setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} 
                onUserAdded={() => setRefresh(!refresh)}
            />}

            {/* Käyttäjän muokkauslomake */}
            {muokkaustila && <UserEdit 
                muokattavaUser={muokattavaUser} 
                setMuokkaustila={setMuokkaustila} 
                setMessage={setMessage} 
                setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} 
            />}

            <table className="table table-dark table-striped mt-3">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Access Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(u => (
                        <tr key={u.userId}>
                            <td>{u.firstname}</td>
                            <td>{u.lastname}</td>
                            <td>{u.username}</td>
                            <td>{u.email}</td>
                            <td>{u.accesslevelId}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => editUser(u)}>Edit</button>
                                <button className="btn btn-danger btn-sm" style={{marginLeft: '10px'}} onClick={() => deleteUser(u)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList