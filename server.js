const { json } = require('express')
const express = require('express')
const app = express()
const data = require("./data.json")

app.use(express.json())

app.get("/list", (req, res) => {
    res.json(data);
    return res.sendStatus(200).json()
})

app.get("/list/orderByName", (req, res) => {

    let list = data.slice()
    let orderedList = []
    let nextPerson = {
        "name": null,
        "age": null
    }
    let index = 0

    while (orderedList.length != data.length) {
        
        for (let i = 0; i < list.length; i++) {
            if (i == 0) nextPerson = list[i] 
            else {
                if (nextPerson.name != null && list[i].name.trim()[0] < nextPerson.name.trim()[0]) {
                    nextPerson = list[i]
                }
            }
        }
        
        if (!orderedList.find(p => p.name == nextPerson.name)) {
            orderedList.push(nextPerson)

            index = list.findIndex(p => p.name == nextPerson.name)

            list.splice(index, 1)
        }
        
    }

    res.json(orderedList)
    return res.sendStatus(200).json()
})

app.get("/list/orderByAge", (req, res) => {

    let list = data.slice()
    let orderedList = []
    let nextPerson = {
        "name": null,
        "age": null
    }
    let index = 0

    while (orderedList.length != data.length) {
        
        for (let i = 0; i < list.length; i++) {
            if (i == 0) nextPerson = list[i] 
            else {
                if (nextPerson.age != null && list[i].age > nextPerson.age) {
                    nextPerson = list[i]
                }
            }
        }
        
        if (!orderedList.find(p => p.name == nextPerson.name)) {
            orderedList.push(nextPerson)

            index = list.findIndex(p => p.name == nextPerson.name)

            list.splice(index, 1)
        }
        
    }

    res.json(orderedList)
    return res.sendStatus(200).json()
})

app.post("/list", (req, res) => {
    const person = req.body

    if (person.age < 0) return res.sendStatus(400).json()
    else if (person.age < 12) person.classification = "Criança"
    else if (person.age < 20) person.classification = "Adolescente"
    else if (person.age < 65) person.classification = "Adulto"
    else person.classification = "Idoso"

    data.push(person)

    res.json(person)
})


app.listen(3000, () => {
    console.log('Server is running!')
})

