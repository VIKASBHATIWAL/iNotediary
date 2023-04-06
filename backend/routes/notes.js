const express = require("express")
const router = express.Router();
const Notes = require("../models/Notes")
const fetchUser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');





//Route1 . Get all notes using GET.  /api/anptes/fetchallnotes   Login requireed

router.get("/fetchallnotes", fetchUser, async (req, res) => {

    try {
        let notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")



    }
})

//Route2 . Add a note using POST.  /api/anptes/addnote   Login requireed

router.post("/addnote", fetchUser, [body("title", "Enter a valid title").isLength(3), body("description", "Enter a valid description").isLength(5)], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {

        let note = await new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save()

        res.json(savedNotes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")

    }
})

//Route3 . Updating an existing note using PUT.  /api/notes/updatenote   Login requireed

router.put("/updatenote/:id", fetchUser,[body("title", "Enter a valid title").isLength(3), body("description", "Enter a valid description").isLength(5)], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {title, description, tag} = req.body
const newNote={}

if(title){newNote.title=title}
if(description){newNote.description=description}
if(tag){newNote.tag=tag}

let note = await Notes.findById(req.params.id)

if(!note){
    return res.status(404).send("Not found")
}

if(note.user.toString()!=req.user.id){
    return res.status(401).send("Not allowed")
}

 note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true  })
res.json(note)

})




//Route4 . Delete an existing note using PUT.  /api/notes/deletenote   Login requireed

router.delete("/deletenote/:id", fetchUser, async (req, res) => {

  
    let note = await Notes.findById(req.params.id)

if(!note){
    return res.status(404).send("Not found")
}

if(note.user.toString()!=req.user.id){
    return res.status(401).send("Not allowed")
}

 note = await Notes.findByIdAndDelete(req.params.id)
res.send("note deleted")
   



})




module.exports = router