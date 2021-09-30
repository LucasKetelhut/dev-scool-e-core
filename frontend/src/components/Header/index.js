import styled from 'styled-components'
import Link from 'next/link'
import React from 'react'

const Navbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 60px;
    background-color: #f4f4f4;
    box-shadow: 2px 2px 5px black;
`

const Li = styled.div`
    align-self: center;
    font-size: 20px;

    transition: all .2s ease-in-out;

    a {
        text-decoration: none;
        color: black;
    }

    &:hover {
        -webkit-transform: scale(1.03);
        -ms-transform: scale(1.03);
        transform: scale(1.03);
    }
`

export default function Header() {
    return (
        <Navbar>
                <Li>
                    <Link href="/">Lista</Link>
                </Li>
                <Li>
                    <Link href="orderedbyname">Ordem Alfabética</Link>
                </Li>
                <Li>
                    <Link href="orderedbyage">Ordem Idade</Link>
                </Li>
                <Li>
                    <Link href="newperson">Adicionar Pessoa</Link>
                </Li>
        </Navbar>
    )
}