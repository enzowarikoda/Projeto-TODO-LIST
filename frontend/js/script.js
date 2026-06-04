const tbody = document.querySelector('tbody');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/todos');
    const todos = await response.json();
    return todos;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if(innerText) {
        element.innerText = innerText;
    }
    
    if(innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}

const createRow = (task) => {
    const { id, title, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdStatus = createElement('td', '', `<input type="checkbox" ${status ? 'checked' : ''}>`);
    const tdActions = createElement('td');

    const editBtn = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteBtn = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
    editBtn.classList.add('actions-button');
    deleteBtn.classList.add('actions-button');

    tdActions.appendChild(editBtn);
    tdActions.appendChild(deleteBtn);
    
    tr.appendChild(tdTitle);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
}

const loadTodos = async () => {
    const todos = await fetchTasks();

    todos.forEach(todo => {
        createRow(todo);
    })
}

loadTodos();