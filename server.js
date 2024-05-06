const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

//our modular routing starts here
// const routes = require('./routes')
const fs = require('fs');
const PORT = process.env.PORT || 3002;
// procces.env.PORT ||
const app = express();

app.use(express.static("public"));
// app.use("/", routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) =>{
    let allNotes = fs.readFileSync(path.join(__dirname, 'db/db.json'))
    allNotes = JSON.parse(allNotes);
    console.log(allNotes);
    res.json(allNotes);
})

app.post('/api/notes', (req, res) =>{
    let allNotes = fs.readFileSync(path.join(__dirname, 'db/db.json'))
    allNotes = JSON.parse(allNotes);
    const newNote = {
        id: uuidv4(), // Generate a random ID
        title: req.body.title,
        text: req.body.text
    };

    allNotes.push(newNote);
    // console.log(req);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(allNotes));
    //make an id for each thing dynamically, req.body id 
    
    res.json(allNotes);
})

app.listen(PORT, () => {
    console.log(`Express listening at http://localhost:${PORT}`)
})

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const index = notes.findIndex(note => note.id === parseInt(id));

    if (index !== -1) {
        notes.splice(index, 1);
        res.status(200).send("Note deleted");
    } else {
        res.status(404).send('No note found with that ID');
    }
});
