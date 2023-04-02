import React from 'react';
import { FaReact,FaExternalLinkAlt,FaRegTrashAlt,FaSignInAlt } from "react-icons/fa"

const IncompleteTask = ({task,index,deletetask,completetask,updatetask,complete,hiddenbutton}) => {
    return (
        <div className={complete == 'completed'? 'bg-transparent': "bg-white"}>
            <div className='flex gap-3 w-full justify-between items-center p-3 rounded-md'>
         <h1><span className='font-bold text-lg mr-3'>{index+1}</span> {task} <span className='text-xs font-thin ml-5 text-gray-300'>({complete && complete})</span></h1>
            <div className='flex gap-2'>
                <abbr className={hiddenbutton? 'hidden':'block'} title='Update Taks'><button onClick={()=>updatetask(index)} className='p-2 hover:text-yellow-600'><FaExternalLinkAlt/></button></abbr>
                <abbr className={hiddenbutton? 'hidden':'block'} title='Delete Task'><button className='p-2 hover:text-red-600' onClick={()=>deletetask(index)}><FaRegTrashAlt/></button></abbr>
                <abbr className={hiddenbutton? 'hidden':'block'} title='Mark as aComplete Task'><button onClick={()=>completetask(index)} className='p-2 hover:text-green-600'><FaSignInAlt/></button></abbr>
            </div>
        </div>
        </div>
    );
};

export default IncompleteTask;