import {  MiddlewareAPI, Dispatch } from "@reduxjs/toolkit";
interface task{
    id:string,
    value:string,
    completed:boolean
}
interface apiPayload{
    url:string,
    onSuccess:string,
    data:task
}
interface apiAction{
    type:string,
    payload:apiPayload
}
export const apiMiddleware=(store:MiddlewareAPI)=>(next:Dispatch)=>async(action:apiAction)=>{
    try{
        if(action.type==='api/addTask'){
           
            const {url,onSuccess,data}=action.payload;
            const responseData=await fetch(`http://localhost:3000${url}`,{
                method:'POST',
                body:JSON.stringify(data)
            });
            const result=await responseData.json();
            console.log(result);
            store.dispatch({
                type:onSuccess,
                payload:data
            })




        }
      else  if(action.type==='api/getTask'){
           
            
            const {onSuccess}=action.payload;
            const responseData=await fetch('http://localhost:3000/tasks',{
                method:'GET'
            })
            const data=await responseData.json();
            console.log(data);
            
            store.dispatch({
                type:onSuccess,
                payload:data
            })
            
    
        }
        else if(action.type==='api/update'){
            const {url,data,onSuccess}=action.payload;
            const responseData=await fetch(`http://localhost:3000${url}`,{
                method:'PATCH',
                body:JSON.stringify(data)
            })
            const result=await responseData.json();
            console.log("result",result);
            store.dispatch({
                type:onSuccess,
                payload:result
            })
        }
        else if(action.type==='api/delete'){
            const {url,data,onSuccess}=action.payload;
            await fetch(`http://localhost:3000${url}`,{
                method:'DELETE',
            })
            store.dispatch({
                type:onSuccess,
                payload:data
            })
        }
        else{
            //@ts-ignore
            next(action);
        }


    }
    catch(err){
       
        console.log(err);

    }
}

