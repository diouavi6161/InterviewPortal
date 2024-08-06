"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsRound from "./_components/QuestionsRound";
import RecordAnswerRound from "./_components/RecordAnswerRound";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Start({ params }) {
  const [interviewData, setInterviewData] = useState("");
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState("");
  const [activeQuestionsIndex, setActiveQuestionsIndex] = useState(0);

  useEffect(() => {
    InterviewDetails();
  }, []);

  const InterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestions(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/*questions*/}
        <QuestionsRound
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionsIndex={activeQuestionsIndex}
        />

        {/* Video/audio recording answers*/}
        <RecordAnswerRound
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionsIndex={activeQuestionsIndex}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionsIndex > 0 && <Button onClick={()=>setActiveQuestionsIndex(activeQuestionsIndex-1)}>Prev Question</Button>}
        {activeQuestionsIndex != mockInterviewQuestions?.length - 1 && (
          <Button onClick={()=>setActiveQuestionsIndex(activeQuestionsIndex+1)}>Next Question</Button>
        )}
        {activeQuestionsIndex == mockInterviewQuestions?.length - 1 && (
         <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}> <Button>End Question</Button>
         </Link>
        )}
      </div>
    </div>
  );
}

export default Start;
