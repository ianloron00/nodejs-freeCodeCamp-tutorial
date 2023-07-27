const express = require('express')
const app = express()
const {products} = require('./data')
const logger = require('./logger')

const productsPath = '/app/products'

// req => middleware => res
app.use('/app', logger)

app.get('/', (req,res) => {
    // res.json(products)
    res.send(`<h1>Home Page</h1><a href="${productsPath}">products</a>`)
})

app.get(`${productsPath}`, (req,res) => {
    const newProducts = products.map(
        (product) => {
            const {id, name, price} = product
            return {id, name, price}
        }
    )
    res.json(newProducts)
})

// use route param to set product ID
app.get(`${productsPath}/:productID`, (req,res) => {
    const {productID} = req.params
    const singleProduct  = products.find(
        (product) =>product.id === Number(productID)
    )
    if (!singleProduct) {
        return res.status(404).send('Product does not exist')
    }
    res.json(singleProduct)
})

app.get('/app/v1/query', (req,res) => {
    const { search, limit } = req.query
    let sortedProducts = [...products]

    if (search) {
        sortedProducts = sortedProducts.filter(
            (product) => {
                return product.name.startsWith(search)
            }
        )
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    return sortedProducts.length > 1 
    ? res.status(200).json(sortedProducts)
    : res.status(200).json({ success: true, data: [] })
})

app.listen(5000, () => {
    console.log("Server is listening on port 5000...")
})