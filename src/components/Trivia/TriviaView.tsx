import { TriviaQuestion } from "@/gameLogic/trivia";
import React, { useState, useEffect } from "react";

interface TriviaBoxProps {
  question: TriviaQuestion;
}

const TriviaBox: React.FC<TriviaBoxProps> = ({ question }) => {
  return (
    <div className="trivia-box">
      {false ? (
        <div className="countdown">{question.countdown}</div>
      ) : (
        <div className="question">{question.question}</div>
      )}
    </div>
  );
};

export default TriviaBox;
