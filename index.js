const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { readData, writeData } = require('./functions')
require('dotenv').config()

//Midleware
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send("Welcome my first API")
})

app.get('/dishes', (req, res) => {
    const data = readData()
    res.json(data.dishes)
})

app.post('/dishes', (req, res) => {
    const data = readData()
    const dish = req.body
    const newDish = {
        id: data.dishes.length + 1,
        ...dish
    }
    data.dishes.push(newDish)
    writeData(data)
    res.json(newDish)
})

app.get('/books', (req, res) => {
    const data = readData()
    res.json(data.books)
})

app.post('/books', (req, res) => {
    const data = readData()
    const book = req.body
    const newBook = {
        id: data.books.length + 1,
        ...book
    }
    data.books.push(newBook)
    writeData(data)
    res.json(newBook)
})

app.put('/dishes/:id', (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const dishesIndex = data.dishes.findIndex(dish => dish.id === id)
    const body = req.body
    data.dishes[dishesIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "el proceso de actualizacion se realizó correctamente"})
})

app.delete('/dishes/:id', (req, res) => {
    const data = readData()
    const id = req.params.id
    const dishesIndex = data.dishes.findIndex(dish => dish.id === id)
    data.dishes.splice(dishesIndex, 1)
    writeData(data)
    res.json({ message: "se ha eliminado correctamente su registro" })
})

app.put('/books/:id', (req, res) => {
    const data = readData()
    const id = parseInt(req.params.id)
    const booksIndex = data.books.findIndex(book => book.id === id)
    const body = req.body
    data.books[booksIndex] = {
        id,
        ...body
    }
    writeData(data)
    res.json({ message: "el proceso de actualizacion se realizó correctamente"})
})

app.delete('/books/:id', (req, res) => {
    const data = readData()
    const id = req.params.id
    const booksIndex = data.books.findIndex(book => book.id === id)
    data.books.splice(booksIndex, 1)
    writeData(data)
    res.json({ message: "se ha eliminado correctamente su registro" })
})

app.listen(process.env.PORT, () => {
    console.log(`el servidor está corriendo en el puerto ${process.env.BACKEND_BASEURL}`)
})
