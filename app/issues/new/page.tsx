'use client';

import dynamic from "next/dynamic";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller,SubmitHandler } from "react-hook-form"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

// dynamically import SimpleMDE only on the client
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const {register,control,handleSubmit} = useForm<IssueForm>();
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
    <Controller
      control={control}
      name="description"
      render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
    />
    <Button>Submit New Issue</Button>
    </form>
    
  </div>
  );
}

export default NewIssuePage

