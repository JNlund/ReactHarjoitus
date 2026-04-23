import React, { useState } from 'react'
import UserService from './services/User'

const UserEdit = ({ muokattavaUser, setMuokkaustila, setMessage, setIsPositive, setShowMessage }) => {
    const [firstname, setFirstname] = useState(muokattavaUser.firstname)
    const [lastname, setLastname] = useState(muokattavaUser.lastname)
    const [email, setEmail] = useState(muokattavaUser.email)
    const [accesslevelId, setAccesslevelId] = useState(muokattavaUser.accesslevelId)

    const handleSubmit = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        
        const updatedUser = {
            ...muokattavaUser,
            firstname: firstname,
            lastname: lastname,
            email: email,
            accesslevelId: parseInt(accesslevelId),
            password: muokattavaUser.password || ""
        }

        UserService.update(muokattavaUser.userId, updatedUser, token)
            .then(() => {
                setMessage(`Käyttäjä ${muokattavaUser.username} päivitetty!`)
                setIsPositive(true)
                setShowMessage(true)
                setMuokkaustila(false)
                setTimeout(() => setShowMessage(false), 3000)
            })
    }

    return (
        <div id="editWindow">
            <h3>Edit User: {muokattavaUser.username}</h3>
            <form onSubmit={handleSubmit}>
                <div><input type="text" value={firstname} placeholder="Firstname" onChange={({ target }) => setFirstname(target.value)} /></div>
                <div><input type="text" value={lastname} placeholder="Lastname" onChange={({ target }) => setLastname(target.value)} /></div>
                <div><input type="email" value={email} placeholder="Email" onChange={({ target }) => setEmail(target.value)} /></div>
                <div>
                    <select value={accesslevelId} onChange={({ target }) => setAccesslevelId(target.value)}>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                    </select>
                </div>
                <input type="submit" value="Save Changes" className="btn btn-primary" />
                <input type="button" value="Back" className="btn btn-secondary" onClick={() => setMuokkaustila(false)} />
            </form>
        </div>
    )
}

export default UserEdit