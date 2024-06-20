import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Tasks from "./Components/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { getTasks,addTasks } from "./Store/appSlice";
import { useAddTasksMutation, useGetTasksQuery, useUpdateTasksMutation } from "./Store/apiSlice";

type taskItem={
  id:string
  value:string,
  completed:boolean
}
function App() {
  const [value,setValue]=useState("");
  // const [tasks,setTasks]=useState([]);
  const dispatch=useDispatch();
  //@ts-ignore

 const {data:tasks}=useGetTasksQuery();
 const [addTasks]=useAddTasksMutation();


  useEffect(()=>{
    getData();

  },[]);

  const getData=()=>{
    //@ts-ignore
    dispatch(getTasks());
    

    

  }
  const addTask=async()=>{
    const payload_data={
      id:Math.random().toString(),
      value:value,
      completed:false
    }
    //@ts-ignore
   addTasks(payload_data)
    
    
    setValue("");

  }
 

  return (
    <div className="w-full h-full">
      <div className="mx-auto  border-2 border-black rounded-lg w-1/4 mt-4">
        <h1 className="text-center text-3xl">Todo</h1>
        <div className="flex gap-2 justify-between px-4 mb-4 mt-4 items-center border-b-2 border-black py-4">
          <input type="text" className="border-2 border-black w-[70%] rounded-lg" value={value} onChange={(e)=>{
            setValue(e.target.value)
          }}/>
          <IoIosAddCircleOutline  className="text-xl" onClick={addTask}/>


        </div>
        <div className="">
          {
            tasks?.map((task:taskItem)=>{
              return <Tasks t={task}/>
            })
          }



        </div>

      </div>
     
    </div>
  )
}

export default App
