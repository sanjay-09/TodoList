import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
interface task{
    id:string,
    value:string,
    completed:boolean
}
interface TaskList{
    tasks:task[]
}
const initialState:TaskList={
    tasks:[]
}
export const getTasks=createAsyncThunk("api/getTasks",async()=>{
    try{
        const responseData=await fetch("http://localhost:3000/tasks",{
            method:"GET"
        });
        const data=await responseData.json();
        return data;
    }
    catch(err){
        throw err;
    }

})
export const addTasks=createAsyncThunk("api/addTasks",async(payload:task,_)=>{
    try {
        console.log(payload);
        const responseData=await fetch("http://localhost:3000/tasks",{
            method:"POST",
        
            body:JSON.stringify(payload)
        })
        const result=await responseData.json();
        console.log(result);
        return result;
     
        
    } catch (error) {
        console.log(error);
        throw error;
        
    }
})
export const updateTasks=createAsyncThunk("api/updateTasks",async(payload:task,_)=>{
    try{
        const responseData=await fetch(`http://localhost:3000/tasks/${payload.id}`,{
            method:"PATCH",
            body:JSON.stringify(payload)
        })
        const result=await responseData.json();
        console.log("result",result);
        return result;

    }
    catch(err){
        console.log(err);
        throw err;
    }
})
export const deleteTasks=createAsyncThunk("api/deleteTasks",async(id,_)=>{
    try{
        await fetch(`http://localhost:3000/tasks/${id}`,{
            method:'DELETE'
        })
        return {
            id:id
        };
        

    }
    catch(err){
        throw err;
    }
})
//@ts-ignore
const appSlice=createSlice({
    name:"appSlice",
   initialState,
    extraReducers:(builder)=>{
        builder.addCase(getTasks.fulfilled,(state,action)=>{
            state.tasks=action.payload
        })
        .addCase(addTasks.fulfilled,(state,action)=>{
            state.tasks.push(action.payload)
        })
        .addCase(updateTasks.fulfilled,(state,action)=>{
            const index=state.tasks.findIndex((task)=>{
                return task.id===action.payload.id
            })
            state.tasks[index]={
                ...state.tasks[index],
                completed:true
            }
        })
        .addCase(deleteTasks.fulfilled,(state,action)=>{
            const index=state.tasks.findIndex((task)=>{
                //@ts-ignore
                return task.id===action.payload.id
            })
            state.tasks.splice(index,1);

        })

    
    }
})
export default appSlice.reducer;
