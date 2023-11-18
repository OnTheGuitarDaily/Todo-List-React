import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { TodoContext } from "../reducer-context/context";
import { useContext, useState, useEffect } from "react";
import Swal from 'sweetalert2'
import '../form/Form.css'
import ButtonComponent from "../button/Button";
import MoreVertIcon from '@mui/icons-material/MoreVert';




export default function FormComponent() {
  const { editTodo, addTodo, deleteTodo, deleteAllTodo, toggleTodo,toggleAllTodo, filteredTodos } = useContext(TodoContext);
  const [validation, setValidation] = useState(false)
  const [editValidation, setEditValidation] = useState(false)
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [visibleToolsId, setVisibleToolsId] = useState(null);
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

  const handleEditTodo = (todoId, todoText) => {
    if (editingTodoId === todoId) {
      setEditingTodoId(null);
    } else {
      setEditingTodoId(todoId);
    }
    editTodo(todoId, todoText);
    
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
  const handleClearAllTodo = () => {
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
        deleteAllTodo();
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
  const handleToggleAllTodo = () => {
    toggleAllTodo();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isInsideToolIcon = event.target.closest('.toolIcon');
      const isInsideToolDiv = event.target.closest('.deleteBtn');
      if (visibleToolsId && !isInsideToolIcon && !isInsideToolDiv) {
        setVisibleToolsId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [visibleToolsId]);


  const handleTools = (todoId) => {
    setVisibleToolsId((prevId) => (prevId === todoId ? null : todoId));
  };

  return (
    <main className="Main col-12 mx-auto">
      <section className="Section col-10 my-5 mx-auto">
      {filteredTodos.length > 0 ? 
      <div className="col-12 d-flex justify-content-between align-items-center">
        <h1 className="mb-5">{filteredTodos.length} Task</h1>
        <div className="d-flex gap-3">
        <ButtonComponent onClick={handleToggleAllTodo} border='1px solid #00A9FF' child='Mark all'/>
        <ButtonComponent onClick={handleClearAllTodo} border='1px solid #00A9FF' child='Clear'/>
        </div>
      </div> : 
      <h1 className="mt-5" style={{textAlign: 'center'}}>There are no task</h1>}
        <ol className="col-12 col-md-10 mx-auto">
            {filteredTodos.map(todo => 
              <li key={todo.id} style = {{ borderBottomRightRadius: editingTodoId === todo.id ? '' : '16px'}} className=" mb-3 p-2">
                {editingTodoId === todo.id ?  
                <form className="col-12" onSubmit={(e) => {
                  e.preventDefault();
                  const todoText = e.target[0].value;
                  if (todoText.trim() !== "") {
                    handleEditTodo(todo.id, e.target[0].value);
                    e.target[0].value = "";
                    setEditValidation(false)
                  } else{
                    setEditValidation(true)
                  }
                }}>
                  <div className="col-12 d-flex justify-content-between">
                    <TextField autoFocus className="col-8"  variant="standard" defaultValue={todo.name} />
                    <ButtonComponent border='1px solid #00A9FF' type ='submit' child='Submit'/>
                  </div>
                  {editValidation && (
                    <p style={{ color: "red", margin: "5px 0", fontSize: "14px" }}>Please fill this field</p>
                  )}
                </form>:
                <div className="d-flex col-12 justify-content-between align-items-center">
                    <h3 style={{ textDecoration: todo.status ? "line-through" : "none", color: todo.status ? "grey" : "black" }}>
                      {todo.name}
                    </h3>
                    <div className="toolIcon">
                      <Checkbox  checked={todo.status} onChange={() => handleToggleTodo(todo.id)} />
                      <IconButton onClick={() => handleTools(todo.id)} aria-label="delete">
                        <MoreVertIcon />
                      </IconButton>
                    </div>
                    {visibleToolsId === todo.id && <div className="toolDiv">
                      <button onClick={handleTools} className="closeBtn">x</button>
                          <IconButton className="deleteBtn" onClick={() => handleDeleteTodo(todo.id)} aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => setEditingTodoId(todo.id)} aria-label="delete">
                          <EditIcon/> 
                        </IconButton>
                    </div> }
                    <div className="displayButton">
                    <Checkbox checked={todo.status} onChange={() => handleToggleTodo(todo.id)} />
                    <IconButton onClick={() => handleDeleteTodo(todo.id)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => setEditingTodoId(todo.id)} aria-label="delete">
                      <EditIcon/> 
                    </IconButton>
                  </div>
                </div>
                }
              </li>
            )}
        </ol>
      </section>
      <form className="Form col-12 p-3 d-flex flex-wrap justify-content-center" onSubmit={handleAddTodo}>
        <TextField className="col-10 col-md-6" id="standard-basic" label="Enter your todos" variant="standard" />
        {validation && (
          <p style={{ color: "red", margin: "5px 0", fontSize: "14px" }}>Please fill this field</p>
        )}
      </form>
    </main>
  );
}
