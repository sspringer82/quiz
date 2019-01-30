import React, { Component, ReactElement } from 'react';

import './Quiz.css';
import Answers from './Answers';
import { Question } from './Question';

interface State {
  question: Question;
  correct: boolean | null;
}

export default class Quiz extends Component<{}, State> {
  public state = {
    correct: null,
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
    const data = await response.json();
    this.setState(prevState => {
      return { ...prevState, question: data, correct: null };
    });
  }

  answerQuestion = (id: number) => {
    let correct = false;
    if (id === this.state.question.correct) {
      correct = true;
    }
    this.setState(prevState => ({ ...prevState, correct }));
    // if (this.state.question.next !== null) {
    //   setTimeout(
    //     () => this.getQuestion((this.state.question.next as unknown) as number),
    //     2000,
    //   );
    // }
  };

  render() {
    let result = '';

    if (this.state.correct === true) {
      result = 'Yeah!';
    } else if (this.state.correct === false) {
      result = 'No!';
    }

    return (
      <div>
        {result && <div>{result}</div>}
        <div className="question">{this.state.question.question}</div>
        <Answers
          answers={this.state.question.answers}
          onAnswer={this.answerQuestion}
        />
      </div>
    );
  }
}
