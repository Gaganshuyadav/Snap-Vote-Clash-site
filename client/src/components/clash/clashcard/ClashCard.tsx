"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { ClashType } from "@/app/dashboard/page";
import { CardMenu } from "@/components/menu-items/CardMenu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CustomUser } from "@/app/api/auth/[...nextauth]/auth";
import Link from "next/link";



export function ClashCard({ clash, user }: { clash: ClashType, user:CustomUser }) {


    return (
        <Link href={`/clash/items/${clash.id}`}>
        <Card className="w-[300px] mx-[16px] my-[20px] pb-0 pt-2 shadow-md hover:shadow-xl">
            <div className="mx-auto">

                <Image className="h-80 rounded-lg" src={clash?.image || "https://images.unsplash.com/photo-1496016943515-7d33598c11e6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} height={40} width={280} alt="id" />
            </div>


            <CardHeader className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-2xl">{clash?.title}</CardTitle>
                    <CardDescription>{clash?.description}</CardDescription>
                </div>
                <CardMenu user={user as CustomUser} clash={clash}>
                    <DropdownMenuTrigger asChild>
                        <div className="rounded-full py-2 hover:bg-gray-200">
                            <svg width="30px" height="23px" viewBox="0 0 16.00 16.00" xmlns="http://www.w3.org/2000/svg" fill="#808080" className="bi bi-three-dots-vertical" stroke="#808080" strokeWidth="0.00016" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.288"> <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path> </g><g id="SVGRepo_iconCarrier"> <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path> </g></svg>
                        </div>
                    </DropdownMenuTrigger>
                </CardMenu>

            </CardHeader>

            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>
        </Link>
    )
}

















