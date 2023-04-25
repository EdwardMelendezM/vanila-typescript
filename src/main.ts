import './style.css';

interface Todo {
  id: string;
  text: string;
}

const listaTodo: Todo[] = [
  {
    id: crypto.randomUUID(),
    text: 'Cocinar',
  },
  {
    id: crypto.randomUUID(),
    text: 'Estudiar',
  },
];

const appDiv = document.querySelector<HTMLDivElement>('#app')!;

function addTodo(e: Event,edit=false,id='') {
  e.preventDefault();
  if (inputText.value.trim().length < 2) return;

  if(edit && id){
    deleteTodoById(id)
  }

  listaTodo.push({
    id: crypto.randomUUID(),
    text: inputText.value,
  });

  inputText.value = '';
  updateTodoList();
}

function deleteTodoById(id: string) {
  listaTodo.splice(
    listaTodo.findIndex(todo => todo.id === id),
    1,
  );
}
function editTodoById(e:Event,id: string) {
  const todoElem = listaTodo.find(todo => todo.id === id)!
  inputText.focus()
  inputText.value=todoElem?.text
  formInput.addEventListener('submit', e =>addTodo(e,true,id));
  
}


function updateTodoList() {
  if(!bodyText){
    console.log("No hay nada");
    console.log(bodyText);
    
    return
  }
  bodyText.innerHTML = listaTodo
    .map(
      todo => `
      <div>${todo.text}</div>
      <button id="edit-button" data-id=${todo.id}>Edit</button>
      <button id="delete-button" data-id=${todo.id}>Delete</button>
    `,
    )
    .join('');

  const deleteButtons = document.querySelectorAll<HTMLButtonElement>(
    '#delete-button',
  );
  const editButtons = document.querySelectorAll<HTMLButtonElement>('#edit-button')!

  editButtons.forEach(button=>{
    const id = button.getAttribute('data-id')!;
    button.addEventListener('click',(e)=>{
      editTodoById(e,id)
      updateTodoList();
    })
  })

  deleteButtons.forEach(button => {
    const id = button.getAttribute('data-id')!;
    button.addEventListener('click', () => {
      deleteTodoById(id);
      updateTodoList();
    });
  });
}

appDiv.innerHTML = `
  <div>
    <h1>Lista todo</h1>
    <form id="form-input">
      <input id="input-text" placeholder="Dormir"/>
    </form>
    <div id="body-text"></div>
  </div>
`;


const formInput = document.querySelector<HTMLFormElement>('#form-input')!;
const inputText = document.querySelector<HTMLInputElement>('#input-text')!;
const bodyText = document.querySelector<HTMLDivElement>('#body-text')!;


updateTodoList();
formInput.addEventListener('submit', addTodo);