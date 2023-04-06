import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = ({showAlert}) => {
const navigate= useNavigate()


  const [note, setNote] = useState({id:"",  etitle:"",edescription:"", etag:""
  })

  useEffect(()=>{

   if(localStorage.getItem('auth-token')){
    getNotes()

   }else{
    navigate("/login")
   }

  // eslint-disable-next-line
}, [])
const ref = useRef(null)
 const refClose = useRef(null)
const context = useContext(noteContext);
const {notes, getNotes, editNote} = context





const updateNote =  (currentNote)=>{
ref.current.click()
setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:  currentNote.tag})

}

const handleClick= (e)=>{
  e.preventDefault()
  refClose.current.click()
editNote(note.id, note.etitle, note.edescription, note.etag)
console.log("updatinggggg",  note);
showAlert("Succesffully updated", "success")

}

const onChange = (e)=>{
  setNote({...note, [e.target.name]: e.target.value})

}





  return (
    <div className='row' style={{ width: "900px" }}>
<button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">Description</label>
          <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag"  name="etag" value={note.etag} onChange={onChange} />
        </div>

      </form>      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
      <div className=" container row">
      {notes.map((note)=>{
    return <Noteitem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />
})}
      </div>


    </div>
  )
}

export default Notes
