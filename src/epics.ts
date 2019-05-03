import { combineEpics } from 'redux-observable';
import quizEpic from './quiz/quiz.epic';

export default combineEpics(quizEpic);
