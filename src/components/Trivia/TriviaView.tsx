import { Player } from "@/gameLogic";
import styles from "./styles.module.scss";
import { TriviaQuestion } from "@/gameLogic/trivia";
import { useUserContext } from "@/hooks/useUserContext";
import React, { useState, useEffect } from "react";
import { uuid as v4 } from "uuidv4";
import {
  emitClickEvent,
  handleThrottledClick,
} from "@/utils/handleThrottledClick";
interface TriviaBoxProps {
  question: TriviaQuestion;
  submitAnswer: any;
  style: any;
}

const TriviaBox: React.FC<TriviaBoxProps> = ({
  question,
  submitAnswer,
  style,
}) => {
  const user = useUserContext().user as Player;
  return (
    <div className={styles["trivia-box"]} style={style}>
      <div className="frame">{question.question}</div>
      <div className={styles.optionContainer}>
        {question.answers.map((answer) => {
          return (
            <div
              className={`frame ${styles.option} ${
                user.choices && user.choices.includes(answer)
                  ? `${styles.selected}`
                  : ``
              }`}
              key={v4()}
              onClick={() => {
                submitAnswer(answer);
              }}
            >
              {answer}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TriviaBox;
