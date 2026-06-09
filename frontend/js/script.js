const tbody = document.querySelector('tbody');
const formTodo = document.querySelector('.form-todo');
const inputTodo = document.querySelector('.input-todo');
const dialog = document.querySelector('#dialogTodo');
const openDialogBtn = document.querySelector('#abrirDialog');
const closeDialogBtn = document.querySelector('#fecharDialog');
const dialogTitle = document.querySelector('#dialogTitle');
const searchTodo = document.querySelector('.search-todo');
const dialogDelete =document.querySelector('#dialogDelete');
const cancelDelete =document.querySelector('#cancelDelete');
const confirmDelete = document.querySelector('#confirmDelete');

let editingTodoId = null;
let editingTodoStatus = false;
let todosCache = []
let todoToDelete = null;

const fetchTodos = async () => {
    const response = await fetch(
        'http://localhost:3000/todos'
    );

    return await response.json();
};

const createElement = (tag, innerText='', innerHTML='') => {
    const element = document.createElement(tag);

    if(innerText){
        element.innerText= innerText;
    }

    if(innerHTML){
        element.innerHTML= innerHTML;
    }

    return element;
};

const createRow = (todo) => {
    const { id, title, status } = todo;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdStatus = createElement('td', '', `<input type="checkbox" ${status ? 'checked' : ''}>`);
    const tdActions = createElement('td');
    const editBtn = createElement('button', '', `<span class=" material-symbols-outlined">edit</span>`);
    const deleteBtn = createElement( 'button', '', `<span class=" material-symbols-outlined">delete</span>`);

    editBtn.classList.add('actions-button');

    deleteBtn.classList.add('actions-button');

    const checkbox = tdStatus.querySelector('input');
    checkbox.addEventListener('change',({ target }) => { toggleStatus( id, title, target.checked ); });

    editBtn.addEventListener('click',() => { editTodo(id, title, status); });
    deleteBtn.addEventListener('click', () => { 
        todoToDelete = id;
        dialogDelete.showModal();
    });

    tdActions.append( editBtn, deleteBtn);

    tr.append(tdTitle, tdStatus, tdActions);

    tbody.appendChild(tr);

};

const renderTodos = (todos) => {
    tbody.innerHTML = '';

    todos.forEach(todo => {
        createRow(todo);
    });
}

const loadTodos = async () => {
    todosCache = await fetchTodos();

    renderTodos(todosCache);
};

const createTodo = async (event) => {
    event.preventDefault();

    const title = inputTodo.value.trim();

    if(title==='') {
        return;
    }

    if(editingTodoId) {
        await fetch(`http://localhost:3000/todos/${editingTodoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, status: editingTodoStatus })
        });
    } else {
        await fetch('http://localhost:3000/todos', {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title,
                status:false
            })
        });
    }

    dialog.close();

    inputTodo.value='';

    editingTodoId=null;
    editingTodoStatus = false;

    await loadTodos();
};

const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
        method:'DELETE'
    });

    loadTodos();
};

const toggleStatus = async (id, title, status) => {
      console.log({
        title,
        status
    });
    await fetch(`http://localhost:3000/todos/${id}`, {
        method:'PUT',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
            title,
            status
        })
    });

    await loadTodos();
};

const editTodo = (id, title, status) => {
    editingTodoId = id;

    editingTodoStatus = status;

    dialogTitle.innerText='Editar Tarefa';

    inputTodo.value=title;

    dialog.showModal();
};

openDialogBtn.addEventListener('click', () => {
    editingTodoId=null;

    dialogTitle.innerText= 'Criar Tarefa';

    inputTodo.value='';

    dialog.showModal();
});

closeDialogBtn.addEventListener('click', () => { dialog.close(); });

searchTodo.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase();

    const filteredTodos = todosCache.filter(todo =>
        todo.title.toLowerCase().includes(value)
    );

    renderTodos(filteredTodos);
});

cancelDelete.addEventListener('click', () => {
    todoToDelete = null;

    dialogDelete.close();
});

confirmDelete.addEventListener('click', async () => {
    if (!todoToDelete) {
        return;
    }

    await deleteTodo(
        todoToDelete
    );

    todoToDelete = null;

    dialogDelete.close();
});

formTodo.addEventListener('submit', createTodo);

loadTodos();