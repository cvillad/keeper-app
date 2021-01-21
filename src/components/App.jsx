import React, { useState } from 'react'
import Footer from './Footer';
import Header from './Header';
import Note from './Note'
import InputArea from "./InputArea"

function App(){
    const [notes, setNotes] = useState([])

    function addNote(inputNote){
        setNotes([inputNote, ...notes])
    }

    function deleteNote(id){
        setNotes(prevNotes => {
            return prevNotes.filter((note, index)=>{
                return index !== id
            })
        })
    }


    return <div>
        <Header/>
        <InputArea onAdd={addNote}/>
        {notes.map((note, index) => 
            <Note 
                key={index} 
                id={index} 
                title={note.title} 
                onDelete={deleteNote}
                content={note.content}
            />)}
        <Footer/>
    </div>
     
}

export default App;