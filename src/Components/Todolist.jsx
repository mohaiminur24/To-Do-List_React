import React, { useEffect, useState } from 'react';
import { FaReact,FaExternalLinkAlt,FaRegTrashAlt,FaSignInAlt } from "react-icons/fa"
import IncompleteTask from '../Components/IncompleteTask';

const Todolist = () => {
    const [addTaskinput, setAddtaskinput] = useState('');
    const [setinputtaskhide, setinputtexthide] = useState(false);
    const [updateTaskinput, setUpdatetaskinput] = useState('');
    const [hiddenupdate , setHiddenupdate] = useState(true);
    const [incompletetasklocalstorage, setIncompletetasklocalstorage] = useState([]);
    const [reloadlocalstorage, setreloadlocalstorage] = useState(false);
    const [updateinputtask,setupdateinputtask] = useState();

    const [showcompletetask, setShowcompletetask] = useState(false);
    const [completetasklocalstorage, setCompletetasklocal] = useState([]);
    const [tasktoggle , setToggle] = useState(false)

    const addtaskinputlocal = () =>{
        let incompletetask ;
        const getincompletetask = JSON.parse(localStorage.getItem('incompletetask'));
        if(getincompletetask){
            const newtask = [...getincompletetask,addTaskinput];
            const newtaskStringfy = JSON.stringify(newtask);
            localStorage.setItem('incompletetask',newtaskStringfy);
        }else{
            incompletetask = JSON.stringify([addTaskinput]);
            localStorage.setItem('incompletetask',incompletetask);
        };
        document.getElementById('incompletetaskfield').value = '';
        setreloadlocalstorage(!reloadlocalstorage);  
    };


    useEffect(()=>{
        const getincompletetasklocalstorage = JSON.parse(localStorage.getItem('incompletetask'));
        setIncompletetasklocalstorage(getincompletetasklocalstorage);
    },[reloadlocalstorage]);

    const deletetask = (id) =>{
        const filter = incompletetasklocalstorage.filter((task,index) => index != id);
        const filterstring = JSON.stringify(filter);
        localStorage.setItem('incompletetask',filterstring);
        setreloadlocalstorage(!reloadlocalstorage); 
    };

    const completetask = id =>{
        const find = incompletetasklocalstorage.find((task,index)=> index == id);
        deletetask(id);
        const getCompletetask = JSON.parse(localStorage.getItem('completetask'));
        if(getCompletetask){
            const newtask = [...getCompletetask,find];
            const newtaskstrign = JSON.stringify(newtask);
            localStorage.setItem('completetask',newtaskstrign);
        }else{
            const newtask = [find];
            const newtaskstrign = JSON.stringify(newtask);
            localStorage.setItem('completetask',newtaskstrign);
        }
    };

    const updatetask = id =>{
        deletetask(id);
        const find = incompletetasklocalstorage.find((task,index)=> index == id);
        setUpdatetaskinput(find);
        setHiddenupdate(false);
        setinputtexthide(true);
        setUpdateID(id);
        
    };

    const updetedtask =() =>{
        const newtask = [...incompletetasklocalstorage,updateinputtask];
        const newtaskstirng = JSON.stringify(newtask);
        localStorage.setItem('incompletetask',newtaskstirng);
        setreloadlocalstorage(!reloadlocalstorage);
        setHiddenupdate(true);
        setinputtexthide(false);
        document.getElementById('updateinputfield').value = '';
    };

    const completetasklocal = () => {
            const getcompletetask = JSON.parse(localStorage.getItem('completetask'))
            setCompletetasklocal(getcompletetask);
            setShowcompletetask(!showcompletetask);
            setToggle(!tasktoggle);
    }

    

    return (
        <div className='w-4/5 mx-auto flex justify-center items-center h-screen'>
            <div className='w-4/5 mx-auto bg-white rounded-md p-5'>
                <h1 className='md:text-4xl text-2xl font-bold text-center'>To Do List <FaReact className='inline-block mx-2' /> </h1>

                <div className={setinputtaskhide?'hidden':'block'}>
                    <div className='text-center my-5'>
                        <input id='incompletetaskfield' onChange={(event)=>setAddtaskinput(event.target.value)} className='border block md:inline-block w-11/12 mx-auto rounded-md outline-none md:w-2/5 px-5 md:mx-5 py-1' placeholder='Added your list items' type="text" />
                        <button className='text-white mt-3 font-semibold px-4 py-1 rounded-md bg-slate-700' onClick={()=>addtaskinputlocal()}>ADD List</button>
                    </div>
                </div>

                <div className={hiddenupdate? 'hidden':'block'}>
                    <div className='text-center my-5'>
                        <input id='updateinputfield' onChange={(event)=>setupdateinputtask(event.target.value)} className='border block md:inline-block w-11/12 mx-auto rounded-md outline-none md:w-2/5 px-5 md:mx-5 py-1' placeholder={updateTaskinput} type="text" />
                        <button onClick={()=>updetedtask()} className='text-white mt-3 font-semibold px-4 py-1 rounded-md bg-slate-700'>Update List</button>
                    </div>
                </div>


                <div className='w-4/5 mx-auto bg-gray-100 p-5 rounded-md font-semibold text-gray-600'>

                        <div className={showcompletetask? 'hidden':'block'}>
                            { incompletetasklocalstorage && incompletetasklocalstorage.map((task,index) => <IncompleteTask updatetask={updatetask} completetask={completetask} complete='Incompleted' deletetask={deletetask} task ={task} index ={index}></IncompleteTask>)
                            }
                        </div>
                        <div className={showcompletetask? 'block':'hidden'}>
                            { completetasklocalstorage && completetasklocalstorage.map((task,index) => <IncompleteTask updatetask={updatetask} completetask={completetask} deletetask={deletetask} task ={task} complete='completed' hiddenbutton = {true} index ={index}></IncompleteTask>)}
                        </div>

                </div>


                <div className='mt-10 flex flex-col md:flex-row gap-3 justify-center'>
                    <button onClick={()=>completetasklocal()} className='text-sm border py-2 px-4 shadow-sm rounded-md'>{tasktoggle? "Inomplete Task":"Complete Task"}</button>
                    <button onClick={()=>{localStorage.clear('incompletetask'),setreloadlocalstorage(!reloadlocalstorage);setHiddenupdate(true);
                    setinputtexthide(false);setCompletetasklocal()}} className='text-sm border py-2 px-4 shadow-sm rounded-md'>Clear Task</button>    
                </div>
            </div>
            
        </div>
    );
};

export default Todolist;