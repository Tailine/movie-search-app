import styled from 'styled-components';
import * as React from 'react';

export const Header = () => {

    const Title = styled.h1`
            margin-top: 0;
            padding: .7em 0;
            text-align: center;
            color: #ffa000;
            background-color: #10162a;
        `;

    return (
        <Title>Movies</Title>
    )
}
