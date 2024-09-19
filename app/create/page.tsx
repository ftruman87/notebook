'use client'
import React from 'react';
import { NoteForm } from '@/components/createNoteForm';

const Page = () => {
    return (
        <div>
            <NoteForm disabled={false} edit={true}></NoteForm>
        </div>
    );
};

export default Page;
