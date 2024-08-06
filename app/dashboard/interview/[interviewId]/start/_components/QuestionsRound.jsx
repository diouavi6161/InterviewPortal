import { Volume, Volume2 } from 'lucide-react';
import React from 'react';
import { VscLightbulb } from "react-icons/vsc";

function QuestionsRound({ mockInterviewQuestions,activeQuestionsIndex }) {

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.SpeechSynthesis.speak(speech)
    }else{
      alert('sorry browser message does not support text to speech method')
    }
  }
  return mockInterviewQuestions&&(
    <div className="mt-2 p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, index) => (
            <h2 className={`p-2 bg-secondary rounded-full
            text-xs md:text-sm text-center cursor-pointer
             ${activeQuestionsIndex==index&& 'bg-lime-600 text-green-500'}`}>Question #{index + 1}</h2>
          ))}

          
      </div>

      <h2 className="my-5 text-md md:text-lg ">{mockInterviewQuestions[activeQuestionsIndex]?.question}</h2>
      <Volume2 className="cursor-pointer " onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionsIndex]?.question)}/>
      <div className="border rounded-lg p-5 mt-20">
        <h2 className="flex gap-5 items-center">
          <VscLightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-yellow-400 my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  );
}

export default QuestionsRound;
