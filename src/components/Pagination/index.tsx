import * as React from 'react';
import styled from 'styled-components';
import { pagination } from '../../utils';

interface IProps {
    total: any;
    activePage: number;
}

const PageList = styled.ul`
    display: flex;
    justify-content: center;
    width: 15%;
    list-style: none;
`;

const PageItem = styled.li`
    color: orange;
    display: inline-block;
    margin: 0 auto;
    cursor: pointer;
`;

const displayPageList = (pages: any) => {
    const list = pages.map((page: any) => {
        return <PageItem key={"p" + page}>{page}</PageItem>
    });
    return list;
}

export const Pagination = (props: IProps) => {
    const { total, activePage } = props;
    const pages = displayPageList(pagination(total, activePage));

    return (
        <PageList>
            {pages}
        </PageList>
    )
}