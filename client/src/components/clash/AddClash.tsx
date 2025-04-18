"use client"
import React, { useState } from 'react'
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from '../ui/textarea';
import DateInput from '../common/DateInput';
import axios from 'axios';
import {  CustomUser } from '@/app/api/auth/[...nextauth]/auth';

const AddClash = ( { user}:{ user:CustomUser|null}) => {
    
  const [date, setDate] = React.useState<Date|undefined>();
  const [ title, setTitle] = useState<string>("");
  const [ description, setDescription] = useState<string>("");
  const [ image, setImage] = useState<File|null>(null);
  const [ loading, setLoading] = useState(false);

  const handleImageSelect = (e:React.ChangeEvent<HTMLInputElement>)=>{
    
    if(e.target.files && e.target.files[0]){
      setImage(e.target.files[0]);
    }
    
  };


  const handleFormSubmit = async (e:React.FormEvent)=>{
      e.preventDefault();

      if( !title || !description || !date || !image){
        return;
      }

      const form = new FormData();

      form.append("title", title);
      form.append("description", description);
      form.append("date", date.toISOString());
      form.append("image", image as File);


      //now add it in clash database
      setLoading(true);


      try{
        const { data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/clash/create`, form, { headers:{ "Content-Type":"multipart/form-data", "Authorization":`Bearer ${user?.token}` }});
        console.log(data);
      }
      catch(err){
        console.log(err);
      }

      



  } 





  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='px-6 py-5'>Create Clash</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="xl:max-h-[95vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Create Clash</DialogTitle>

        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-4">
            <Label htmlFor="Title">Title</Label>
            <Input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className='mt-2'
              placeholder="Type clash title"
            />
            <span className="text-red-500"></span>
          </div>
          <div className="mt-4">
            <Label htmlFor="Description">Description</Label>
            <Textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className='mt-2'
              placeholder="Type clash description"
            />
            <span className="text-red-500"></span>
          </div>
          <div className="mt-4">
            <Label htmlFor="name" className='mb-1'>Image</Label>
            <Input
              onChange={handleImageSelect}
              type="file"
            />
            <span className="text-red-500"></span>
          </div>
          <div className="mt-4">
            <Label className="block mb-1">Choose Expiry date</Label>
            <DateInput date={date} setDate={setDate}/>
            <span className="text-red-500"></span>
          </div>
          <div className="mt-4">
            <Button className="w-full">
              Create Clash
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddClash