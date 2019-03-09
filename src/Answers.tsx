import React from 'react';
import { Answer } from './Question';
import './Answers.css';
import DarkModeContext from './context';

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
  onAnswer,
}: Props) {
  return (
    <DarkModeContext.Consumer>
      {darkMode => {
        const classNames = ['answers', darkMode ? 'darkTheme' : ''];
        return (
          <div className={classNames.join(' ')}>
            {answers.map(answer => {
              let style = { backgroundColor: '' };
              if (answered && answer.id === correct) {
                style.backgroundColor = correct !== answered ? 'red' : 'green';
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
      }}
    </DarkModeContext.Consumer>
  );
}
