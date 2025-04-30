import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { AvatarDropDownMenu } from '../menu-items/AvatarMenu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
// import { Button } from '../ui/button'; 


const Header = () => {

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300 bg-linear-65 from-purple-500 to-pink-500 h-[80px] z-50 sticky w-full top-0 ">
      <div className="text-2xl font-bold text-gray-800">SnapVote</div>
      <div className="w-12 h-12 flex items-center justify-center">
        <AvatarDropDownMenu>
            <DropdownMenuTrigger asChild>
                  <Avatar className='w-10 h-10'>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
                      <AvatarFallback>SV</AvatarFallback>
                  </Avatar>
            </DropdownMenuTrigger>
        </AvatarDropDownMenu>
      </div>
    </div>
  )
}

export default Header;




