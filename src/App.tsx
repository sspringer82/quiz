import React from 'react';
import './App.css';
import ThemeSwitcher from './ThemeSwitcher';
import DarkModeContext from './context';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Quiz from './quiz/Quiz.container.component';

interface State {
  darkMode: boolean;
  finished: boolean;
  count: {
    count: number;
    correct: number;
  };
}

const store = configureStore();

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
    console.log(store.getState().quiz.finished);
    return (
      <Provider store={store}>
        <DarkModeContext.Provider value={this.state.darkMode}>
          <ThemeSwitcher onChangeTheme={this.toggleDarkMode} />
          <Quiz />
        </DarkModeContext.Provider>
      </Provider>
    );
  }
}
