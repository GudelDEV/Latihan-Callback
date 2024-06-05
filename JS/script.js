$('#buttonSearch').on('click', function () {
  $.ajax({
    url: `http://www.omdbapi.com/?s=${$(`#input-keyword`).val()}&apikey=20c4741c`,
    success: (result) => {
      const moviesList = result.Search;
      showMovies(moviesList);

      // Ketika button showDetail di click
      $('.showDetail').on('click', showDetail);
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

const row = document.querySelector('#card-movie');
const popUp = document.querySelector('#contentPopup');

function popUpBox(element, parrent) {
  const cardHtml = `<section class="container-fluid">
  <section class="row">
    <section class="col-md-3">
      <img
        src="${element.Poster}"
        alt="${element.Poster}"
      />
    </section>
    <section class="col-md ms-5">
      <ul class="list-group">
        <li class="list-group-item"><h4>${element.Title}</h4></li>
        <li class="list-group-item"><strong>Rating : </strong>${element.imdbRating}</li>
        <li class="list-group-item"><strong>Tahun : </strong>${element.Year}</li>
        <li class="list-group-item"><strong>Director : </strong>${element.Director}</li>
        <li class="list-group-item"><strong>Actor : </strong>${element.Actors}</li>
        <li class="list-group-item"><strong>Writer : </strong>${element.Writer}</li>
        <li class="list-group-item">
          <strong>Plot : </strong> <br />
          ${element.Plot}
        </li>
      </ul>
    </section>
  </section>
</section>`;

  return (parrent.innerHTML = cardHtml);
}

function showDetail(e) {
  e.preventDefault();
  $.ajax({
    url: `http://www.omdbapi.com/?i=${this.getAttribute('data-imdbID')}&apikey=20c4741c`,

    success: (result) => {
      popUpBox(result, popUp);
    },

    error: (error) => {
      console.log(error.responseText);
    },
  });
}

function domManipulation(title, years, posterURL, idmdb) {
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
      class="btn btn-primary showDetail"
      data-bs-toggle="modal"
      data-bs-target="#modalMovies"
      data-imdbID = "${idmdb}"
      >Show Details</a
    >
  </section>
</section>`;

  // Elemen kosong
  let col = document.createElement('section');
  col.classList.add('col', 'mb-4');
  col.innerHTML = cardHTML.trim();

  return row.appendChild(col);
}

function showMovies(movies) {
  return movies.forEach((element) => {
    domManipulation(element.Title, element.Year, element.Poster, element.imdbID);
    // console.log(element.imdbID);
  });
}
