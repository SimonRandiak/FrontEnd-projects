const addTodo = document.querySelector("#addBtn")
const todoText = document.querySelector("#userInp")
const main = document.querySelector("main")
let todos = []

addTodo.addEventListener("click", () => {
    let val = todoText.value;
    if (val.length != 0) {
        main.appendChild(create_new_todo(val));
    }
    todoText.value = "";
})

function create_new_todo(name)
{
    let cardNote = document.createElement("div");
    let text = document.createElement("h4");
    let deleteButton = document.createElement("button");

    text.innerHTML = name 

    cardNote.classList.add("todoCardDiv");
    deleteButton.classList.add("deleteTodoBtn");
    deleteButton.innerHTML = "Delete";

    cardNote.appendChild(text);
    cardNote.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => (
        main.removeChild(cardNote)
    ))
    return cardNote;
}