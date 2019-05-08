import React, { useContext, useEffect } from 'react';

import './Quiz.css';
import Answers from '../Answers';
import { Question } from '../Question';
import DarkModeContext from '../context';
import Summary from './Summary.container.component';

interface Props {
  finished: boolean;
  question?: Question;
  answered: null | number;
  answerQuestion: (answer: number) => void;
  getQuestion: (id: number) => void;
}

export default function Quiz({
  question,
  answered,
  answerQuestion,
  getQuestion,
  finished,
}: Props) {
  useEffect(() => {
    getQuestion(1);
  }, [getQuestion]);
  const context = useContext(DarkModeContext);
  const classNames = ['quiz', context ? 'darkTheme' : ''];

  if (finished) {
    return <Summary />;
  }
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
