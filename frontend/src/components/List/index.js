import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import api from '../../services/api'

const Ul = styled.ul`
    list-style: none;
    
    li {
        padding: 15px;
    }
`

export default function List() {
    const [list, setList] = useState([])

    useEffect(() => {
        api.get('list').then(response => {
        setList(response.data)
        })
    },[list])

    return (
        <Ul>
            {list.map(person => <li key={person.name}>Nome: {person.name} <br/> Idade: {person.age} <br/> Classificação: {person.classification}</li>)}
        </Ul>
    );
}