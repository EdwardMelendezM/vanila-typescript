import './style.css'
interface Todo {
  id: string
  text: string
}


const listaTodo: Array<Todo> = [
  {
    id: crypto.randomUUID(),
    text: "Cocinar"
  },
  {
    id: crypto.randomUUID(),
    text: "Estudiar"
  }
]
let todoString = ''
const Todos = listaTodo.map(item => (
  todoString = todoString + `<div>${item.text}</div>`
))



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Lista todo</h1>
    <form id="form-input">
      <input id="input-text" placeholder="Dormir"/>
    </form>
    <div id="body-text">
      ${todoString}
    </div>
  </div>
`

const formInput = document.querySelector("#form-input")!

formInput.addEventListener("submit", (e) => {
  e.preventDefault()
  let inputText = document.querySelector<HTMLInputElement>("#input-text")!
  if (inputText.value.trim().length < 2) return

  listaTodo.push(
    {
      id: crypto.randomUUID(),
      text: inputText.value
    }
  )
  updateTodo()
})

function updateTodo() {
  const bodyText = document.querySelector<HTMLDivElement>("#body-text")!
  bodyText.innerHTML = ''
  let todoString = ''
  listaTodo.map(item => (
    todoString = todoString + `<div>${item.text}</div>`
  ))
  bodyText.innerHTML = todoString
}