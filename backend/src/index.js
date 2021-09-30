const express = require('express')  // Ferramenta de rotas, retornos, middlewares.. etc
const cors = require('cors')
const app = express()
const data = require("./data.json")

app.use(cors())
app.use(express.json())

let orderedList = [] 
var idNumber = 4

// ADICIONANDO MIDDLEWARES PARA INTERCEPTAR AS REQUISIÇÕES E ALTERAR DADOS PARA RETORNAREM NO ENDPOINT
const orderListByName = (req, res, next) => {

    let list = data.slice()
    let nextPerson = {
        "name": null,
        "age": null
    }
    let index = 0

    while (orderedList.length != data.length) {
        
        for (let i = 0; i < list.length; i++) {
            if (i == 0) nextPerson = list[i] 
            else {
                if (nextPerson.name != null && list[i].name.trim().toUpperCase() <= nextPerson.name.trim().toUpperCase()) {
                    nextPerson = list[i]
                }
            }
        }
        
        //if (!orderedList.find(p => p.name == nextPerson.name)) {  
        orderedList.push(nextPerson)

        index = list.findIndex(p => p.name == nextPerson.name && p.age == nextPerson.age)

        list.splice(index, 1)
        //}
    }

    next()

    orderedList = []
}

const orderListByAge = (req, res, next) => {

    let list = data.slice()
    let nextPerson = {
        "name": null,
        "age": null
    }
    let index = 0

    while (orderedList.length != data.length) {
        
        for (let i = 0; i < list.length; i++) {
            if (i == 0) nextPerson = list[i] 
            else {
                if (nextPerson.age != null && list[i].age >= nextPerson.age) {
                    nextPerson = list[i]
                }
            }
        }
        
        // if (!orderedList.find(p => p.name == nextPerson.name)) {
        orderedList.push(nextPerson)

        index = list.findIndex(p => p.name == nextPerson.name && p.age == nextPerson.age)

        list.splice(index, 1)
        //}
    }

    next()

    orderedList = []
}

const insertClassification = (req, res, next) => {
    const person = req.body

    if (person.age < 12) person.classification = "Criança"
    else if (person.age < 20) person.classification = "Adolescente"
    else if (person.age < 65) person.classification = "Adulto"
    else person.classification = "Idoso"
    
    return next()
}

const insertId = (req, res, next) => {
    const person = req.body

    person.id = idNumber++

    return next()
}

app.get("/list", (req, res) => {
    return res.json(data)
})

app.get("/list/orderByName", orderListByName, (req, res) => {
    return res.json(orderedList)
})

app.get("/list/orderByAge", orderListByAge, (req, res) => {
    return res.json(orderedList)
})

app.post("/list", insertId, insertClassification, (req, res) => {
    const person = req.body

    if (person.age < 0 || person.age > 150) {
        res.sendStatus(400).json()
        throw new Error('Idade inválida')
    } else {
        data.push(person)

        return res.json(person)
    }
})

app.listen(3333, () => {
    console.log('Server is running!')
})