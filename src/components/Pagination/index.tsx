import * as React from "react";
import styled from "styled-components";
import { pagination } from "../../utils";
import { inject, observer } from "mobx-react";
import { MovieStore } from "src/stores";

interface IProps {
  total: any;
  activePage: number;
  movieStore?: MovieStore;
}

@inject("movieStore")
@observer
export class Pagination extends React.Component<IProps> {
  public render() {
    const PageList = styled.ul`
      display: flex;
      justify-content: center;
      margin: 1em auto;
      width: 15%;
      list-style: none;
    `;

    const PageItem = styled.li<{ active?: boolean }>`
      background-color: ${props => (props.active ? "#10162a" : "white")};
      border-radius: ${props => (props.active ? "50%" : "")};
      border: ${props => (props.active ? "1px solid orange" : "none")};
      padding: 0.3em;
      color: orange;
      display: inline-block;
      margin: 0 auto;
      cursor: pointer;
      font-size: 1.5em;
    `;

    const changePage = async (page: string) => {
      this.props.movieStore!.changePage(page);
      this.props.movieStore!.getMovies();
    };

    const displayPageList = (pages: any[]) => {
      const list = pages.map((page: any, idx) => {
        if (page === activePage) {
          return (
            <PageItem onClick={() => changePage(page)} key={idx} active>
              {page}
            </PageItem>
          );
        }
        return (
          <PageItem onClick={() => changePage(page)} key={idx}>
            {page}
          </PageItem>
        );
      });
      return list;
    };

    const { total, activePage } = this.props;
    const pageList = displayPageList(pagination(total, activePage));

    return <PageList>{pageList}</PageList>;
  }
}
