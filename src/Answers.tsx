import React from "react";
import { Answer } from "./Question";

interface Props {
  answers: Answer[];
  correct: number;
  answered: null | number;
  onAnswer: (id: number) => void;
}

export default function Answers({
  answers,
  correct,
  answered,
  onAnswer
}: Props) {
  return (
    <div className="answers">
      {answers.map(answer => {
        let style = { backgroundColor: "" };
        if (answered && answer.id === correct) {
          style.backgroundColor = correct !== answered ? "red" : "green";
        }
        return (
          <button
            key={answer.id}
            style={style}
            onClick={() => onAnswer(answer.id)}
          >
            {answer.answer}
          </button>
        );
      })}
    </div>
  );
}
