import './App.css'
import ToDoList from './pages/ToDoList'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AddToDo from './pages/AddToDo'
function App() {

  return (
      <>
         <BrowserRouter>
          <Routes>
            <Route  path="/" element={<ToDoList/>}/>
            <Route  path="/add" element={<AddToDo/>}/>
            </Routes>
          </BrowserRouter>
      </>
  )
}

export default App
