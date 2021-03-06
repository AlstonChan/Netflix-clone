import axios from "axios";

// function that run on both server and client side
// to connect to the server to fetch movie data
export default async function fetchMoviesDB(
  requestedData,
  endpoint,
  myListData = null,
  searchQuery = null
) {
  if (!requestedData) return;
  if (myListData === null && searchQuery === null) {
    const result = await axios.post(endpoint, {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
    });
    return result.data.movies;
  } else if (myListData === null && searchQuery !== null) {
    const result = await axios.post(endpoint, {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
      additionData: searchQuery,
    });
    return result.data.movies;
  } else if (myListData !== null && searchQuery === null) {
    const result = await axios.post(endpoint, {
      requiredKey: "CabtUaWSst3xez8FjgSbGyqmy",
      requestedData: requestedData,
      additionData: myListData,
    });
    return result.data.movies;
  }
}
