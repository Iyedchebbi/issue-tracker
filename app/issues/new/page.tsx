'use client';

import dynamic from "next/dynamic";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";

// dynamically import SimpleMDE only on the client
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
    <TextField.Root>
        <TextField.Slot>
            <input placeholder="Title" />
        </TextField.Slot>
    </TextField.Root>
    <SimpleMDE placeholder="Description" />
    <Button>Submit Now</Button>
    </div>
  )
}

export default NewIssuePage

