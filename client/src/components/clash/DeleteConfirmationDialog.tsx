import { ClearCache } from "@/actions/clash/ClearCache";
import { CustomUser } from "@/app/api/auth/[...nextauth]/auth";
import { ClashType } from "@/app/dashboard/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";

import React, { Dispatch, SetStateAction } from 'react';

function DeleteConfirmationDialog({ dialogOpen, setDialogOpen, clash, user }: {  user:CustomUser|null , clash: ClashType, dialogOpen: boolean, setDialogOpen: Dispatch<SetStateAction<boolean>> }) {

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/clash/${clash.id}`, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${user?.token}` } });
      ClearCache("/dashboard");
    }
    catch (err) {
      console.log(err);
    }


  }


  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>

      <AlertDialogContent>

        <AlertDialogHeader>
          <AlertDialogTitle>Delete Clash</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to Delete this clash ?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel >Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  )
}

export default DeleteConfirmationDialog;














