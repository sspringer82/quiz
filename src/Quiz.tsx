import React, { Component, ReactElement } from 'react';

import './Quiz.css';
import Answers from './Answers';
import { Question } from './Question';
import { ThemeContext } from './App';
import context from './context';
import DarkModeContext from './context';

interface State {
  question: Question;
  answered: number | null;
}

interface Props {
  onComplete: () => void;
  onAnswered: (correct: boolean) => void;
}

export default class Quiz extends Component<Props, State> {
  static contextType = context;
  context!: React.ContextType<typeof DarkModeContext>;

  public state = {
    answered: null,
    question: {
      id: 0,
      question: '',
      answers: [],
      correct: 0,
      next: null,
    },
  };

  async componentDidMount() {
    await this.getQuestion(1);
  }

  async getQuestion(id: number) {
    const response = await fetch(`/question/${id}`);
    const question = await response.json();
    this.setState(() => ({ question, answered: null }));
  }

  answerQuestion = (id: number) => {
    if (this.state.answered !== null) {
      return;
    }

    let correct = id === this.state.question.correct ? true : false;
    this.props.onAnswered(correct);
    this.setState(prevState => ({
      ...prevState,
      answered: id,
    }));
    setTimeout(() => {
      if (this.state.question.next !== null) {
        this.getQuestion((this.state.question.next as unknown) as number);
      } else {
        this.props.onComplete();
      }
    }, 2000);
  };

  render() {
    const classNames = ['quiz', this.context ? 'darkTheme' : ''];

    return (
      <div className={classNames.join(' ')}>
        <div className="question">{this.state.question.question}</div>
        <Answers
          answers={this.state.question.answers}
          correct={this.state.question.correct}
          answered={this.state.answered}
          onAnswer={this.answerQuestion}
        />
      </div>
    );
  }
}
