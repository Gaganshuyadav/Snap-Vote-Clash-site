import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {

    redirect("/dashboard");

  return (
    <div>Redirecting...</div>
  )
}

export default page