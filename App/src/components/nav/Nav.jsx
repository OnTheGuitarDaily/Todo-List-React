import React, { useContext } from 'react';
import { TodoContext } from '../reducer-context/context';
import ButtonComponent from "../button/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import Swal from 'sweetalert2'

export default function NavBar() {
  const { state, setFilter, clearTodo } = useContext(TodoContext);

const handleFilter= (filter) =>{
  if(state.todos.length === 0 ){
    setFilter('all')
  }else{
    setFilter(filter)
  }
  
}

const handleClearTodo = () => {
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
      clearTodo()
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}

  return (
    <nav className="d-flex justify-content-between align-items-center p-3 NavBar">
      <h1>Todos</h1>
      <div className="d-flex justify-content-between col-6">
        <ButtonComponent onClick={() => handleFilter('all')}  child="All Todos" color="white" />
        <ButtonComponent onClick={() => handleFilter('active')} child="Active" color="white" />
        <ButtonComponent onClick={() => handleFilter('completed')} child="Completed" color="white" />
        <ButtonComponent onClick={handleClearTodo} child="Clear Completed" color="white" />
      </div>
    </nav>
  );
}
