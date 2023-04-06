import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {

 const initialNotes = []

  const host = "http://localhost:5000"
const [notes, setNotes] = useState(initialNotes)

//Get all notes

const getNotes = async ()=>{

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("auth-token")
        }
       
      });
const json = await response.json()
console.log(json);    
setNotes(json)
}

//ADD a Note





const addNote = async (title, description, tag)=>{

    const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("auth-token")
        },
        body:JSON.stringify({title, description, tag})

       });

       const note = await response.json()
       setNotes(notes.concat(note))




}

//Delete
const deleteNote =async (id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', 
        
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("auth-token")
        },

       
      });

setNotes(notes.filter((note)=>{return note._id!==id}))
}


//Edit Note

const editNote = async (id, title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', 
        
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("auth-token")
        },
        body:JSON.stringify({title, description, tag})

       
      });

      const json = await response.json();
      console.log(json);

      //Logic to edit


const newNotes = JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
        }
      }
      setNotes(newNotes)
}

    return (
        <>
            <NoteContext.Provider value={{notes, addNote, deleteNote, getNotes,  editNote}}>
                {props.children}
            </NoteContext.Provider>

        </>
    )

}








export default NoteState
