import { useState, useContext, useEffect } from 'react';
import DarkModeContext from './context';
import { Question } from './Question';

interface State {
  question: Question;
  answered: number | null;
}

export default function useQuiz(
  onAnswered: (correct: boolean) => void,
  onComplete: () => void
): [State, (id: number) => void, React.ContextType<typeof DarkModeContext>] {
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

  return [state, answerQuestion, context];
}
