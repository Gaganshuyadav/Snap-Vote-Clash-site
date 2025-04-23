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
import { ClearCache } from '@/actions/clash/ClearCache';
import { ClashType } from '@/app/dashboard/page';

const EditClash = ( { user, editDialogOpen, setEditDialogOpen, clash }:{ user:CustomUser|null , clash: ClashType, editDialogOpen:boolean, setEditDialogOpen:Function} ) => {
    
  const [ date, setDate] = React.useState<Date|undefined>( new Date(clash?.expired_at || new Date().toISOString()));
  const [ title, setTitle] = useState<string>( clash?.title || ""); 
  const [ description, setDescription] = useState<string>( clash?.description || "");
  const [ image, setImage] = useState<File|null>();
  const [ loading, setLoading] = useState(false);

  const handleImageSelect = (e:React.ChangeEvent<HTMLInputElement>)=>{
    
    if(e.target.files && e.target.files[0]){
      setImage(e.target.files[0]);
    }
    
  };

  const handleFormSubmit = async (e:React.FormEvent)=>{
      e.preventDefault();
  

      if( !title || !description || !date){
        return;
      }

      const form = new FormData();

      form.append("title", title);
      form.append("description", description);
      form.append("expired_at", date.toISOString());
      form.append("image", image as File);


      //now add it in clash database
      setLoading(true);

      try{
        const { data} = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/clash/${clash.id}`, form, { headers:{ "Content-Type":"multipart/form-data", "Authorization":`Bearer ${user?.token}` }});
        console.log(data);
        clearDialog();
        ClearCache("/dashboard");
      }
      catch(err){
        console.log(err);
        clearDialog();
      }

  } 


  const clearDialog = ()=>{

    setTitle("");
    setDescription("");
    setDate(undefined);
    setTitle("");
    setEditDialogOpen(false);
    setLoading(false);
  }


  return (
    <Dialog open={editDialogOpen} onOpenChange={(e)=>setEditDialogOpen(e)}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="xl:max-h-[95vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Edit Clash</DialogTitle>

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
            {
              loading
              ?
              (<Button disabled={loading} className="w-full">
                Editing&nbsp;.&nbsp;.&nbsp;.
              </Button>)
              :
            (<Button disabled={loading} type='submit' className="w-full">
              Edit Clash
            </Button>)
            } 
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditClash;




