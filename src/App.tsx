import React from 'react';
import './App.css';
import Quiz from './QuizCustom';
import ThemeSwitcher from './ThemeSwitcher';
import DarkModeContext from './context';

interface State {
  darkMode: boolean;
  finished: boolean;
  count: {
    count: number;
    correct: number;
  };
}

export default class App extends React.Component<{}, State> {
  public state = {
    darkMode: false,
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

  toggleDarkMode = () => {
    this.setState((prevState: State) => ({
      ...prevState,
      darkMode: !prevState.darkMode,
    }));
  };

  render() {
    let content;

    if (this.state.finished) {
      content = (
        <div>
          Gesamt: {this.state.count.count}
          <br />
          Davon richtig: {this.state.count.correct}
        </div>
      );
    } else {
      content = (
        <Quiz
          onComplete={this.handleComplete}
          onAnswered={this.increaseCount}
        />
      );
    }

    return (
      <>
        <DarkModeContext.Provider value={this.state.darkMode}>
          <ThemeSwitcher onChangeTheme={this.toggleDarkMode} />
          {content}
        </DarkModeContext.Provider>
      </>
    );
  }
}
