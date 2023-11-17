import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../reducer-context/context';
import ButtonComponent from "../button/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import "./Nav.css";

export default function NavBar() {
  const { state, setFilter, clearTodo } = useContext(TodoContext);
  const [menu, setMenu] = useState(false)

const handleFilter= (filter) =>{
  if(state.todos.length === 0 ){
    setFilter('all')
  }else{
    setFilter(filter)
  }
}

const handleMenuClick = () => {
setMenu(!menu)
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

useEffect(() => {
  const handleOutsideClick = (event) => {
    if (menu && !event.target.closest('.menuIcon')) {
      setMenu(false);
    }
  };
  document.addEventListener('click', handleOutsideClick);
  return () => {
    document.removeEventListener('click', handleOutsideClick);
  };
}, [menu]);


  return (
    <nav className="NavBar d-flex justify-content-between align-items-center px-2">
      <h1>Todos</h1>
      <IconButton className='menuIcon' onClick={handleMenuClick}>
        <MenuIcon fontSize="large" />
      </IconButton>
      {menu && <>
       <div className='menuButtons d-flex flex-column gap-5 p-3 pt-5'>
        <ButtonComponent onClick={() => handleFilter('all')} child="All Todos" color="black" />
        <ButtonComponent onClick={() => handleFilter('active')} child="Active" color="black" />
        <ButtonComponent onClick={() => handleFilter('completed')} child="Completed" color="black" />
        <ButtonComponent onClick={handleClearTodo} child="Clear Completed" color="black" />
       </div>
      </> }
      <div className='displayButton gap-1'>
        <ButtonComponent onClick={() => handleFilter('all')}  child="All Todos" color="white" />
        <ButtonComponent onClick={() => handleFilter('active')} child="Active" color="white" />
        <ButtonComponent onClick={() => handleFilter('completed')} child="Completed" color="white" />
        <ButtonComponent onClick={handleClearTodo} child="Clear Completed" color="white" />
      </div>
    </nav>
  );
}
