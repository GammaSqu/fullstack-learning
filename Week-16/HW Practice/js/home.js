let list = document.querySelector('[data-component="list"]');

let paginationSelect = document.querySelector(
  '[data-component="pagination:select"]'
);
let paginationPrevious = document.querySelector(
  '[data-component="pagination:previous"]'
);
let paginationNext = document.querySelector(
  '[data-component="pagination:next"]'
);

let loader = document.querySelector('[data-component="loader"]');

let renderPagination = function (pagination) {
  //the purpose of this function is to build ALL the OPTIONS for the select element
  //create a variable to hold our new HTML conent (the pagination BUTTONS)
  let pageContent = '';

  //1st, we loop through the number of page want to put inside the select
  //for the purpose of the excersie, we will use the number in the COUNT data
  //need to account that ITEMS has more OBJECTS, therefore need to be specific on loop
  for (let i = 1; i <= pagination.items.count; i++) {
    //2nd, now we know the number we want to put inside the select (25)
    //we will create a new <option> to put in the select
    //we want a string newNumber to contain a series of OPTION
    //after the loop, newContent will have VALUE ie value='i'
    //<option>1</option><option>2</option>....<option>25</option>
    pageContent = pageContent + `<option value="${i}">${i}</option>`;
  }

  //Now we will put the pageNumber <option> into the HTML
  paginationSelect.innerHTML = pageContent;
};

//this function creates the whole list based on the page number
//it will input new content with the whole div layouts
//it'll also includes the corresponding information for different anime
let renderList = function (data) {
  let allNewItemsContent = '';

  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let newItemContent = `
          <div class="col-6 col-md-3 mb-5 text-center" title="${item.title_english}">
            <a href="details.html?id=${item.mal_id}" class="link-primary d-block position-relative text-decoration-none" data-component="item">
              <span class="position-absolute badge bg-danger top-0 end-0">
                  <i class="bi bi-star-fill"></i> ${item.score}
              </span>
              <span class="d-flex flex-column justify-content-center">
                  <img class="rounded shadow" src="${item.images.jpg.large_image_url}" data-component="image" />
                  <span class="text-dark mt-2" data-component="title">${item.title_english}</span>
              </span>
            </a>
          </div>`;

    allNewItemsContent = allNewItemsContent + newItemContent;
  }

  list.innerHTML = allNewItemsContent;
};

fetch('https://api.jikan.moe/v4/top/anime')
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    let pagination = result.pagination;

    renderPagination(pagination);
    renderList(result.data);
  });

//A function to when we change to a new item (OPTION) inside the pagination select
//This is an introduction to CHANGE function
paginationSelect.addEventListener('change', function () {
  //1st, we nede to get the curent option value from the pagination select
  let selectPage = paginationSelect.value;

  //we want to load the new anime list based ont the option value
  //so when LOADING a new list: it means we "FETCH"

  fetch(`https://api.jikan.moe/v4/top/anime?page=${selectPage}`)
    //when navigating to different pages
    //the end URL would be ?page=${pageNumber}
    //this was demonstrated by typing it as a test to see if the JSON would load
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      //This function would be the same as loading the anime list form the 1st part
      //meaning in general this would act as a GENERAL LIST LOADER
      //so we will need to make the list loaders as a FUNCTION
      //which will be created below
      let data = result.data;
      loadListWithPagination(selectPage);
    });
});
//this function will load the list according to the pagination number
//the information would be gathered from the pagination data
let loadListWithPagination = function (pageNumber) {
  //fetch the data with anime?page=${pageNumber} to set eh page number

  //for the loader
  //it's important to place the classList actions WHEN fetching
  //this usually happens when we change PAGES
  //since it has the class 'd-none' (to hide)
  //we will remove it
  loader.classList.remove('d-none');
  fetch(`https://api.jikan.moe/v4/top/anime?page=${pageNumber}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      let data = result.data;
      //the purpose is to load the list with pagination data
      //so we will include the renderlist function

      renderList(data);
      //when the list is loaded
      //we can then hide the loader by adding back the 'd-none' class back
      loader.classList.add('d-none');
    });
};

//we will create click event function for navigating through pagination
//this is specifically for clicking the NEXT or PREV button

//NEXT Button click event
paginationNext.addEventListener('click', function () {
  //the page numbers are under <option> value
  //we need to first set the current option value
  //create new string using the pagSelect (option) value
  let currentPaginationValue = paginationSelect.value;
  //for the function to work
  //we need to change the string to a number
  currentPaginationValue = Number(currentPaginationValue);
  //if a user presses the next button
  //the option value will increase by 1
  //so the new option value will be +1
  let newPaginationValue = currentPaginationValue + 1;

  //there will be an issue where you will navigate over the page limit
  //in that case, it will display nothing
  //in order to solve it, we need to detect the last option value
  //first select all <option>
  let allOption = paginationSelect.querySelectorAll('option');
  //the <option> index will be default +1
  //so we need to make sure that lastoption is the same as the index
  let lastOption = allOption[allOption.length - 1];
  //go through the same process of paginationvalue
  let lastOptionValue = lastOption.value;

  //convert that to number
  lastOptionValue = Number(lastOptionValue);

  //this is establishing the page limitations of going over
  if (newPaginationValue <= lastOptionValue) {
    //need to set the value of the select to the new value
    paginationSelect.value = newPaginationValue;
    //we can load the list again using the new option value (+1)
    loadListWithPagination(newPaginationValue);
  }
});

//PREV Button click event
//this can created similarly to the NEXT Button click event
//just with different limiatations
//to make sure the prev butons doesnt go below 1
paginationPrevious.addEventListener('click', function () {
  let currentPaginationValue = paginationSelect.value;
  currentPaginationValue = Number(currentPaginationValue);
  let newPaginationValue = currentPaginationValue - 1;

  //for some reason the previous button has a bug
  //since this doesn't need a lastoption value
  //maybe I'll grab first value...even though it can be easily done with just 1
  //but this is just testing

  //this is to set the limiations
  if (newPaginationValue >= 1) {
    //ERROR DETECTED!!!!
    //I placed "paginationPrevioous.value"
    //instead of "paginationSelect.value"
    //it didnt work because you want the number from PAGINATIONSELECT to be displayed
    //which will therefore also display the correct anime list
    //When having paginationprevious.value
    //It will display the currentvalue -1 list
    //However, the paginationSelect displayed the same currentvalue
    paginationSelect.value = newPaginationValue;
    loadListWithPagination(newPaginationValue);
  }
});
