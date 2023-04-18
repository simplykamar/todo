import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
const AddToDo = () => {
  const notify = () => toast.success("Task added successfully");
  const [taskTitle,setTaskTitle] = useState()
  const [taskCompleted,setTaskCompleted] = useState()
  function add(e){
      e.preventDefault();
      const BASE_URL = "http://127.0.0.1:8000/api/"
      const ENDPOINT = "tasks/"
      axios.post(BASE_URL+ENDPOINT,{title:taskTitle,completed:taskCompleted}).then((response)=>{
        console.log(response.data);
        notify();
      });
      console.log(taskCompleted,taskTitle);

  }

	return(
		<div>
    <div>
        <ToastContainer />
      </div>
			<div className="container">
      <div className="main mt-5">
        <div className=" main-container bg-indigo">
          <div className="main-top-section p-3 text-light text-center ">
          <h4>Add new task</h4>
          </div>
          <div className="main-bottom-section px-3 py-5 bg-light">
          <form onSubmit={(e)=>{add(e)}}>
       			<div className="form-group my-3">
       			<label htmlFor="title">Task Title</label>
       				<input type="text" className="form-control" onChange={(e)=>{setTaskTitle(e.target.value)}}/>
                 	</div>
       			<div className="form-group">
       				<input type="checkbox" className="form-check-input me-1" onChange={(e)=>{setTaskCompleted(e.target.checked)}}/>   
       			  <label htmlFor="completed">Completed</label>
           	</div>
                  <div className="mt-5 d-flex justify-content-around">
                      <Link to="/" className="btn btn-outline-indigo">Back</Link>
                     <button type="submit" className="btn btn-indigo"><AddIcon/>Add</button>
                 </div>
          </form>
          </div>
        </div>
      </div>
    </div>

		</div>
		)
}

export default AddToDo;
