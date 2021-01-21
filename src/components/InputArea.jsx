import React, { useState } from 'react'
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab';

function InputArea(props){
    const [isEmpty, setIsEmpty] = useState(true)
    const [inputNote, setInputNote] = useState({
        title: "",
        content: ""
    })

    function handleChange(event){
        const {name, value} = event.target
        setInputNote((prevNote)=>{
            return{
                ...prevNote,
                [name]: value
            }
        })
    }

    function submitNote(event){
        props.onAdd(inputNote)
        setInputNote({
            title: "",
            content: ""
        })
        setIsEmpty(true)
        event.preventDefault()
    }

    return<div>
        <form className="create-note">
            {!isEmpty && <input 
                onChange={handleChange} 
                name="title"
                type="text" 
                placeholder={"Title"} 
                value={inputNote.title}/>}
            <textarea 
                onChange={handleChange} 
                onClick={()=>setIsEmpty(false)}
                name="content"
                type="text" 
                placeholder="Take a note..." 
                value={inputNote.content}
                rows={isEmpty? 1 : 4}/>
            <Zoom in={!isEmpty}>
                <Fab aria-label="add" onClick={(submitNote)}>
                    <AddIcon/>
                </Fab>
            </Zoom>
            
            
        </form>
    </div>
}

export default InputArea;