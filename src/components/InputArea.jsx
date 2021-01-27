import React, { useState } from 'react'
import axios from 'axios'
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab';

function InputArea(props){
    const [isEmpty, setIsEmpty] = useState(true)
    const [inputNote, setInputNote] = useState({
        title: "",
        content: ""
    });
    const {onAdd} = props;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputNote((prevNote)=>{
            return{
                ...prevNote,
                [name]: value
            }
        });
    };

    const submitNote = (event) => {
        const createNote = async () => {
            const url = 'http://localhost:3001/note';
            const options = {
                headers: { 'Content-Type': 'application/json' }
            };
            const response = await axios.post(
                url,
                inputNote,
                options
            );
            const {_id, title, content} = response.data.data;
            onAdd((prevNotes)=>{return [{_id, title, content}, ...prevNotes]});
        }
        createNote();
        setInputNote({
            title: "",
            content: ""
        });
        setIsEmpty(true);
        event.preventDefault();
    }

    return<div>
        <form className="create-note" onSubmit={submitNote}>
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
                <Fab aria-label="add" type="submit">
                    <AddIcon/>
                </Fab>
            </Zoom>
        </form>
    </div>
}

export default InputArea;