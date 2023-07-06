import { useState, useEffect } from 'react'
import axios from 'axios'
import './ToDoList.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';
function ToDoList() {
  const [list,setList]=useState([]);
  const [done,setDone]=useState(null);
  const today = new Date();
  const date = today.getDate();
  const day = today.getDay();
  const month = today.getMonth();
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function setDoneValue(){
    const doneValue = list.filter((item)=>{
      return item.completed
    })
    setDone(doneValue.length);
  }
  function fetchTasks(){
        const BASE_URL = "https://apitodo.pythonanywhere.com/api/"
        const ENDPOINT = "tasks/"
          axios.get(BASE_URL+ENDPOINT).then(response=>{
            setList(response.data);
            setDoneValue();
          })
  }
  useEffect(()=>{
    fetchTasks()
  },[done]);

 
  const changeHandler=(item)=>{
      const updateItem = {completed:!item.completed}
      const BASE_URL = "https://apitodo.pythonanywhere.com/api/"
      const ENDPOINT = `tasks/${item.id}/`
      axios.patch(BASE_URL+ENDPOINT,updateItem).then((response)=>{
        fetchTasks();
      });
  }
  const deleteHandler=(item)=>{
    const BASE_URL = "https://apitodo.pythonanywhere.com/api/"
    const ENDPOINT = `tasks/${item.id}/`
      axios.delete(BASE_URL+ENDPOINT).then((response)=>{
        console.log(response);
        fetchTasks();
      });
  }

  return (
    <div className=" container">
      <div className="main mt-5 ">
        <div className=" main-container bg-indigo">
          <div className="main-top-section p-3 text-light text-center ">
          <h4>{days[day]}, {date}th</h4>
          <p>{months[month]},</p>
          {
            list.length ?
          <div className="content d-flex justify-content-between">
            <div><span className="fw-bold display-6">{list.length}</span> <span className="d-block">Total</span></div>
            <div><span className="fw-bold display-6">{list.length-done}</span> <span className="d-block">Remainig</span></div>
            <div><span className="fw-bold display-6">{done}</span> <span className="d-block">Done</span></div>
          </div>
          :<h1>loading</h1>
        }
          </div>
          <div className="main-bottom-section p-3 bg-light">
            <p className="text-center"><span className="fw-bold">Tasks</span> for today</p>
            {
              list.map((item)=>{
                return(
                      <div className="d-flex justify-content-between my-3" key={item.id}>
                        <div>
                        <input type="checkbox" checked={item.completed?true:false} onChange={(e)=>{changeHandler(item)}} className="form-check-input me-2"/>
                         { item.completed?
                         <span className="text-capitalize text-decoration-line-through text-secondary">
                          {item.title}
                          <small className="d-block ms-4 text-secondary">{item.date}</small>
                         </span>
                         :<span className="text-capitalize">
                          {item.title}
                          <small className="d-block ms-4 text-secondary">{item.date}</small>
                         </span>
                        }
                        </div>
                        <div className="cursor-pointer text-danger" onClick={()=>{deleteHandler(item)}}><DeleteOutlineIcon fontSize="large"/></div>
                      </div>
                  )
              })
            }
           <div className="text-center mt-5">
           <Link to="/add" className="btn btn-indigo"><AddIcon/>Add new item</Link>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDoList;
