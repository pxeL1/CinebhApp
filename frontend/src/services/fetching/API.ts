export function getCurrentMoviesRequest() {
  return "/movie/current";
}

export function getUpcomingMoviesRequest() {
  return "/movie/upcoming";
}

export function getVenuesRequest() {
  return "/venue";
}

export function getCititesRequest() {
  return "/city";
}

export function getAllVenuesRequest() {
  return "/venue/all";
}

export function getAllGenresRequest() {
  return "/genre";
}

export function getFilteredMoviesRequest() {
  return "/movie/filter";
}

export function getLoginRequest() {
  return "/auth/login";
}

export function getRegisterRequest() {
  return "/auth/register";
}

export function getLogoutRequest() {
  return "/auth/logout";
}

export function getMovieRequest(id: string) {
  return "/movie/" + id;
}

export function getPersonnelByMovieRequest(movieId: string) {
  return "/personnel/movie/" + movieId;
}
