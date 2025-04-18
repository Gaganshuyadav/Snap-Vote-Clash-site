import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, 
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

import React, { Dispatch, JSX, SetStateAction } from 'react';
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react";

   
function LogoutConfirmationDialog( { dialogOpen, setDialogOpen}:{ dialogOpen:boolean, setDialogOpen: Dispatch<SetStateAction<boolean>>} ) {

    const handleLogout = ()=>{
        signOut();
    }

    return (
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}> 

        <AlertDialogContent>

          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout ?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={ handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>
    )
  }

export default LogoutConfirmationDialog;














