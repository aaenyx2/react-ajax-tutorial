import React from 'react';
import styled from 'styled-components';
const _PostWrapper = styled.div`
    width: 50rem;
    margin: 0 auto;

    @media (max-width: 768px){
        width: 90%;  
    }
    `;

    const PostWrapper = ({children}) => (
        <_PostWrapper>
            {children}
        </_PostWrapper>
    )
    
    export default PostWrapper;