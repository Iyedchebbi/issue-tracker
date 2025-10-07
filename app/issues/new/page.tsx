'use client';

import dynamic from "next/dynamic";
import { Text, Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller,SubmitHandler } from "react-hook-form"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {zodResolver} from '@hookform/resolvers/zod';
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessages from "@/app/components/ErrorMessages";
type IssueForm = z.infer<typeof createIssueSchema>;

// dynamically import SimpleMDE only on the client
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const {register,control,handleSubmit ,formState : {errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)  ,
  });
  return (
    <div className="max-w-xl">
      {error && <Callout.Root color ="red" className="mb-5" >  
        <Callout.Text>{error}</Callout.Text>      
    </Callout.Root>}
    <form className='space-y-1' onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/issues',data).then(() => {
          router.push('/issues');
        });
      } catch (error) {
        setError('Failed to create issue. Please try again.');
      } 
      
    })}  >
    <TextField.Root>
        <TextField.Slot>
            <input placeholder="Title" {...register("title")} />
        </TextField.Slot>
    </TextField.Root>
    <ErrorMessages>{errors.title?.message}</ErrorMessages>
    <Controller
      control={control}
      name="description"
      render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
    />
    <ErrorMessages>{errors.description?.message}</ErrorMessages>
    <Button>Submit New Issue</Button>
    </form>
    
  </div>
  );
}
export default NewIssuePage

