import update from 'immutability-helper';
import { Question } from '../Question';
import { ActionType } from 'typesafe-actions';
import {
  answerQuestionAction,
  ANSWER_QUESTION,
  GET_QUESTION_SUCCESS,
  getQuestionSuccessAction,
  FINISH,
  finishAction,
} from './quiz.actions';

export interface quizState {
  question?: Question;
  finished: boolean;
  answered: null | number;
  count: {
    count: number;
    correct: number;
  };
}

const initialState = {
  finished: false,
  answered: null,
  count: {
    count: 0,
    correct: 0,
  },
};

export default function(
  state: quizState = initialState,
  action: ActionType<
    | typeof answerQuestionAction
    | typeof getQuestionSuccessAction
    | typeof finishAction
  >
) {
  switch (action.type) {
    case ANSWER_QUESTION:
      return update(state, {
        answered: { $set: action.payload },
      });
    case GET_QUESTION_SUCCESS:
      return update(state, {
        question: { $set: action.payload },
        answered: { $set: null },
      });
    case FINISH:
      return update(state, {
        finished: { $set: true },
      });
    default:
      return state;
  }
}
