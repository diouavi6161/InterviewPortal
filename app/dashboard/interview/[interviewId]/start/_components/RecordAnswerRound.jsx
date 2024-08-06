"use client";
import useSpeechToText from "react-hook-speech-to-text";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";

function RecordAnswerRound({
  mockInterviewQuestions,
  activeQuestionsIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);

    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestions[activeQuestionsIndex]?.question +
      ",User Answer:" +
      userAnswer +
      "Depends on question and user answer for given interview question" +
      " Please gives us rating for answer and feedback as area of imporvement if any" +
      " in just 3 to 5 lines to improve it in JSON fromat with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace(/```/g, "");
    console.log(mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestions[activeQuestionsIndex]?.question,
      correctAns: mockInterviewQuestions[activeQuestionsIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast("User Answer recored successfully");
      setUserAnswer("");
      setResults([]);
    }

    setResults([]);
    
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center">
         {" "}
      <div className="flex flex-col mx-3 justify-center items-center rounded-lg p-5 bg-white-300">
               {" "}
        <Image
          src={"/Webcam.png.jpg"}
          width={200}
          height={200}
          className="absolute"
        />
               {" "}
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
           {" "}
      </div>
         {" "}
      <Button disabled={loading} variant="outline" onClick={StartStopRecording}>
               {" "}
        {isRecording ? (
          <h2 className="text-red-600 animate-pluse flex gap-2 items-center">
                      <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-green-900 flex gap-2">
                    <Mic /> 'Record Answer'    {" "}
          </h2>
        )}
      </Button>
             {" "}
    </div>
  );
}

export default RecordAnswerRound;
