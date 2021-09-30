import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import api from '../../services/api'

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

    async function handleAddPerson() {
        const response  = await api.post('list', {})
    
        const person = response.data 
    
        setList([...list, person])
    }

    return (
        <Form action="/list" action="POST">
            <label htmlFor="name">Nome:</label>
            <input type="text" name="name" id="name" required/>
            <label htmlFor="age">Idade:</label>
            <input type="number" name="age" id="age" required/>
            <button type="submit" onSubmit={handleAddPerson} >
                Adicionar pessoa
            </button>
        </Form>
    );
}