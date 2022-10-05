// 1. so what do you think is the first thing we do?: 
window.addEventListener('load', () => {
    // now we add a GLOBAL variable that will get stored to-dos from out localStorage
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    // it is global because we didnt use any reserved words to declare todos like let const var. 
    // 2. Next, we want the user to capture his name in "What's up, Name here". How to capture it?
    const nameInput = document.querySelector('#name');
    // the input id was "name" so we use it to capture it and save it in a variable. 
    const newTodoForm = document.querySelector('#new-todo-form'); 
    
    const username = localStorage.getItem('username') || '';
    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value );
    });

    newTodoForm.addEventListener('submit', e =>{
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value, 
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        // we add this new todo to our array using push:
    todos.push(todo);
    // remember todos was our global variable [].

     //we now save our array by turning it into a json string so we can save it in localStorage
     localStorage.setItem('todos', JSON.stringify(todos));
     // so we use SET item with the new array. 
 
    // what is next? We want to reset the form (where user writes the to-do item and category) how? 
    e.target.reset();

    displayTodos();
    })
})

    function displayTodos() {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('button');
    const deletebtn = document.createElement('button');

    input.type= 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble');

    if(todo.category == 'personal'){
        span.classList.add('personal');
    } else {
        span.classList.add('business');
    }

    content.classList.add('todo-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deletebtn.classList.add('delete');

    content.innerHTML = `<input type="text" value="${todo.content}" readonly >`;
    edit.innerHTML = 'Edit';
    deletebtn.innerHTML = 'Delete';

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deletebtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
        todoItem.classList.add('done');
    }



    input.addEventListener('click', e => {
        todo.done = e.target.checked;
        localStorage.setItem('todos', JSON.stringify(todos));

        if (todo.done) {
            todoItem.classList.add('done');
        }else {
            todoItem.classList.remove('done');
        }

        displayTodos();
    })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodos();
                })
        })

        deletebtn.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        })

    });

}

// finished project to upload 

    

   
   


