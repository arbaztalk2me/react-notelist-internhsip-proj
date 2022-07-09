import React, { useEffect, useState } from 'react'

const MainArea = () => {
    
    const[task,setTask]=useState("");
    const[fid,setfid]=useState(5)
    const[newlist,setNewlist]=useState([]);
    const[flag,setFlag]=useState(false);
    const[sid,setSid]=useState(null);
    useEffect(()=>{
        let list=JSON.parse(localStorage.getItem("notelist"));
        setNewlist(list);
    },[fid]);
    const handleAddTask=()=>{
        if(task!=null && task!=""){
            let tempdata={
                id:Math.random(),
                text:task
            }
            let list=JSON.parse(localStorage.getItem("notelist"));
            list=[tempdata,...list];
            localStorage.setItem("notelist",JSON.stringify(list));
            setTask("");
            setfid(6);
        }
    }

    const handleDelete=(id)=>{
        let list=JSON.parse(localStorage.getItem("notelist"));
        let newArr=list.filter((data)=>data.id!==id)
        localStorage.setItem("notelist",JSON.stringify(newArr));
        setfid(7);
    }

   const handleUpdateTask=()=>{
    if(task!=null && task!=""){
        let tempdata={
            id:sid,
            text:task
        }
        let list=JSON.parse(localStorage.getItem("notelist"));
        list=[tempdata,...list];
        localStorage.setItem("notelist",JSON.stringify(list));
        setTask("");
        setSid(null);
        setFlag(false)
        setfid(8);
    }
}

    const handleEdit=(id)=>{
        setFlag(true)
        let list=JSON.parse(localStorage.getItem("notelist"));
            let tempdata=list.find((data)=>data.id===id)
            setTask(tempdata.text);
            setSid(tempdata.id)
            handleDelete(id);
            setfid(9);
            
    }

  return (
    <>
    <div className='d-flex justify-content-center mb-3'>
        <div className='card' style={{width:"450px"}}>
            <div className='card-header'>
                Note List
            </div>
            <div className='card-body'>
                <input className='form-control' value={task} onChange={(e)=>setTask(e.target.value)} type="text" placeholder='Enter task name' /><br/>
                {flag?<button className='btn btn-outline-success' onClick={handleUpdateTask}>Update Task</button>:
                <button className='btn btn-outline-success' onClick={handleAddTask}>Add Task</button>
                }
            </div>
        </div>
        </div>
        {
            
            newlist.map((data)=>{
                return(<div className='card' key={data.id} style={{width:"450px"}}>
                <div className='card-body'>
                    <h4 className='card-text'>{data.text}</h4>
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-danger' onClick={()=>handleDelete(data.id)}>Delete</button>
                        <button className='btn btn-warning' onClick={()=>handleEdit(data.id)}>Edit</button>
                    </div>
                </div>
            </div>)
            })
        }
        
    </>
  )
}

export default MainArea