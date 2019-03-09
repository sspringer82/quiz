import React from 'react';
import './App.css';
import Quiz from './Quiz';

export const DarkModeContext = React.createContext(false);

interface State {
  finished: boolean;
  count: {
    count: number;
    correct: number;
  };
}

export default class App extends React.Component<{}, State> {
  public state = {
    finished: false,
    count: {
      count: 0,
      correct: 0,
    },
  };

  handleComplete = () =>
    this.setState((prevState: State) => ({
      ...prevState,
      finished: true,
    }));

  increaseCount = (correct: boolean) => {
    const correctCount = correct
      ? this.state.count.correct + 1
      : this.state.count.correct;
    this.setState((prevState: State) => ({
      ...prevState,
      count: { count: prevState.count.count + 1, correct: correctCount },
    }));
  };

  render() {
    if (this.state.finished) {
      return (
        <div>
          Gesamt: {this.state.count.count}
          <br />
          Davon richtig: {this.state.count.correct}
        </div>
      );
    }

    return (
      <Quiz onComplete={this.handleComplete} onAnswered={this.increaseCount} />
    );
  }
}
