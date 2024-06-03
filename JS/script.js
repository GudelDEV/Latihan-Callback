$.ajax({
  url: 'http://www.omdbapi.com/?s=avengers&apikey=20c4741c',
  success: (result) => {
    const moviesList = result.Search;
    console.log(moviesList);
    moviesList.forEach((element) => {
      console.log(element);
    });
  },
  error: (e) => {
    console.log(e.responseText);
  },
});
