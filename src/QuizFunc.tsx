import React, { Component, useState, useEffect, useContext } from 'react';

import './Quiz.css';
import Answers from './Answers';
import { Question } from './Question';
import DarkModeContext from './context';

interface Props {
  onComplete: () => void;
  onAnswered: (correct: boolean) => void;
}

interface State {
  question: Question;
  answered: number | null;
}

export default function Quiz({ onComplete, onAnswered }: Props) {
  const [state, setState] = useState<State>({
    answered: null,
    question: {
      id: 0,
      question: '',
      answers: [],
      correct: 0,
      next: null,
    },
  });

  async function getQuestion(id: number) {
    const response = await fetch(`/question/${id}`);
    const question = await response.json();
    setState(() => ({ question, answered: null }));
  }

  function answerQuestion(id: number) {
    if (state.answered !== null) {
      return;
    }

    let correct = id === state.question.correct ? true : false;
    onAnswered(correct);
    setState({
      ...state,
      answered: id,
    });
    setTimeout(() => {
      if (state.question.next !== null) {
        getQuestion((state.question.next as unknown) as number);
      } else {
        onComplete();
      }
    }, 2000);
  }

  useEffect(() => {
    getQuestion(1);
  }, []);

  const context = useContext(DarkModeContext);

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
