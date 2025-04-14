"use client";

import React from 'react';
import { useFormStatus} from "react-dom";
import "./FormButtonLoading.css";

const FormButtonLoading = ( { BtnName, ButtonBgColor}:{ BtnName:string, ButtonBgColor:string}) => {

  const status = useFormStatus();

  return (
    <div>
        <button 
            type="submit" 
            className={`w-full ${ButtonBgColor} text-white ${ status.pending ? "p-1" : "p-2"} rounded hover:opacity-80 transition duration-200 mb-2`}
            >
                { status.pending===true
                  ? 
                   (
                    <div className='flex items-center justify-center transition duration-200 '>
                      <div className="loader ">
                          <div className="bar1"></div>
                          <div className="bar2"></div>
                          <div className="bar3"></div>
                          <div className="bar4"></div>
                          <div className="bar5"></div>
                          <div className="bar6"></div>
                          <div className="bar7"></div>
                          <div className="bar8"></div>
                          <div className="bar9"></div>
                          <div className="bar10"></div>
                          <div className="bar11"></div>
                          <div className="bar12"></div>
                      </div>
                    </div>
                   ) 
                  : 
                  BtnName
                }
            </button>
    </div>
  )
}

export default FormButtonLoading