import React, { useContext, useState } from 'react'

import Notes from './Notes'
import noteContext from '../context/notes/noteContext'



const Home = ({showAlert}) => {

const [note, setNote] = useState({
  title:"",
  description:"",
  tag:""
})

  const context = useContext(noteContext)
const {addNote} = context


const handleClick= (e)=>{
  e.preventDefault()
addNote(note.title, note.description, note.tag)
setNote({
  title:"",
  description:"",
  tag:""
})
showAlert("Successfully added", "success")

}

const onChange = (e)=>{
  setNote({...note, [e.target.name]: e.target.value})
}




  return (
    <>
    <div className='container my-4' style={{ width: "900px" }}>
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag"  name="tag" value={note.tag} onChange={onChange} />
        </div>

        <button disabled={note.title.length<5||note.description.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
      </form>
      <h2 className='my-2'>Your Notes</h2>
<Notes showAlert={showAlert} />

    </div>

    </>
  )
}

export default Home
