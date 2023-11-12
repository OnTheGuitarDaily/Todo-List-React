import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { TodoContext } from "../reducer-context/context";
import { useContext, useState, useEffect } from "react";
import Swal from 'sweetalert2'
import '../form/Form.css'

export default function FormComponent() {
  const { state, addTodo, deleteTodo, toggleTodo, filteredTodos } = useContext(TodoContext);
  const [validation, setValidation] = useState(false)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state]);
  


  const handleAddTodo = (e) => {
    e.preventDefault();
    const todoText = e.target[0].value;
    if (todoText.trim() !== "") {
      addTodo(todoText);
      e.target[0].value = "";
      setValidation(false)
    } else{
      setValidation(true)
    }
  };

  const handleDeleteTodo = (todoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(todoId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  };

  const handleToggleTodo = (todoId) => {
    toggleTodo(todoId);
  };

  return (
    <main className="Main col-8 mx-auto">
      <section className="Section col-10 my-5 mx-auto">
        <h2 className="mb-5">{filteredTodos.length > 0 ? filteredTodos.length + 'Tasks' : <h2 className="mt-5" style={{textAlign: 'center'}}>There are no task</h2>} </h2>
        <ol>
            {filteredTodos.map(todo => 
              <li key={todo.id} className="d-flex col-10 justify-content-between mx-auto my-4">
                    <h3 style={{ textDecoration: todo.status ? "line-through" : "none", color: todo.status ? "grey" : "black" }}>
                      {todo.name}
                    </h3>
                    <div>
                      <Checkbox checked={todo.status} onChange={() => handleToggleTodo(todo.id)} />
                      <IconButton onClick={() => handleDeleteTodo(todo.id)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </div>
              </li>
            )}
        </ol>
      </section>
      <form className="Form col-12 p-3 mx-auto" onSubmit={handleAddTodo}>
        <TextField className="col-12" id="standard-basic" label="Enter your todos" variant="standard" />
        {validation && (
          <p style={{ color: "red", margin: "5px 0", fontSize: "14px" }}>Please fill this field</p>
        )}
      </form>
    </main>
  );
}
