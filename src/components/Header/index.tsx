import styled from 'styled-components';
import * as React from 'react';

export const Header = () => {

    const Title = styled.h1`
            margin-top: 0;
            padding: .7em 0;
            text-align: center;
            color: white;
            background-image: linear-gradient(to right, #0F2027, #203A43, #2C5364);
        `;

    return (
        <Title>Movies</Title>
    )
}
