import React from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteTasks, updateTasks } from '../Store/appSlice';
import { useDeleteTasksMutation, useUpdateTasksMutation } from '../Store/apiSlice';


type taskItem={
    id:string
    value:string,
    completed:boolean
  }
interface TasksProps {
    t:taskItem,
   
  }
const Tasks: React.FC<TasksProps>=({t}) =>{
    const {id,value,completed}=t;
    const dispatch=useDispatch();
    const [updateTask]=useUpdateTasksMutation();
    const [deleteTasks]=useDeleteTasksMutation();

    const handleChange=async()=>{
      //@ts-ignore
     updateTask({
      id:id,
      value:value,
      completed:true
     })
       
        
        

    }
    const deleteTask=async()=>{
      //@ts-ignore
      deleteTasks(id);

     
     
     

    }
  return (
    <div className='flex justify-between items-center px-2'>
        <input type="checkbox" className='' checked={completed} onChange={handleChange} />
        <h3>{value}</h3>
       <MdDelete onClick={deleteTask}/>

      
    </div>
  )
}

export default Tasks
