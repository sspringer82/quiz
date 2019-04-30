import React from 'react';

import './Quiz.css';
import Answers from './Answers';
import useQuiz from './useQuiz';

interface Props {
  onComplete: () => void;
  onAnswered: (correct: boolean) => void;
}

export default function Quiz({ onComplete, onAnswered }: Props) {
  const [state, answerQuestion, context] = useQuiz(onAnswered, onComplete);

  const classNames = ['quiz', context ? 'darkTheme' : ''];
  return (
    <div className={classNames.join(' ')}>
      <div className="question">{state.question.question}</div>
      <Answers
        answers={state.question.answers}
        correct={state.question.correct}
        answered={state.answered}
        onAnswer={answerQuestion}
      />
    </div>
  );
}
