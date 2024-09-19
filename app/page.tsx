'use client'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Note } from '@/models/Note';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function Home() {

  const router = useRouter()

  const [notes, setNotes] = useState<Array<Note>|null>(null)
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:3001/notes');
        setNotes(res.data)
      } catch ( e ) {
        console.error(e)
      }
    })()
  }, [])
  return (
    <div >
      <main>
        <Table>
          <TableCaption>A list of notes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              notes?.map(note => {
                return <TableRow key={note.id} className={"cursor-pointer"} onClick={() => router.push(`/detail/${note.id}`)}>
                    <TableHead>{note.id}</TableHead>
                  <TableHead>{note.title}</TableHead>
                  <TableHead>{note.content}</TableHead>
                  <TableHead>{note.createdAt}</TableHead>
                  <TableHead>{note.updatedAt}</TableHead>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
        <Link className={"bg-blue-400 p-3 "} href={"/create"}>Create New Note</Link>
      </main>
    </div>
  );
}
