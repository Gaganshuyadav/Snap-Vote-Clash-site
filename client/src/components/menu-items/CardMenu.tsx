"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
  
  
  import { JSX, useState } from "react";
import DeleteConfirmationDialog from "../clash/DeleteConfirmationDialog";
import EditClash from "../clash/EditClash";
import { CustomUser } from "@/app/api/auth/[...nextauth]/auth";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ClashType } from "@/app/dashboard/page";
  
  
  
  
  function CardMenu( { children, user, clash}:{ children:JSX.Element, user:CustomUser, clash: ClashType}) {

    const [ deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [ editDialogOpen, setEditDialogOpen] = useState(false);


    const handleCopyClashLink = ()=>{
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/clash/items/${clash.id}`)
    }

    return (
      <div onClick={(e)=>{ e.stopPropagation()}}>
      <DropdownMenu>
        { children}
        <DropdownMenuContent className="w-40 mr-2">
  
            <DropdownMenuItem onClick={(e)=>{ setEditDialogOpen(true)}}>
              Edit
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleCopyClashLink}>
              Copy Link
            </DropdownMenuItem>

            <DropdownMenuItem onClick={(e)=>{ setDeleteDialogOpen(true)} }>
              Delete 
            </DropdownMenuItem>
  
        </DropdownMenuContent>
        
        {/* delete dialog confirmation */}
        <DeleteConfirmationDialog  user={user} clash={clash}  dialogOpen={deleteDialogOpen} setDialogOpen={setDeleteDialogOpen} />

        {/* open edit dialog */}
        { editDialogOpen && <EditClash user={user} clash={clash} editDialogOpen={editDialogOpen} setEditDialogOpen={setEditDialogOpen}/>}


  
      </DropdownMenu>
      </div>
    )
  }
  
  export {  CardMenu};
  
  
  
  
  
  
  
  
  
  
  
  
  