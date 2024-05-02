let itemContent = `<div> class="list-group-item d-flex" data-component ="list-item">
    <input class="form-control border-0" data-component="input" readonly />
    <button class="btn btn-danger" data-component="delete">x</button>
  <button class="btn btn-primary">Tick</button>
  <button class="btn btn-primary d-none" data-component="confirm">Edit</button>
</div>`;

let input = document.querySelector(`[data-component = "input"]`);
let list = document.querySelector(`[data-component="list"]`);
let addButton = document.querySelector(`[data-component = "add"]`);
let onDelteButtonClick = function (event) {
  let currentDeleteButton = event.target;
  let listItemParent = currentDeleteButton.closest(
    `[data-component ="list-item"]`
  );
  listItemParent.remove();
};
let onEditButtonCllick = function () {
  let currentEditButton = event.target;
  let listItemParent = currentEditButton.cloest(`[data-component="list-item"]`);

  let itemInput = listItemParent.querySelector(`[data-component="input"]`);

  itemInput.readonly = false;
};
let onAddButtonClick = function () {
  let newTodoContent = input.value;
  list.innerHTML = list.innerHTML + itemContent;

  let allTodoItems = list.querySelectorAll(`[data-component="list-item"]`);
  let lastIndex = allTodoItems.length - 1;
  let latestTodoItem = allTodoItems[lastIndex];
  let latestTodoInput = latestTodoItem.querySelector(
    `[data-component="input"]`
  );
  latestTodoInput.value = newTodoContent;

  let deleteButton = latestTodoItem.querySelector(`[data-component="delete"]`);

  deleteButton.addEventListener('click', onDelteButtonClick);

  let editButton = latestTodoItem.querySelector(`[data-component="edit"]`);
  editButton.addEventListener('click', onEditButtonCllick);

  let confirmButton = latestTodoItem.querySelector(
    `[data-component="confirm"]`
  );
};

addButton.addEventListener('click', onAddButtonClick);
