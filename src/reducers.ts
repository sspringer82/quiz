import { combineReducers } from 'redux';
import quiz, { quizState } from './quiz/quiz.reducer';

export default combineReducers({
  quiz,
});

export interface State {
  quiz: quizState;
}
