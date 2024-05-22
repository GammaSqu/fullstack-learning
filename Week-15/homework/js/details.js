let content = document.querySelector('[data-component="content"]');

let searchParams = new URLSearchParams(window.location.search);
let animeID = searchParams.get('id');

let animeURL = `https://api.jikan.moe/v4/anime/${animeID}`;

fetch(animeURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    let data = result.data;

    let allGenres = '';
    for (let i = 0; i < data.genres.length; i++) {
      let currentGenre = data.genres[i];
      let genreName = currentGenre.name;

      if (i === 0) {
        allGenres = genreName;
      } else {
        allGenres = allGenres + ` - ${genreName}`;
      }
    }

    let producers = '';
    for (let i = 0; i < data.producers.length; i++) {
      let currentProducer = data.producers[i];
      let producerName = currentProducer.name;

      if (i === 0) {
        producers = producerName;
      } else {
        producers = producers + ` - ${producerName}`;
      }
    }

    let titles = '';
    for (let i = 0; i < data.titles.length; i++) {
      let currentTitle = data.titles[i];
      let titleName = currentTitle.title;

      if (i === 0) {
        titles = titleName;
      } else {
        titles = titles + ` - ${titleName}`;
      }
    }

    let newContent = `<div class="col col-md-4">
      <img class="rounded shadow" src="${data.images.jpg.large_image_url}" />
  </div>
  <div class="col col-md-8">
      <div class="display-5 mb-2">${data.title_english}</div>
      <div class="mb-3">
          <strong class="me-3">Alternative</strong>
          <span>${titles}</span>
      </div>
      <div class="mb-3">
          <strong class="me-3">Producers</strong>
          <span>${producers}</span>
      </div>
      <div class="mb-3">
          <strong class="me-3">Status</strong>
          <span>${data.status}</span>
      </div>
      <div class="mb-3">
          <strong class="me-3">Genres</strong>
          <span>${allGenres}</span>
      </div>
      <div class="mb-3">
          <strong class="me-3">Rating</strong>
          <span>${data.rating}</span>
      </div>
      <div class="mb-3">
          <strong class="me-3">Rank</strong>
          <span class="badge bg-danger me-1">
              #${data.rank}
          </span>
          <span>(Score: ${data.score})</span>
      </div>
      <div>${data.synopsis}</div>
  </div>`;

    content.innerHTML = newContent;
  });
