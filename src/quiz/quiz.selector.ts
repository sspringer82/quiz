import { State } from '../reducers';

export const getQuestion = (state: State) => state.quiz.question;
export const getAnswered = (state: State) => state.quiz.answered;
