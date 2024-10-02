"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Note } from '@/models/Note';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title must be at least 1 characters.",
    }),
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
})

interface Props {
    disabled: boolean
    edit?: boolean
    note?: Note
}
export function NoteForm({disabled, note, edit}: Props) {

    const router = useRouter()
    const {toast} = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title:`${note ? note.title : ''}`,
            content: `${note ? note.content : ''}`
        },
        values: {
            title:`${note ? note.title : ''}`,
            content: `${note ? note.content : ''}`
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {

        (async () => {
            try {
                const res = !edit ? await axios.post('http://localhost:3001/notes', values) :
                    await axios.put(`http://localhost:3001/notes/${note?.id}`, values)
                if ( res.status === 200 && !edit ) {
                    form.reset();
                }
                toast({
                    description: "Action success",
                    style: {background: "green"}
                })
                setTimeout(() => {router.push('/')}, 2000)
            } catch (e) {
                toast({
                    description: `${e}`,
                    variant: "destructive"
                })
            }
        })()
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center flex-col content-center">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input disabled={disabled} placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea disabled={disabled} placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {edit ?
                    <Button type="submit">Submit</Button> :
                    ''
                }
            </form>
        </Form>
    )
}
