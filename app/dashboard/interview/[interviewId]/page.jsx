"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { interval } from 'drizzle-orm/pg-core'
import { HiLightBulb } from "react-icons/hi";
import { WebcamIcon } from 'lucide-react'
import React,{useEffect, useState} from 'react'
import Webcam from 'react-webcam'
import Link from 'next/link'

function Interview({params}) {

    const [interviewData, setInterviewData] = useState("");
    const [webCamOpen, setWebCamOpen] = useState(false)

    useEffect(()=>{
        console.log(params.interviewId)
        InterviewDetails();
    },[])

    // to get Interview Data by Interview id

    const InterviewDetails = async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))

        
        setInterviewData(result[0])
    }
  return (
    <div className="my-1 ">
        <h2 className="font-bold text-xl text-green-500 flex justify-center mt-1  ">Check Everything before your Interview  </h2>

        <div className="grid grid-col-1 md:grid-cols-2 gap-10">
        <div>
            {webCamOpen?<Webcam
            onUserMedia={()=>setWebCamOpen(true)}
            onUserMediaError={()=>setWebCamOpen(false)}
            mirrored={true}
             style={{
                height:200,
                width:200
            }}/>:
            <>
            <WebcamIcon className="h-72 w-72 my-7 p-20 bg-slate-300 rounded-lg"/>
            <Button onClick={async () => {
    try {
      // Check if the user has a camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      // If successful, enable the webcam and microphone
      setWebCamOpen(true);
    } catch (error) {
      // If there's an error (e.g., no camera/microphone), show an alert
      alert("Please add your camera and microphone.");
    }
  }}>
  Enable Web Cam And Microphone
</Button>

            </>
             }
        </div>
        <div className="flex flex-col my-0 gap-5  ">
          <div className=" flex flex-col p-5 rounded-lg border-black-900 gap-5">
          <h2 className="text-lg font-mono hover:text-gray-500 cursor-pointer"><strong>Job Title:</strong>{interviewData.jobTitle}</h2>
          <h2 className="text-lg font-mono hover:text-gray-500 cursor-pointer"><strong>Job Role:</strong>{interviewData.jobRole}</h2>
          <h2 className="text-lg font-mono hover:text-gray-500 cursor-pointer"><strong>Experience:</strong>{interviewData.jobExperience}</h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-red-500">
          <h2 className="flex gap-2 items-center"><HiLightBulb className="h-10 w-10 text-yellow-500" /><strong>Information</strong></h2>
          <h2 className="mt-3 text-yellow-400">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        </div>
        <div  ClassName="flex flex-col  items-end justify-end">
          <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
          <Button className=' flex bg-orange-400 items-end justify-end my-2'>Start</Button>
          </Link>
        </div>

    </div>
  )
}

export default Interview;