import { observable, action, computed } from "mobx";
import { getMovies, getDetails, getGenreList } from "../api/index";
import { IMovie, IMovieDetails, IGenre } from "src/api/types";

export class MovieStore {
  @observable public movies: IMovie[] = [];
  @observable public details: IMovieDetails | null = null;
  @observable public isLoadingMovieDetails: boolean = false;
  @observable public genres: { genres: IGenre[] };
  @observable public page: string = "1";
  @observable public userInput: string = "";

  @action
  public getMovies = async (query?: string) => {
    const searchParam = query ? this.updateUserInput(query) : this.userInput;
    this.isLoadingMovieDetails = true;
    this.movies = await getMovies(searchParam, this.page);
    this.isLoadingMovieDetails = false;
  };

  @action
  public updateUserInput = (query: string) => {
    return this.userInput = query;
  }
 
  @action
  public getMovieDetails = async (movieId: string) => {
    this.isLoadingMovieDetails = true;
    this.details = await getDetails(movieId);
    this.isLoadingMovieDetails = false;
  };

  @action
  public getGenreList = async () => {
    this.genres = await getGenreList();
  };

  public changePage = (pg: string) => {
    this.page = pg;
  };

  @computed get currentPage() {
    return this.page;
  }
}
