"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation'
  

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobTitle, setJobTitle] = useState()
    const [jobRole, setJobRole] = useState()
    const [jobExperience, setJobExperience] = useState()
    const [Loading,setLoading]=useState(false)
    const [jsonResponse,setJsonResponse] = useState([])
    const router = useRouter()
    const {user} = useUser()

    const onSubmit=async(event)=>{
      setLoading(true)
      event.preventDefault()
      console.log(jobTitle,jobRole,jobExperience)

      
      const InputPrompt = "Job title: " + jobTitle + ", Job role: " + jobRole + ", job experience: " + jobExperience + ", Depends on this information, please give me " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " interview questions with Answers in JSON format, give question and Answered as fields in JSON";



      const result = await chatSession.sendMessage(InputPrompt)
      
      const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
      console.log(JSON.parse(MockJsonResp));
      setJsonResponse(MockJsonResp);

      if(MockJsonResp){

      

      const resp = await db.insert(MockInterview).values({
        mockId : uuidv4(),
        jsonMockResp : MockJsonResp,
        jobTitle : jobTitle,
        jobRole : jobRole,
        jobExperience : jobExperience,
        createdBy : user?.primaryEmailAddress?.emailAddress,
        createdAt : moment().format('DD-MM-YYYY')
      }).returning({mockId:MockInterview.mockId});

      console.log("Inserted ID :" , resp)
      if(resp){
        setOpenDialog(false)
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
    }else{
      console.log("error")
    }
      setLoading(false)
    
    }

  return (
    <div>
        <div className="p-5 w-90 border rounded-lg bg-white hover:scale-105 hover:shadow-md
        cursor-pointer transition-all"
          onClick={()=>setOpenDialog(true)}>
            <h2 className="font-bold text-lg text-center">+Add New Interview</h2>
        </div>
        <Dialog open={openDialog}>
  
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-2xl">Tell us about your job interview</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
        <div>
          
          <h2>Add Details about your job title, job role and the year of experiences</h2>
          <div className="mt-7 my-3">
            <label>Job Title</label>
            <Input placeholder="Ex.Web Developer" required
             onChange={(event)=>setJobTitle(event.target.value)}/>
          </div>
          <div className=" my-3">
            <label>Job Role</label>
            <Textarea placeholder="Ex-React,Nodejs,Express JS.." required
            onChange={(event)=>setJobRole(event.target.value)}/>
          </div>
          <div className=" my-2">
            <label>Years of Experience</label>
            <Input placeholder="Ex-0,1,2,3" type="number" max="30" required
            onChange={(event)=>setJobExperience(event.target.value)}/>
          </div>
        </div>
        <div className="flex gap-2 justify-center">
            <Button type="button" variant="ghost" className="p-2 mt-1" onClick={()=>setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" disabled={Loading} >
              {Loading?
              <>
              <LoaderCircle className="animate-spin"/>'Generating, Please Wait..'</>:'Start Interview'}
              </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview