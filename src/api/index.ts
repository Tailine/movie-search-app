import axios from "axios";
import { IMovie, IPayloadGetMany, IMovieDetails } from "./types";

const API_KEY = "aeca12c4c31a9c2908e1b9dd78a645f5";

const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&`;
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`;
// const DETAILS_URL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-pt-BR`;

export const getMovies = async (query: string) => {
  try {
    const res = await axios.get<IPayloadGetMany<IMovie>>(
      `${BASE_URL}query=${query}&language=pt-BR`
    );
    return res.data.results;
  } catch (err) {
    throw new Error("Não foi possível pegar lista de filmes");
  }
};

export const getGenreList = async () => {
  try {
    const resp = await axios.get(`${GENRE_URL}`);
    return resp.data;
  } catch (err) {
    throw new Error("Não foi possível pegar lista de gêneros");
  }
};

export const getDetails = async (id: string) => {
  try {
    const res = await axios.get<IMovieDetails>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    );
    const details = res.data;
    return details;
  } catch (err) {
    throw new Error("Não foi possível pegar detalhes do filme.");
  }
};
