
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";


import { JSX, useState } from "react";
import LogoutConfirmationDialog from "./LogoutConfirmationDialog";




function AvatarDropDownMenu( { children}:{ children:JSX.Element}) {

    const [ logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

  return (
    <DropdownMenu>
      { children}
      <DropdownMenuContent className="w-40 mr-2">

          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={()=>{ setLogoutConfirmationOpen(true)}}>
            Log out
          </DropdownMenuItem>

      </DropdownMenuContent>
      
      {/* ḷogout dialog confirmation */}
      <LogoutConfirmationDialog dialogOpen={logoutConfirmationOpen} setDialogOpen={setLogoutConfirmationOpen} />

    </DropdownMenu>
  )
}

export {  AvatarDropDownMenu};












