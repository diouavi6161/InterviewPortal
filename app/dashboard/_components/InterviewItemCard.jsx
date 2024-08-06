import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewItemCard = ({interview}) => {


  const router = useRouter();

  const onStart=()=>{
    router.push('/dashboard/interview/'+interview?.mockId)

  }

  const onFeedbackPush=()=>{
    router.push('/dashbaord/interview/'+interview.mockId+"/feedback")
  }
  return (
    <div className="border text-white shadow-sm rounded-lg p-3">

        <h2>{interview?.jobTitle}</h2>
        <h2>{interview?.jobExperience} Years of Experience</h2>
        <h2>Created At: {interview.createdAt}</h2>
        <div className="flex justify-between mt-2 gap-2">
          <Button size="sm"  className="w-full"
          onClick={onFeedbackPush}>Feedback</Button>
          <Button size="sm" className="w-full"
          onClick={onStart}>Start</Button> 
        </div> 

    </div>
  )
}

export default InterviewItemCard