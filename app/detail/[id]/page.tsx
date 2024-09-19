'use client'
import React, { useEffect, useState } from 'react';
import { NoteForm } from '@/components/createNoteForm';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Note } from '@/models/Note';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { id: string } }) => {
    const {id} = params
    const { toast } = useToast()
    const [note, setNote] = useState<Note|undefined>(undefined)
    const [edit, setEdit] = useState(false)
    const router = useRouter()

    const handleEdit = () => {
        setEdit(!edit)
    }
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:3001/notes/${id}`)
            console.log(res)
            if ( res.status === 200 ) {
                toast({
                    description: "Note deleted",
                    style: {
                        background: "green"
                    }
                })

                setTimeout(() => {
                    router.push('/')
                }, 1000)
            }

        } catch ( e ) {
            toast({
                description: "Error deleting note.",
                variant: "destructive"
            })
        }


    }
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:3001/notes/${id}`)
                setNote(res.data)
            } catch (e) {
                toast({
                    variant: 'destructive',
                    description: `Error fetching note with id ${id}`
                })
            }
        })()
    }, [id, toast])
    return (
        <div>
            <NoteForm note={note} disabled={!edit} edit={edit}></NoteForm>
            <div className={'flex justify-center items-center pt-20'}>
                <Button onClick={handleEdit}>{!edit ? 'Edit' : 'Disable Editing'}</Button>
                <Button onClick={handleDelete} variant={"destructive"}>Delete</Button>
            </div>
        </div>
    );
};

export default Page;
