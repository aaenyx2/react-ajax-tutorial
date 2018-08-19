import React from 'react';
// import './Header.css';
import styled from 'styled-components';
const _Header = styled.div`
    background-color: #00B5AD;
    color: white;
    font-size: 2rem;
    padding: 1.2rem;
    text-align: center;
    font-weight: 600;
    margin-bottom: 2rem;
    `

    const Header = () => (
        <_Header>
            POSTS
        </_Header>
    )
    
    export default Header;