import React, { useState } from 'react'
import ProductService from './services/Product'

const ProductAdd = ({ setLisäystila, setMessage, setIsPositive, setShowMessage }) => {
    const [newProductName, setNewProductName] = useState('')
    const [newUnitPrice, setNewUnitPrice] = useState('')
    const [newUnitsInStock, setNewUnitsInStock] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        
        const productObject = {
            productName: newProductName,
            unitPrice: parseFloat(newUnitPrice),
            unitsInStock: parseInt(newUnitsInStock)
        }

        ProductService.create(productObject, token)
            .then(res => {
                setMessage(`Tuote ${newProductName} lisätty!`)
                setIsPositive(true)
                setShowMessage(true)
                setLisäystila(false)
                setTimeout(() => setShowMessage(false), 3000)
            })
            .catch(error => {
                setMessage("Virhe tuotteen lisäyksessä. Onhan nimi uniikki?")
                setIsPositive(false)
                setShowMessage(true)
                setTimeout(() => setShowMessage(false), 3000)
            })
    }

    return (
        <div id="addNew">
            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={newProductName} placeholder="Product Name" 
                        onChange={({ target }) => setNewProductName(target.value)} required />
                </div>
                <div>
                    <input type="number" step="0.01" value={newUnitPrice} placeholder="Unit Price" 
                        onChange={({ target }) => setNewUnitPrice(target.value)} required />
                </div>
                <div>
                    <input type="number" value={newUnitsInStock} placeholder="Units In Stock" 
                        onChange={({ target }) => setNewUnitsInStock(target.value)} required />
                </div>
                <input type="submit" value="Save" className="btn btn-success" />
                <input type="button" value="Back" className="btn btn-secondary" onClick={() => setLisäystila(false)} />
            </form>
        </div>
    )
}

export default ProductAdd