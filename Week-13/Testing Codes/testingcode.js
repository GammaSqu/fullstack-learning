let newTodoInput = document.querySelector('[data-component="new-todo-input"]');
let addTodoButton = document.querySelector('[data-component="add-todo"]');
let todoItemsContainer = document.querySelector(
  '[data-component="todo-list-items"]'
);
let onAddTodoButtonClick = function () {
  let todoContent = newTodoInput.value;
  let newTodoItem = document.createElement('DIV');

  newTodoItem.classList.add('list-group-item');
  newTodoItem.setAttribute('data-component', 'todo-item');

  // Attach children to the current todo item
  newTodoItem.innerHTML = `
    <div class="input-group">
        <input type="text" class="form-control border-0 ps-0" placeholder="New task content" data-component="input" readonly />
        <button class="btn btn-danger" type="button" data-component="remove">X</button>
        <button class="btn btn-primary" type="button" data-component="edit">Edit</button>
        <button class="btn btn-success d-none" type="button" data-component="confirmEdit">Confirm</button>
    </div>
    `;

  // Start selecting its children and attach the right "click" event to each element
  let todoInput = newTodoItem.querySelector('[data-component="input"]');

  todoInput.value = todoContent;

  let removeButton = newTodoItem.querySelector('[data-component="remove"]');

  removeButton.addEventListener('click', onRemoveButtonClick);

  let editButton = newTodoItem.querySelector('[data-component="edit"]');

  editButton.addEventListener('click', onEditTodoClick);

  let confirmEditButton = newTodoItem.querySelector(
    '[data-component="confirmEdit"]'
  );

  confirmEditButton.addEventListener('click', onConfirmEditClick);

  // The todo item is ready, let's add it to the current todoItemsContainer
  todoItemsContainer.append(newTodoItem);

  // Clean up new todo input
  newTodoInput.value = '';
};
let onRemoveButtonClick = function (event) {
  let currentButton = event.target;
  let todoItem = currentButton.closest('[data-component="todo-item"]');

  todoItem.remove();
};
let onEditTodoClick = function (event) {
  let currentButton = event.target;
  let todoItem = currentButton.closest('[data-component="todo-item"]');
  let confirmEditButton = todoItem.querySelector(
    '[data-component="confirmEdit"]'
  );
  let todoInput = todoItem.querySelector('[data-component="input"]');

  todoInput.classList.remove('border-0');
  todoInput.classList.remove('ps-0');
  todoInput.readOnly = false;
  todoInput.focus();

  currentButton.classList.add('d-none');
  confirmEditButton.classList.remove('d-none');
};
let onConfirmEditClick = function (event) {
  let currentButton = event.target;
  let todoItem = currentButton.closest('[data-component="todo-item"]');
  let editTodoButton = todoItem.querySelector('[data-component="edit"]');
  let todoInput = todoItem.querySelector('[data-component="input"]');

  todoInput.classList.add('border-0');
  todoInput.classList.add('ps-0');
  todoInput.readOnly = true;

  currentButton.classList.add('d-none');
  editTodoButton.classList.remove('d-none');
};

addTodoButton.addEventListener('click', onAddTodoButtonClick);
