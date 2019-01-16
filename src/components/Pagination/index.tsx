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

    const PageItem = styled.li`
      color: orange;
      display: inline-block;
      margin: 0 auto;
      cursor: pointer;
      font-size: 1.5em;
    `;

    const changePage = async (page: string) => {
      this.props.movieStore!.changePage(page);
      await this.props.movieStore!.getMovies();
      console.log(this.props.movieStore!.page);
    };

    const displayPageList = (pages: any[]) => {
      const list = pages.map((page: any, idx) => {
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
