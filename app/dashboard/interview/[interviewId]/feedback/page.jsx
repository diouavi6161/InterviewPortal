"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
  

function Feedback({params}) {

    const [feedbackList,setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        GetFeedback();
    },[])

    const GetFeedback=async()=>{
        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,params.interviewId))
        .orderBy(UserAnswer.id);

        console.log(result)
        setFeedbackList(result);

    }
  return (
    <div classname="p-10">
        
        

        {feedbackList?.length==0?
        <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Found</h2>
          :
        <>
        <h2 className="text-2xl font-bold text-green-300">Congratulations</h2>
        <h2 className="font-bold text-2xl">Here is your Interview feedback with each questions!</h2>
        <h2 className="text-primary text-lg my-3 text-orange-700">Check the Rating by Clicking on Questions</h2>

        <h2 className="text-sm">Find below interview question with correct answer</h2>
        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index}>
            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg gap-7 flex justify-between my-2 text-left">
            {item.question}<ChevronsUpDown className="h-4 w-4"/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-3">
                <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong >Rating:</strong>{item.rating}
                </h2>
                <h2>
                  <strong>Your Answer: </strong>{item.userAns}
                </h2>
                <h2>
                  <strong>Correct Answer: </strong>{item.correctAns}
                </h2>
                </div>
            </CollapsibleContent>
          </Collapsible>
          

        ))}

       </>}

        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback