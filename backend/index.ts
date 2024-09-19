import express from 'express'
import cors from 'cors'
import {Note} from '@/models/Note'
const app = express()

app.use(express.json())
app.use(cors())


let notes = [
    {
        "id": "1",
        "title": "note title",
        "content": "Actual note",
        "createdAt": "1726713107493",
        "updatedAt": "1726713107493"
    }
]

app.get('/notes', async (req, res) => {
    try {
        res.json(notes)
    } catch ( e ) {
        return res.status(500).json({message: 'Error reading notes.'})
    }
});

app.get('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const filteredNote = notes.find(note => note.id === id);
        if ( !filteredNote) {
            return res.status(400).json({message: "Bad request - invalid note ID"});
        }

        res.json(filteredNote)
    } catch ( e ) {
        return res.status(500).json({message: 'Error reading note.'})
    }
})

app.post('/notes', async (req, res) => {
    const newNote: Note = {
        id: '',
        title: '',
        content: '',
        createdAt: '',
        updatedAt: ''
    };

    const {title, content} = req.body as Note;

    if ( !title || title.trim().length === 0 ) {
        return res.status(400).json({message: 'Bad Request - invalid title'})
    }

    if ( !content || content.trim().length === 0 ) {
        return res.status(400).json({message: 'Bad Request - invalid content'})
    }
    const time = Date.now();
    newNote.id = `${time}`; // uuid alternative
    newNote.title = title;
    newNote.content = content;
    newNote.createdAt = `${time}`;
    newNote.updatedAt = `${time}`;

    notes.push(newNote)

    res.json({message: 'Success'});
})

app.put('/notes/:id', async (req, res) => {
    const { id } = req.params

    const {title, content} = req.body as Note;

    if ( !title || title.trim().length === 0 ) {
        return res.status(400).json({message: 'Bad Request - invalid title'})
    }

    if ( !content || content.trim().length === 0 ) {
        return res.status(400).json({message: 'Bad Request - invalid content'})
    }

    notes = notes.map(note => {
        if ( note.id === id ) {
            note.title = title;
            note.content = content;
        }
        return note;
    })


    res.json({message: 'Note updated.'});
})

app.delete(`/notes/:id`, async (req, res) => {
    const { id } = req.params
    notes = notes.filter(note => note.id !== id)
    res.json({message: 'Succeess'})
})

// Known issue? https://github.com/TypeStrong/ts-node/issues/2100#issuecomment-1991843192
const server = app.listen(3001, () =>
    console.log(`
🚀 Server ready at: http://localhost:3001
`),
)
