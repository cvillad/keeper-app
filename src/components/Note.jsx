import React,{useState, useEffect} from 'react'
import Zoom from '@material-ui/core/Zoom';
import DeleteIcon from '@material-ui/icons/Delete'

function Note(props){
    const[deleted,setDeleted]=useState(false)

    function deleteNote(){
        setDeleted(true)
        props.onDelete(props.id)
    }

    return <Zoom in={!deleted}>
        <div className='note'>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={deleteNote}>
                <DeleteIcon/>
            </button>
        </div>
    </Zoom>
}

export default Note;