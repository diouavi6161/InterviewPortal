import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

const Dashboard = () => {
  return (
    
    <div className="p-10 bg-slate-500">
      <h2></h2>
      <h2 className="text-gray-500">All the Best for your Interview</h2>


      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview/>
      </div>

      <InterviewList/>
      
    </div>
    
  )
}

export default Dashboard