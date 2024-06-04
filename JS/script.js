const row = document.querySelector('#card-movie');

function showDetail() {
  console.log(this.getAttribute('data-imdbID'));
}

function domManipulation(title, years, posterURL, id) {
  const cardHTML = `<section
  class="card"
  style="width: 18rem"
>
  <img
    src="${posterURL}"
    class="card-img-top"
    alt="Movies List"
  />
  <section class="card-body">
    <h5 class="card-title">${title}</h5>
    <h6 class="text-muted">${years}</h6>
    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dignissimos dolor voluptates harum quos obcaecati?
    </p>
    <a
      href="#"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#modalMovies"
      data-imdbID = "${id}"
      id="showDetail"
      >Show Details</a
    >
  </section>
</section>`;

  // Elemen kosong
  let col = document.createElement('section');
  col.classList.add('col', 'mb-4');
  col.innerHTML = cardHTML.trim();

  row.appendChild(col);
}

function showMovies(movies) {
  movies.forEach((element) => {
    domManipulation(element.Title, element.Year, element.Poster, element.imdbID);
    // console.log(element.imdbID);
  });
}

$.ajax({
  url: 'http://www.omdbapi.com/?s=avengers&apikey=20c4741c',
  success: (result) => {
    const moviesList = result.Search;
    showMovies(moviesList);
    $('#showDetail').on('click', showDetail);
  },
  error: (e) => {
    console.log(e.responseText);
  },
});
