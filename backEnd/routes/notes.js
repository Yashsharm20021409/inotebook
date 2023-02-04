const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser');
// to store those notes 'in which something is written notes all then empty notes'
const { body, validationResult } = require('express-validator');

// Route 1: get all the notes : GET 'api/notes/fetchallnotes' Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Add a notes using POST : POST 'api/notes/addnote' Login required

router.post('/addnote', fetchUser, [

    body('title', 'Enter a Valid title').isLength({ min: 3 }),
    body('description', 'description Must Be more then 5 Charcters').isLength({ min: 5 })

], async (req, res) => {
    try {
        // destructring concept
        const { title, description, tag } = req.body;
        // check if error occurs and then errors and bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })

        const saveNote = await notes.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})



// Route 3: Update an Existing Notes using Put : PUT 'api/notes/updatenote' Login required

// The HTTP PUT request method creates a new resource or replaces a representation of the target resource with the request payload
// An imp point I would like to point out that for updating anything on an API, 
// PUT or PATCH requests are used.

// I used PATCH request in this project instead of PUT because : 
// 1. PATCH as it name says, it updates only the data which we changed and doesn't sends whole payload.
// 2. PUT sends the whole body payload and pastes into the DB which might not be good for overall performance of the API when scaled it.


router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // means agar new title is coming first we check in if condition if true and we update this object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // find the node to be updated and update it
        // To verify the person who try to update that note is the owner of that note (means kya ye use ka note h)
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})


// Route 3: Delete an Existing Notes using Delete : Delete 'api/notes/deletenote' Login required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {

        // find the node to be deleted and delete it
        // To verify the person who try to delete that note is the owner of that note (means kya ye use ka note h)
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Has been Deleted ", note: note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;