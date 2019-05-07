import React, { useContext, useEffect } from 'react';

import './Quiz.css';
import Answers from '../Answers';
import { Question } from '../Question';
import DarkModeContext from '../context';

interface Props {
  question?: Question;
  answered: null | number;
  answerQuestion: (answer: number) => void;
  onComplete?: () => void;
  onAnswered?: (correct: boolean) => void;
  getQuestion: (id: number) => void;
}

export default function Quiz({
  onComplete,
  onAnswered,
  question,
  answered,
  answerQuestion,
  getQuestion,
}: Props) {
  useEffect(() => {
    getQuestion(1);
  }, [getQuestion]);
  const context = useContext(DarkModeContext);
  const classNames = ['quiz', context ? 'darkTheme' : ''];
  return (
    <>
      {question && (
        <div className={classNames.join(' ')}>
          <div className="question">{question.question}</div>
          <Answers
            answers={question.answers}
            correct={question.correct}
            answered={answered}
            onAnswer={answerQuestion}
          />
        </div>
      )}
    </>
  );
}
