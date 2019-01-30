import React from 'react';
import { Answer } from './Question';

interface Props {
  answers: Answer[];
  onAnswer: (id: number) => void;
}

export default function Answers({ answers, onAnswer }: Props) {
  return (
    <div className="answers">
      {answers.map(answer => (
        <button key={answer.id} onClick={() => onAnswer(answer.id)}>
          {answer.answer}
        </button>
      ))}
    </div>
  );
}
