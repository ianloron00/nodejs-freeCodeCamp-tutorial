const express = require('express')
const app = express()
const {products} = require('./data')

app.get('/', (req,res) => {
    res.json(products)
})

app.get('/any', (req,res) => {
    const newProducts = products.map(
        (product) => {
            const {id, name, price} = product
            return {id, name, price}
        }
    )
    res.json(newProducts)
})

// use route param to set product ID
app.get('/any/:productID', (req,res) => {
    const {productID} = req.params
    const singleProduct  = products.find(
        (product) =>product.id === Number(productID)
    )
    if (!singleProduct) {
        return res.status(404).send('Product does not exist')
    }
    res.json(singleProduct)
})

app.listen(5000, () => {
    console.log("Server is listening on port 5000...")
})