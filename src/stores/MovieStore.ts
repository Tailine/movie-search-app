import { observable, action, computed } from "mobx";
import { getMovies, getDetails, getGenreList } from "../api/index";
import { IMovie, IMovieDetails, IGenre } from "src/api/types";

export class MovieStore {
  @observable public movies: IMovie[] = [];
  @observable public details: IMovieDetails | null = null;
  @observable public isLoadingMovieDetails: boolean = false;
  @observable public genres: { genres: IGenre[] };
  @observable public page: string = "1";

  @action
  public getMovies = async (value: string, page: string) => {
    this.isLoadingMovieDetails = true;
    this.movies = await getMovies(value, page);
    this.isLoadingMovieDetails = false;
  };

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
