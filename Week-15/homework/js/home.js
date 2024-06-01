let listGroup = document.querySelector('[data-component="list"]');

let pagnationSelect = document.querySelector(
  '[data-component="pagination:select"]'
);
let paginationPrevious = document.querySelector(
  '[data-component="pagination:previous"]'
);
let pagnationNext = document.querySelector(
  '[data-component="pagination:next"]'
);

let renderPagination = function (pagination) {
  //the purpose of this function is to build all the options for the select element
  //create a variable to hold our new HTML content

  let pageContent = '';
  //1st, we loop through the number of page we want to put inside the select
  for (let i = 1; i <= pagination.items.count; i++) {
    //2nd, now we know the number we want to put inside the select
    //we will create a new <option> to put in the select

    //we want a string newNumber to contain a series of option
    //after the loop, newContent will have value
    //<option>1</option><option>2<otion>.... 25
    pageContent = pageContent + `<option value="${i}">${i}</option>`;
  }
  //Now that the pageNumbers should have all the options HTML we want,
  //we will put that into the select

  //set select with option1,
  //set select with option1, option2
  pagnationSelect.innerHTML = pageContent;
};

let renderList = function (data) {
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
};

fetch('https://api.jikan.moe/v4/top/anime')
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    let pagination = result.pagination;

    renderList(result.data);
    renderPagination(pagination);
  });

//When we change to a new item inside the pagination select
pagnationSelect.addEventListener('change', function () {
  //get the current  option value from the pagination select
  let selectPage = pagnationSelect.value;

  //we want to load the new list of anime based on the selectPage above
  //so load the new list: it measns we "fetch" data of that page
  fetch(`https://api.jikan.moe/v4/top/anime?page=${selectPage}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      let data = result.data;

      loadListWithPagination(selectPage);
    });
});

let loadListWithPagination = function (pageNumber) {
  fetch(`https://api.jikan.moe/v4/top/anime?page=${pageNumber}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      let data = result.data;

      renderList(data);
    });
};

//When next button is clicked
pagnationNext.addEventListener('click', function () {
  //current option value
  let currentPaginationValue = pagnationSelect.value;
  //change currentPaginationValue to a number
  currentPaginationValue = Number(currentPaginationValue);
  //will change to +1
  let newPaginationValue = currentPaginationValue + 1;

  //get out the last option in the pagination
  let allOption = pagnationSelect.querySelectorAll('option');
  let lastOption = allOption[allOption.length - 1];
  let lastOptionValue = lastOption.value;

  //conver to number
  lastOptionValue = Number(lastOptionValue);

  if (newPaginationValue <= lastOptionValue) {
    //we ned to set the value of the select to the new value
    pagnationSelect.value = newPaginationValue;

    //load the list again using the new option value (after +1)
    loadListWithPagination(newPaginationValue);
  }
});

paginationPrevious.addEventListener('click', function () {
  let currentPaginationValue = pagnationSelect.value;
  currentPaginationValue = Number(currentPaginationValue);
  let newPaginationValue = currentPaginationValue - 1;

  if (newPaginationValue >= 1) {
    paginationPrevious.value = newPaginationValue;
    loadListWithPagination(newPaginationValue);
  }
});
