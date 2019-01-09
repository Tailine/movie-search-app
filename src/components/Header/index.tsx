import styled from 'styled-components';
import * as React from 'react';

export const Header: React.SFC = (props) => {

    const Title = styled.h1`
            background: lightblue;
            margin-top: 0;
            padding: .7em 0;
            text-align: center;
            color: white;
            background-image: linear-gradient(to right, #3f5efb, #4510a1);
        `;

    return (
        <Title>Movies</Title>
    )
}
