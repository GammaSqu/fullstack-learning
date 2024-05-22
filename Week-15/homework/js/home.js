let listGroup = document.querySelector('[data-component="list"]');

let pagnationSelect = document.querySelector(
  '[data-component="pagination:select"]'
);
let paginationPrevious = document.querySelector(
  '[data-component="pagination:previous"]'
);
let pagnationSelectNext = document.querySelector(
  '[data-component="pagination:next"]'
);

let renderPagination = function (result) {};

fetch('https://api.jikan.moe/v4/top/anime')
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    let data = result.data;

    let animeContent = '';
    for (let i = 0; i < data.length; i++) {
      let anime = data[i];

      animeContent =
        animeContent +
        `<div class="col-6 col-md-3 mb-5 text-center" title="${anime.title_english}">
         <a href="details.html?id=${anime.mal_id}" class="link-primary d-block position-relative text-decoration-none" data-component="item">
           <span class="position-absolute badge bg-danger top-0 end-0">
               <i class="bi bi-star-fill"></i> ${anime.score}
           </span>
           <span class="d-flex flex-column justify-content-center">
               <img class="rounded shadow" src="${anime.images.jpg.large_image_url}" data-component="image" />
               <span class="text-dark mt-2" data-component="title">${anime.title_english}</span>
           </span>
         </a>
       </div>`;
    }

    listGroup.innerHTML = animeContent;
  });

fetch('https://api.jikan.moe/v4/top/anime')
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    renderPagination(result);
  });
