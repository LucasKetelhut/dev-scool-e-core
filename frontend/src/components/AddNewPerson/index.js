import styled from 'styled-components'
import React, { useState } from 'react'
import api from '../../services/api'
import swal from 'sweetalert'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 150px;

    label {
        font-size: 18px;
    }

    input {
        padding: 10px;
        margin-bottom: 15px;
        text-align: center;
        width: 158px;
    }

    button {
        padding: 10px;
        margin-top: 10px;
        width: 182px;
    }

    button:hover {
        cursor: pointer;
    }
`

export default function List() {
    const [list, setList] = useState([])
    const [name, setName] = useState([])
    const [age, setAge] = useState([])

    async function handleAddPerson(e) {
        e.preventDefault()

        const state = {
            name,
            age
        }

        const response  = await api.post('list', state)
        swal("Pessoa cadastrada!", "Obrigado pelo seu tempo.", "success", {
            buttons: false,
            timer: 2500
        });
    
        const person = response.data 
    
        setList([...list, person])

        setName("")
        setAge("")
    }

    return (
        <Form action="POST" onSubmit={handleAddPerson}>
            <label htmlFor="name">Nome:</label>
            <input type="text" name="name" id="name" value={name} required
                onChange={(e) => {
                    setName(e.target.value)
                }}/>
            <label htmlFor="age">Idade:</label>
            <input type="number" name="age" id="age" value={age} required
                onChange={(e) => {
                    setAge(e.target.value)
                }}/>
            <button type="submit">
                Adicionar pessoa
            </button>
        </Form>
    );
}