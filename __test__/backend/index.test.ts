import request from 'supertest'
import {app, notes} from '@/backend'
describe('index.ts', () => {

    describe('GET /notes', () => {
        it('should get all notes', async () => {
            const res = await request(app).get('/notes')
            expect(res.headers["content-type"]).toMatch(/json/);
            expect(res.status).toEqual(200);
            expect(JSON.stringify(res.body)).toEqual(JSON.stringify(notes));
        });
    })

    describe('GET /notes/:id', () => {
        it('should get a note by id', async () => {
            const res = await request(app).get('/notes/1')
            expect(res.headers["content-type"]).toMatch(/json/);
            expect(res.status).toEqual(200);
            expect(JSON.stringify(res.body)).toEqual(JSON.stringify(notes[0]));
        });
    })

    describe('POST /notes', () => {
        it('should save notes', async () => {
            const res = await request(app).post('/notes/').send({
                title: 'testTitle',
                content: 'testContent',
                createdAt: '',
                updatedAt: ''
            })

            expect(res.body.message).toEqual('Success');
            const res2 = await request(app).get('/notes')
            expect(res2.body.length).toEqual(2)
            await request(app).delete(`/notes/${res2.body[1].id}`)
        });
    })

    describe('PUT /notes/:id', () => {
        it('should update a note by id', async () => {
            const res = await request(app).put('/notes/1').send({
                title: 'testTitle',
                content: 'testContent',
                createdAt: '',
                updatedAt: ''
            })

            expect(res.body.message).toEqual('Note updated.');

            const res2 = await request(app).get('/notes/1')
            expect(res2.body.title).toEqual('testTitle')
            expect(res2.body.content).toEqual('testContent')
        });
    })

    describe('DELETE /notes/:id', () => {
        it('should delete a note by id', async () => {

            // create a new note
            await request(app).post('/notes/').send({
                title: 'testTitle',
                content: 'testContent',
                createdAt: '',
                updatedAt: ''
            })

            const res = await request(app).get('/notes')
            expect(res.body.length).toEqual(2)
            const newNote = res.body[1]

            const res2 = await request(app).delete(`/notes/${newNote.id}`)
            expect(res2.status).toEqual(200)

            const res3 = await request(app).get('/notes')
            expect(res3.body.length).toEqual(1)

        });
    })
})
