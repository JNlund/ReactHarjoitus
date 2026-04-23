import React, { useState, useEffect } from 'react'
import ProductService from './services/Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'

const ProductList = ({ setMessage, setIsPositive, setShowMessage }) => {

    // Tilamuuttujat tuotteille ja näkymille
    const [products, setProducts] = useState([])
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [muokattavaProduct, setMuokattavaProduct] = useState(null)

    // Haetaan tuotteet tietokannasta, kun sivu latautuu tai tilat muuttuvat
    useEffect(() => {
        const token = localStorage.getItem('token')
        ProductService.getAll(token)
            .then(res => {
                setProducts(res.data)
            })
            .catch(error => {
                console.log("Virhe tuotteiden haussa:", error)
            })
    }, [lisäystila, muokkaustila]) // Päivittää listan aina kun lisäys tai muokkaus sulkeutuu

    // Tuotteen poisto
    const deleteProduct = (product) => {
        let vastaus = window.confirm(`Haluatko varmasti poistaa tuotteen ${product.productName}?`)

        if (vastaus) {
            const token = localStorage.getItem('token')
            ProductService.remove(product.productId, token)
                .then(res => {
                    setMessage(`Tuote ${product.productName} poistettu onnistuneesti!`)
                    setIsPositive(true)
                    setShowMessage(true)
                    window.scrollBy(0, -10000) // Skrollaus ylös viestiä varten

                    // Poistetaan tuote listasta heti ilman sivun päivitystä
                    setProducts(products.filter(p => p.productId !== product.productId))

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 5000)
                })
                .catch(error => {
                    setMessage("Virhe tuotteen poistossa. Ehkä tuotteella on tilausrivejä?")
                    setIsPositive(false)
                    setShowMessage(true)
                    setTimeout(() => setShowMessage(false), 5000)
                })
        }
    }

    // Muokkaustilaan siirtyminen
    const editProduct = (p) => {
        setMuokattavaProduct(p)
        setMuokkaustila(true)
    }

    return (
        <div>
            <h1>Products</h1>

            {/* Nappi uuden tuotteen lisäämiseen */}
            <button className="btn btn-primary" onClick={() => setLisäystila(true)}>Add New Product</button>

            {/* Näytetään lisäyslomake, jos lisäystila on päällä */}
            {lisäystila && <ProductAdd 
                setLisäystila={setLisäystila} 
                setMessage={setMessage} 
                setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} 
            />}

            {/* Näytetään muokkauslomake, jos muokkaustila on päällä */}
            {muokkaustila && <ProductEdit 
                muokattavaProduct={muokattavaProduct} 
                setMuokkaustila={setMuokkaustila} 
                setMessage={setMessage} 
                setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} 
            />}

            <table className="table table-dark table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.productId}>
                            <td>{p.productId}</td>
                            <td>{p.productName}</td>
                            <td>{p.unitPrice} €</td>
                            <td>{p.unitsInStock} kpl</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => editProduct(p)}>Edit</button>
                                <button className="btn btn-danger btn-sm" style={{marginLeft: '10px'}} onClick={() => deleteProduct(p)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList