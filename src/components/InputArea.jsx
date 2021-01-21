import React, { useState } from 'react'

function InputArea(props){
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
        event.preventDefault()
    }

    return<div>
        <form>
            <input 
                onChange={handleChange} 
                name="title"
                type="text" 
                placeholder="Title" 
                value={inputNote.title}/>
            <textarea 
                onChange={handleChange} 
                name="content"
                type="text" 
                placeholder="Content" 
                value={inputNote.content}
                rows={4}/>
            <button onClick={(submitNote)}>Add</button>
        </form>
    </div>
}

export default InputArea;