import React, {useState} from 'react'
import axios from "axios"
import Zoom from '@material-ui/core/Zoom';
import DeleteIcon from '@material-ui/icons/Delete'

function Note(props){
    const[deleted,setDeleted]=useState(false);
    const {_id, title, content, onDelete} = props;

    const deleteNote = async () =>{
        const url = 'http://localhost:3001/note';
        const options = {
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await axios.delete(
            url,
            {data: {_id}},
            options
        );
        if(response.data.success){
            onDelete((prevNotes)=>{
                return prevNotes.filter((note)=>
                    note._id!==_id
                )
            });
        }else{
            console.log(response.data)
        }
    };

    return <Zoom in={!deleted} onExited={deleteNote}>
        <div className='note'>
            <h1>{title}</h1>
            <p>{content}</p>
            <button onClick={()=>setDeleted(true)}>
                <DeleteIcon/>
            </button>
        </div>
    </Zoom>
}

export default Note;