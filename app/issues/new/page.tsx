'use client';

import dynamic from "next/dynamic";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller,SubmitHandler } from "react-hook-form"
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const {register,control,handleSubmit} = useForm<IssueForm>();
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
      
      await axios.post('/api/issues',data).then(() => {
        router.push('/issues');
      });
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
  )
}

export default NewIssuePage

