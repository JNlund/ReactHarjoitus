import React, { useState } from 'react'
import ProductService from './services/Product'

const ProductEdit = ({ muokattavaProduct, setMuokkaustila, setMessage, setIsPositive, setShowMessage }) => {
    const [productName, setProductName] = useState(muokattavaProduct.productName)
    const [unitPrice, setUnitPrice] = useState(muokattavaProduct.unitPrice)
    const [unitsInStock, setUnitsInStock] = useState(muokattavaProduct.unitsInStock)

    const handleSubmit = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        
        const updatedProduct = {
            ...muokattavaProduct,
            productName: productName,
            unitPrice: parseFloat(unitPrice),
            unitsInStock: parseInt(unitsInStock)
        }

        ProductService.update(muokattavaProduct.productId, updatedProduct, token)
            .then(() => {
                setMessage(`Tuote ${productName} päivitetty!`)
                setIsPositive(true)
                setShowMessage(true)
                setMuokkaustila(false)
                setTimeout(() => setShowMessage(false), 3000)
            })
            .catch(error => {
                setMessage("Virhe muokkauksessa")
                setIsPositive(false)
                setShowMessage(true)
                setTimeout(() => setShowMessage(false), 3000)
            })
    }

    return (
        <div id="editWindow">
            <h3>Edit Product: {muokattavaProduct.productName}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label><br/>
                    <input type="text" value={productName} onChange={({ target }) => setProductName(target.value)} required />
                </div>
                <div>
                    <label>Unit Price</label><br/>
                    <input type="number" step="0.01" value={unitPrice} onChange={({ target }) => setUnitPrice(target.value)} required />
                </div>
                <div>
                    <label>Units In Stock</label><br/>
                    <input type="number" value={unitsInStock} onChange={({ target }) => setUnitsInStock(target.value)} required />
                </div>
                <input type="submit" value="Save Changes" className="btn btn-primary" />
                <input type="button" value="Back" className="btn btn-secondary" onClick={() => setMuokkaustila(false)} />
            </form>
        </div>
    )
}

export default ProductEdit